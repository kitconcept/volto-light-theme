// SemanticUI-free pre-@plone/components

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { NavLink } from 'react-router-dom';
import doesNodeContainClick from '../../helpers/doesNodeContainClick';
import { useIntl, defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import { hasApiExpander } from '@plone/volto/helpers/Utils/Utils';
import config from '@plone/volto/registry';

import { getNavigation } from '@plone/volto/actions/navigation/navigation';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import clearSVG from '@plone/volto/icons/clear.svg';
import NavItem from '@plone/volto/components/theme/Navigation/NavItem';

const messages = defineMessages({
  closeMenu: {
    id: 'Close menu',
    defaultMessage: 'Close menu',
  },
  openFatMenu: {
    id: 'Open menu',
    defaultMessage: 'Open menu',
  },
});

const Navigation = ({ pathname }) => {
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(null);
  const [currentOpenIndex, setCurrentOpenIndex] = useState(null);
  const navigation = useRef(null);
  const dispatch = useDispatch();
  const intl = useIntl();
  const headerSettings = useSelector(
    (state) =>
      state.content.data?.['@components']?.inherit?.['voltolighttheme.header']
        ?.data,
  );
  const formData = useSelector((state) => state.form.global);

  const has_fat_menu =
    !isEmpty(formData) && formData?.has_fat_menu
      ? formData.has_fat_menu
      : headerSettings?.has_fat_menu;

  const lang = useSelector((state) => state.intl.locale);
  const token = useSelector((state) => state.userSession.token, shallowEqual);
  const items = useSelector((state) => state.navigation.items, shallowEqual);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navigation.current && doesNodeContainClick(navigation.current, e))
        return;
      closeMenu();
    };

    document.addEventListener('mousedown', handleClickOutside, false);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  }, []);

  useEffect(() => {
    if (!hasApiExpander('navigation', getBaseUrl(pathname))) {
      dispatch(getNavigation(getBaseUrl(pathname), config.settings.navDepth));
    }
  }, [pathname, token, dispatch]);

  const isActive = (url) => {
    return (url === '' && pathname === '/') || (url !== '' && pathname === url);
  };

  const openMenu = (index) => {
    if (index === currentOpenIndex) {
      setDesktopMenuOpen(null);
      setCurrentOpenIndex(null);
    } else {
      setDesktopMenuOpen(index);
      setCurrentOpenIndex(index);
    }
  };

  const closeMenu = (index) => {
    setDesktopMenuOpen(null);
    setCurrentOpenIndex(null);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <nav
      id="navigation"
      aria-label="navigation"
      className="navigation"
      ref={navigation}
    >
      <div className={'computer large screen widescreen only'}>
        <ul className="desktop-menu">
          {items.map((item, index) => (
            <li key={item.url}>
              {has_fat_menu ? (
                <>
                  <button
                    onClick={() => openMenu(index)}
                    className={cx('item', {
                      active:
                        desktopMenuOpen === index ||
                        (!desktopMenuOpen && pathname === item.url),
                    })}
                    aria-label={intl.formatMessage(messages.openFatMenu)}
                    aria-expanded={desktopMenuOpen === index ? true : false}
                  >
                    {item.title}
                  </button>

                  <div className="submenu-wrapper">
                    <div
                      className={cx('submenu', {
                        active: desktopMenuOpen === index,
                      })}
                    >
                      <div className="submenu-inner">
                        <NavLink
                          to={item.url === '' ? '/' : item.url}
                          onClick={() => closeMenu()}
                          className="submenu-header"
                        >
                          <h2>{item.nav_title ?? item.title}</h2>
                        </NavLink>
                        <button
                          className="close"
                          onClick={closeMenu}
                          aria-label={intl.formatMessage(messages.closeMenu)}
                        >
                          <Icon name={clearSVG} size="48px" />
                        </button>
                        <ul>
                          {item.items &&
                            item.items.length > 0 &&
                            item.items.map((subitem) => (
                              <li className="subitem-wrapper" key={subitem.url}>
                                <NavLink
                                  to={subitem.url}
                                  onClick={() => closeMenu()}
                                  className={cx({
                                    current: isActive(subitem.url),
                                  })}
                                >
                                  <span className="left-arrow">&#8212;</span>
                                  <span>
                                    {subitem.nav_title || subitem.title}
                                  </span>
                                </NavLink>
                                <div className="sub-submenu">
                                  <ul>
                                    {subitem.items &&
                                      subitem.items.length > 0 &&
                                      subitem.items.map((subsubitem) => (
                                        <li
                                          className="subsubitem-wrapper"
                                          key={subsubitem.url}
                                        >
                                          <NavLink
                                            to={subsubitem.url}
                                            onClick={() => closeMenu()}
                                            className={cx({
                                              current: isActive(subsubitem.url),
                                            })}
                                          >
                                            <span className="left-arrow">
                                              &#8212;
                                            </span>
                                            <span>
                                              {subsubitem.nav_title ||
                                                subsubitem.title}
                                            </span>
                                          </NavLink>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <NavItem item={item} lang={lang} key={item.url} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  pathname: PropTypes.string.isRequired,
};

Navigation.defaultProps = {
  token: null,
};

export default injectIntl(Navigation);
