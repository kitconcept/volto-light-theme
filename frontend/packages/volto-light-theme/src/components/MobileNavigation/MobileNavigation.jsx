import { useCallback, useState, useEffect, useRef } from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';
import doesNodeContainClick from '../../helpers/doesNodeContainClick';
import isEmpty from 'lodash/isEmpty';
import config from '@plone/volto/registry';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import SearchWidget from '@plone/volto/components/theme/SearchWidget/SearchWidget';
import { toBackendLang } from '@plone/volto/helpers/Utils/Utils';
import arrowRightSVG from '@plone/volto/icons/right-key.svg';
import arrowLeftSVG from '@plone/volto/icons/left-key.svg';
import { MobileNavigationToggler } from './MobileNavigationToggler';
import { MobileToolsFooter } from './MobileToolsFooter';

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

const MenuItem = ({
  section,
  level,
  closeMenus,
  handleLinkClicked,
  resetToRoot,
  pathname,
}) => {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

  const openSubMenu = useCallback((e) => {
    e.stopPropagation();
    setSubMenuOpen(true);
  }, []);

  const closeSubMenu = useCallback((e) => {
    e.stopPropagation();
    setSubMenuOpen(false);
  }, []);

  // Reset submenus when history changes
  useEffect(() => {
    if (resetToRoot) {
      setSubMenuOpen(false);
    }
  }, [resetToRoot]);

  const headerSettings = useSelector(
    (state) =>
      state.content.data?.['@components']?.inherit?.['voltolighttheme.header']
        ?.data,
  );
  const formData = useSelector((state) => state.form.global);

  const has_intranet_header = !isEmpty(formData)
    ? formData.has_intranet_header
    : headerSettings?.has_intranet_header;

  return (
    <li className={section.url === pathname ? 'current' : ''}>
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
        in={isSubMenuOpen}
        timeout={500}
        classNames="menu-drawer"
        unmountOnExit
      >
        <div className="menu-drawer subsection">
          {!has_intranet_header ? (
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
          ) : (
            <div>
              <button onClick={closeSubMenu}>
                <Icon name={arrowLeftSVG} size="60px" />
                <span>
                  <FormattedMessage {...messages.back} />
                </span>
              </button>
            </div>
          )}
          <ul className="sections">
            <li className="header">{section.nav_title || section.title}</li>
            <li>
              <Link
                to={section.url === '' ? '/' : section.url}
                onClick={closeMenus}
              >
                <FormattedMessage id="Overview" defaultMessage="Overview" />
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
                  pathname={pathname}
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

  const headerSettings = useSelector(
    (state) =>
      state.content.data?.['@components']?.inherit?.['voltolighttheme.header']
        ?.data,
  );
  const formData = useSelector((state) => state.form.global);
  const has_intranet_header = !isEmpty(formData)
    ? formData.has_intranet_header
    : headerSettings?.has_intranet_header;

  const Footer = props.MobileToolsFooter || MobileToolsFooter;

  const toggleMobileMenu = useCallback(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('has-menu-open');
    setMobileMenuOpen((prev) => !prev);
    if (!isMobileMenuOpen) {
      setResetToRoot(false); // Disable reset to root when opening menu
    }
  }, [isMobileMenuOpen]);

  const closeMenus = useCallback((e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setMobileMenuOpen(false);
  }, []);

  const handleLinkClicked = useCallback(
    (e, section, openSubMenu, closeSubMenu, level) => {
      e.preventDefault();
      if (section.items.length > 0) {
        openSubMenu(e);
      } else {
        history.push(section.url);
        closeMenus(e);
        setResetToRoot(true);
      }
    },
    [history, closeMenus],
  );

  useEffect(() => {
    const closeMenuOnHistoryChange = history.listen(() => {
      closeMenus({});
      setResetToRoot(true);
    });
    return () => {
      closeMenuOnHistoryChange();
    };
  }, [history, closeMenus]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menus.current && !doesNodeContainClick(menus.current, e)) {
        closeMenus(e);
      }
    };
    document.addEventListener('mousedown', handleClickOutside, false);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  }, [closeMenus]);

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

      <CSSTransition
        in={isMobileMenuOpen}
        timeout={500}
        classNames="menu-drawer"
      >
        <div className="menu-drawer">
          {!has_intranet_header && (
            <div className="search-header">
              <div className="search-wrapper">
                <div className="search">
                  <SearchWidget />
                </div>
              </div>
            </div>
          )}
          <ul className="sections">
            <li className="header">
              <Link
                to={
                  settings.isMultilingual
                    ? `/${toBackendLang(currentLang)}`
                    : '/'
                }
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
                  pathname={props.pathname}
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
