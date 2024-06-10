import React, { useCallback, useState, useEffect, useRef } from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';

import config from '@plone/volto/registry';
import { Icon, SearchWidget } from '@plone/volto/components';
import { toBackendLang } from '@plone/volto/helpers';
import arrowRightSVG from '@plone/volto/icons/right-key.svg';
import arrowLeftSVG from '@plone/volto/icons/left-key.svg';
// import { MobileToolsFooter } from '@kitconcept/volto-light-theme/components/MobileNavigation/MobileToolsFooter';
import { MobileToolsFooter } from './MobileToolsFooter';
import { MobileNavigationToggler } from './MobileNavigationToggler';

const messages = defineMessages({
  closeMobileMenu: {
    id: 'Close menu',
    defaultMessage: 'Close menu',
  },
  openMobileMenu: {
    id: 'Open menu',
    defaultMessage: 'Open menu',
  },
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
});

const MenuItem = ({ section, level, closeMenus, handleLinkClicked, resetToRoot }) => {
  const [isSubMenuOpen, setSubMenuOpen] = useState(null);

  const openSubMenu = useCallback((e, index) => {
    e.stopPropagation();
    setSubMenuOpen(index);
  }, []);

  const closeSubMenu = useCallback((e) => {
    e.stopPropagation();
    setSubMenuOpen(null);
  }, []);

  // Reset submenues when the mobile menu is closed or when a leaf is clicked
  useEffect(() => {
    if (!resetToRoot) {
      setSubMenuOpen(null);
    }
  }, [resetToRoot]);

  return (
    <li className={section.url === window.location.pathname ? 'current' : ''}>
      <Link
        to={section.url === '' ? '/' : section.url}
        onClick={(e) =>
          handleLinkClicked(e, section, openSubMenu, closeSubMenu, level)
        }
      >
        {section.nav_title || section.title}
        {section.items.length > 0 && <Icon name={arrowRightSVG} />}
      </Link>
      <CSSTransition
        in={isSubMenuOpen !== null}
        timeout={500}
        classNames="menu-drawer"
        unmountOnExit
      >
        <div className="menu-drawer subsection">
          <div className="search-header">
            <div className="search-wrapper">
              <div className="search">
                <SearchWidget />
              </div>
            </div>
            <button onClick={closeSubMenu}>
              <Icon name={arrowLeftSVG} size="60px" />
              <span>
                <FormattedMessage {...messages.back} />
              </span>
            </button>
          </div>
          <ul className="sections">
            <li className="header">{section.nav_title || section.title}</li>
            <li>
              <Link to={section.url === '' ? '/' : section.url} onClick={closeMenus}>
                <FormattedMessage id="Overview" defaultMessage="Overview" />
                <span>BARRRRR</span>
              </Link>
            </li>
            {section.items &&
              section.items.map((subsection, index) => (
                <MenuItem
                  key={subsection.url}
                  section={subsection}
                  level={level + 1}
                  closeMenus={closeMenus}
                  handleLinkClicked={handleLinkClicked}
                  resetToRoot={resetToRoot}
                />
              ))}
          </ul>
          <MobileToolsFooter />
        </div>
      </CSSTransition>
    </li>
  );
};

const MobileNavigation = (props) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resetToRoot, setResetToRoot] = useState(false);
  const { settings } = config;
  const intl = useIntl();
  const menus = useRef(null);
  const currentLang = useSelector((state) => state.intl.locale);
  const items = useSelector((state) => state.navigation.items || []);
  const history = useHistory();

  const Footer = props.MobileToolsFooter || MobileToolsFooter;

  const toggleMobileMenu = useCallback(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('has-menu-open');
    setMobileMenuOpen((prev) => !prev);
    setResetToRoot(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const closeMenus = useCallback((e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setMobileMenuOpen(false);
    setResetToRoot(false); // reset Navigation to root level
  }, []);

  const handleLinkClicked = useCallback(
    (e, section, openSubMenu, closeSubMenu, level) => {
      console.log(section)
      e.preventDefault();
      if (section.items.length > 0) {
        openSubMenu(e, level);
      } else {
        history.push(section.url);
        closeMenus(e);
      }
    },
    [history, closeMenus]
  );

  useEffect(() => {
    const closeMenuOnHistoryChange = history.listen(() => closeMenus({}));
    return () => {
      closeMenuOnHistoryChange();
    };
  }, [history, closeMenus]);

  return (
    <div className="mobile-nav mobile only tablet only" ref={menus}>
      <div className="hamburger-wrapper">
        <button
          className={cx('hamburger-toggler hamburger-toggler--collapse', {
            'is-active': isMobileMenuOpen,
          })}
          aria-expanded={isMobileMenuOpen}
          aria-label={
            isMobileMenuOpen
              ? intl.formatMessage(messages.closeMobileMenu)
              : intl.formatMessage(messages.openMobileMenu)
          }
          title={
            isMobileMenuOpen
              ? intl.formatMessage(messages.closeMobileMenu)
              : intl.formatMessage(messages.openMobileMenu)
          }
          type="button"
          onClick={toggleMobileMenu}
        >
            <MobileNavigationToggler isMobileMenuOpen={isMobileMenuOpen} />
        </button>
      </div>

      <CSSTransition in={isMobileMenuOpen} timeout={500} classNames="menu-drawer">
        <div className="menu-drawer">
          <div className="search-header">
            <div className="search-wrapper">
              <div className="search">
                <SearchWidget />
              </div>
            </div>
          </div>
          <ul className="sections">
            <li className="header">
              <Link
                to={settings.isMultilingual ? `/${toBackendLang(currentLang)}` : '/'}
                onClick={closeMenus}
              >
                <FormattedMessage id="Home" defaultMessage="Home" />
              </Link>
            </li>
            {items &&
              items.map((section, index) => (
                <MenuItem
                  key={section.url}
                  section={section}
                  level={0}
                  closeMenus={closeMenus}
                  handleLinkClicked={handleLinkClicked}
                  resetToRoot={resetToRoot}
                />
              ))}
          </ul>
          <Footer />
        </div>
      </CSSTransition>
    </div>
  );
};

export default MobileNavigation;
