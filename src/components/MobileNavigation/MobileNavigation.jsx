import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import cx from 'classnames';

import { CSSTransition } from 'react-transition-group';
import { FormattedMessage } from 'react-intl';

import { BodyClass } from '@plone/volto/helpers';
import { Icon, LanguageSelector } from '@plone/volto/components';
import arrowRightSVG from '@plone/volto/icons/right-key.svg';
import arrowLeftSVG from '@plone/volto/icons/left-key.svg';
import zoomSVG from '@plone/volto/icons/zoom.svg';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [secondaryMenuOpened, setSecondaryMenuOpened] = React.useState(null);
  const [isSecondaryMobileMenuOpen, setIsSecondaryMobileMenuOpen] =
    React.useState(false);
  const [tertiaryMenuOpened, setTertiaryMenuOpened] = React.useState(null);
  const [isTertiaryMobileMenuOpen, setIsTertiaryMobileMenuOpen] =
    React.useState(false);
  const intl = useIntl();
  const menus = React.useRef(null);
  const currentLang = useSelector((state) => state.intl.locale);
  const items = useSelector((state) => state.navigation.items || []);
  const history = useHistory();

  const Footer = () => (
    <ul className="mobile-tools">
      <li>
        <LanguageSelector fullLabel={true} />
      </li>
    </ul>
  );

  function toggleMobileMenu() {
    const body = document.getElementsByTagName('body')[0];
    if (!isMobileMenuOpen) {
      body.style.position = 'fixed';
      body.style.width = '100%';
      body.style.top = '0px';
      body.style.left = '0px';
    } else {
      body.style = '';
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);

    if (isMobileMenuOpen) {
      setIsSecondaryMobileMenuOpen(false);
      setSecondaryMenuOpened(null);
      setIsTertiaryMobileMenuOpen(false);
      setTertiaryMenuOpened(null);
    }
  }

  function openSecondaryMenu(index) {
    setSecondaryMenuOpened(index);
    setIsSecondaryMobileMenuOpen(true);
  }

  function closeSecondaryMenu(e) {
    e.stopPropagation();
    setIsSecondaryMobileMenuOpen(false);
    setSecondaryMenuOpened(null);
  }

  function openTertiaryMenu(index) {
    setTertiaryMenuOpened(index);
    setIsTertiaryMobileMenuOpen(true);
  }

  function closeTertiaryMenu(e) {
    e.stopPropagation();
    setIsTertiaryMobileMenuOpen(false);
    setTertiaryMenuOpened(null);
  }

  function closeMenus(e) {
    e.stopPropagation();
    setIsSecondaryMobileMenuOpen(false);
    setIsTertiaryMobileMenuOpen(false);
    setSecondaryMenuOpened(null);
    setTertiaryMenuOpened(null);
    setIsMobileMenuOpen(false);
    const body = document.getElementsByTagName('body')[0];
    body.style = '';
  }

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
        unmountOnExit
      >
        <div className="menu-drawer">
          <BodyClass className="has-menu-open" />
          <div className="search-header">
            <Link
              to={props.pathname.replace(/\/$/, '') + '/search'}
              title={intl.formatMessage(messages.search)}
              onClick={(e) => closeMenus(e)}
            >
              <button
                basic
                icon
                aria-label={intl.formatMessage(messages.search)}
              >
                <Icon name={zoomSVG} size="36px" />
              </button>
            </Link>
          </div>
          <ul className="sections">
            <li className="header">
              <Link to={`/${currentLang}`} onClick={closeMenus}>
                <FormattedMessage id="Home" defaultMessage="Home" />
              </Link>
            </li>
            {items &&
              items.map((section, index) => (
                <li
                  key={section.url}
                  className={section.url === props.pathname ? 'current' : ''}
                  onClick={(e) => {
                    if (section.items.length > 0) {
                      openSecondaryMenu(index);
                    } else {
                      history.push(section.url);
                      return closeMenus(e);
                    }
                  }}
                  role="presentation"
                >
                  {section.nav_title || section.title}
                  {section.items.length > 0 && <Icon name={arrowRightSVG} />}
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
                        <Link
                          to={props.pathname.replace(/\/$/, '') + '/search'}
                          title={intl.formatMessage(messages.search)}
                          onClick={(e) => closeMenus(e)}
                        >
                          <button
                            basic
                            icon
                            aria-label={intl.formatMessage(messages.search)}
                          >
                            <Icon name={zoomSVG} size="36px" />
                          </button>
                        </Link>
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
                            onClick={(e) => closeMenus(e)}
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
                              onClick={(e) => {
                                if (subsection.items.length > 0) {
                                  openTertiaryMenu(index);
                                } else {
                                  history.push(subsection.url);
                                  return closeMenus(e);
                                }
                              }}
                              role="presentation"
                            >
                              {subsection.nav_title || subsection.title}
                              {subsection.items.length > 0 && (
                                <Icon name={arrowRightSVG} />
                              )}
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
                                    <Link
                                      to={
                                        props.pathname.replace(/\/$/, '') +
                                        '/search'
                                      }
                                      title={intl.formatMessage(
                                        messages.search,
                                      )}
                                      onClick={(e) => closeMenus(e)}
                                    >
                                      <button
                                        basic
                                        icon
                                        aria-label={intl.formatMessage(
                                          messages.search,
                                        )}
                                      >
                                        <Icon name={zoomSVG} size="36px" />
                                      </button>
                                    </Link>
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
                                        onClick={(e) => closeMenus(e)}
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
                                              onClick={(e) => closeMenus(e)}
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
