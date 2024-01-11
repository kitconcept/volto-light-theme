import React, { useCallback } from 'react';
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
});

const MobileNavigation = (props) => {
  const [menuState, setMenuState] = React.useState({
    isMobileMenuOpen: false,
    secondaryMenuOpened: null,
    isSecondaryMobileMenuOpen: false,
    tertiaryMenuOpened: null,
    isTertiaryMobileMenuOpen: false,
  });

  const {
    isMobileMenuOpen,
    secondaryMenuOpened,
    isSecondaryMobileMenuOpen,
    tertiaryMenuOpened,
    isTertiaryMobileMenuOpen,
  } = menuState;
  const { settings } = config;
  const intl = useIntl();
  const menus = React.useRef(null);
  const currentLang = useSelector((state) => state.intl.locale);
  const items = useSelector((state) => state.navigation.items || []);
  const history = useHistory();

  const Footer = props.MobileToolsFooter || MobileToolsFooter;

  const toggleMobileMenu = useCallback(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('has-menu-open');

    setMenuState((prevState) => ({
      ...prevState,
      isMobileMenuOpen: !prevState.isMobileMenuOpen,
    }));
  }, []);

  const openSecondaryMenu = useCallback((e, index) => {
    e.stopPropagation();

    setMenuState((prevState) => ({
      ...prevState,
      secondaryMenuOpened: index,
      isSecondaryMobileMenuOpen: true,
    }));
  }, []);

  const closeSecondaryMenu = useCallback((e) => {
    e.stopPropagation();
    setMenuState((prevState) => ({
      ...prevState,
      isSecondaryMobileMenuOpen: false,
      secondaryMenuOpened: null,
    }));
  }, []);

  const openTertiaryMenu = useCallback((e, index) => {
    e.stopPropagation();

    setMenuState((prevState) => ({
      ...prevState,
      tertiaryMenuOpened: index,
      isTertiaryMobileMenuOpen: true,
    }));
  }, []);

  const closeTertiaryMenu = useCallback((e) => {
    e.stopPropagation();

    setMenuState((prevState) => ({
      ...prevState,
      isTertiaryMobileMenuOpen: false,
      tertiaryMenuOpened: null,
    }));
  }, []);

  const closeMenus = useCallback((e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    setMenuState(() => ({
      isSecondaryMobileMenuOpen: false,
      isTertiaryMobileMenuOpen: false,
      secondaryMenuOpened: null,
      tertiaryMenuOpened: null,
      isMobileMenuOpen: false,
    }));
  }, []);

  const handleLinkClicked = useCallback(
    (e, section, callback, index) => {
      e.preventDefault();
      if (section.items.length > 0) {
        callback(e, index);
      } else {
        history.push(section.url);
        return closeMenus(e);
      }
    },
    [history, closeMenus],
  );

  React.useEffect(() => {
    const closeMenuOnHistoryChange = history.listen(() => closeMenus({}));
    return () => {
      closeMenuOnHistoryChange();
    };
  }, [history, closeMenus]);

  return (
    <div className="mobile-nav mobile only tablet only" ref={menus}>
      <div className="hamburger-wrapper">
        <button
          className={cx('hamburger hamburger--collapse', {
            'is-active': isMobileMenuOpen,
          })}
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
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </div>

      <CSSTransition
        in={isMobileMenuOpen}
        timeout={500}
        classNames="menu-drawer"
      >
        <div className="menu-drawer">
          <div className="search-header">
            <div className=" search-wrapper ">
              <div className="search">
                <SearchWidget />
              </div>
            </div>
          </div>
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
                <li
                  key={section.url}
                  className={section.url === props.pathname ? 'current' : ''}
                  role="presentation"
                >
                  <Link
                    to={section.url === '' ? '/' : section.url}
                    onClick={(e) =>
                      handleLinkClicked(e, section, openSecondaryMenu, index)
                    }
                  >
                    {section.nav_title || section.title}
                    {section.items.length > 0 && <Icon name={arrowRightSVG} />}
                  </Link>
                  <CSSTransition
                    in={
                      isSecondaryMobileMenuOpen && secondaryMenuOpened === index
                    }
                    timeout={500}
                    classNames="menu-drawer"
                    unmountOnExit
                  >
                    <div className="menu-drawer subsection">
                      <div className="search-header">
                        <div className=" search-wrapper ">
                          <div className="search">
                            <SearchWidget />
                          </div>
                        </div>

                        <button onClick={(e) => closeSecondaryMenu(e)}>
                          <Icon name={arrowLeftSVG} size="60px" />
                          <span>
                            <FormattedMessage id="Back" defaultMessage="Back" />
                          </span>
                        </button>
                      </div>
                      <ul className="sections">
                        <li className="header">
                          {section.nav_title || section.title}
                        </li>
                        <li>
                          <Link
                            to={section.url === '' ? '/' : section.url}
                            onClick={closeMenus}
                          >
                            <FormattedMessage
                              id="Overview"
                              defaultMessage="Overview"
                            />
                          </Link>
                        </li>

                        {section.items &&
                          section.items.map((subsection, index) => (
                            <li
                              key={subsection.url}
                              className={
                                subsection.url === props.pathname
                                  ? 'current'
                                  : ''
                              }
                              role="presentation"
                            >
                              <Link
                                to={
                                  subsection.url === '' ? '/' : subsection.url
                                }
                                onClick={(e) =>
                                  handleLinkClicked(
                                    e,
                                    subsection,
                                    openTertiaryMenu,
                                    index,
                                  )
                                }
                              >
                                {subsection.nav_title || subsection.title}
                                {subsection.items.length > 0 && (
                                  <Icon name={arrowRightSVG} />
                                )}
                              </Link>
                              <CSSTransition
                                in={
                                  isTertiaryMobileMenuOpen &&
                                  tertiaryMenuOpened === index
                                }
                                timeout={500}
                                classNames="menu-drawer"
                                unmountOnExit
                              >
                                <div className="menu-drawer subsection">
                                  <div className="search-header">
                                    <div className=" search-wrapper ">
                                      <div className="search">
                                        <SearchWidget />
                                      </div>
                                    </div>

                                    <button
                                      onClick={(e) => closeTertiaryMenu(e)}
                                    >
                                      <Icon name={arrowLeftSVG} size="60px" />
                                      <span>
                                        <FormattedMessage
                                          id="Back"
                                          defaultMessage="Back"
                                        />
                                      </span>
                                    </button>
                                  </div>
                                  <ul className="sections">
                                    <li className="header">
                                      {subsection.nav_title || subsection.title}
                                    </li>
                                    <li>
                                      <Link
                                        to={
                                          subsection.url === ''
                                            ? '/'
                                            : subsection.url
                                        }
                                        onClick={closeMenus}
                                      >
                                        <FormattedMessage
                                          id="Overview"
                                          defaultMessage="Overview"
                                        />
                                      </Link>
                                    </li>
                                    {subsection.items &&
                                      subsection.items.map(
                                        (subsubsection, subindex) => (
                                          <li
                                            key={subsubsection.url}
                                            className={cx('sub-section', {
                                              'last-child':
                                                subindex ===
                                                subsection.items.length - 1,
                                              current:
                                                subsubsection.url ===
                                                props.pathname,
                                            })}
                                          >
                                            <Link
                                              to={subsubsection.url}
                                              onClick={closeMenus}
                                            >
                                              {subsubsection.nav_title ||
                                                subsubsection.title}
                                            </Link>
                                          </li>
                                        ),
                                      )}
                                  </ul>
                                  <Footer />
                                </div>
                              </CSSTransition>
                            </li>
                          ))}
                      </ul>
                      <Footer />
                    </div>
                  </CSSTransition>
                </li>
              ))}
          </ul>
          <Footer />
        </div>
      </CSSTransition>
    </div>
  );
};

export default MobileNavigation;
