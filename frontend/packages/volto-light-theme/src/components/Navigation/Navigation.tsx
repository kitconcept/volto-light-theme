import React, { useState, useEffect, useRef, useCallback } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import doesNodeContainClick from '../../helpers/doesNodeContainClick';
import { useIntl, defineMessages } from 'react-intl';
import cx from 'classnames';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import { hasApiExpander } from '@plone/volto/helpers/Utils/Utils';
import config from '@plone/volto/registry';

import { getNavigation } from '@plone/volto/actions/navigation/navigation';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import clearSVG from '@plone/volto/icons/clear.svg';
import NavItem from '@plone/volto/components/theme/Navigation/NavItem';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';

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

type NavigationItem = {
  title: string;
  nav_title?: string;
  url: string;
  items?: NavigationItem[];
};

type NavigationProps = {
  pathname: string;
};

type HeaderSettings = {
  has_fat_menu?: boolean;
};

type RootState = {
  content: {
    data?: {
      '@components'?: {
        inherit?: {
          'voltolighttheme.header'?: {
            data?: HeaderSettings;
          };
        };
      };
    };
  };
  form: {
    global?: {
      has_fat_menu?: boolean;
      [key: string]: unknown;
    };
  };
  intl: {
    locale: string;
  };
  userSession: {
    token?: string | null;
  };
  navigation: {
    items: NavigationItem[];
  };
};

const Navigation = ({ pathname }: NavigationProps) => {
  const [desktopMenuOpen, setDesktopMenuOpen] = useState<number | null>(null);
  const [currentOpenIndex, setCurrentOpenIndex] = useState<number | null>(null);
  const navigation = useRef<HTMLElement | null>(null);
  const dispatch = useDispatch();
  const intl = useIntl();
  const headerSettings = useSelector(
    (state: RootState) =>
      state.content.data?.['@components']?.inherit?.['voltolighttheme.header']
        ?.data,
  );
  const formData = useSelector((state: RootState) => state.form.global);

  const hasFatMenuSetting =
    !isEmpty(formData) && formData?.has_fat_menu !== undefined
      ? formData.has_fat_menu
      : headerSettings?.has_fat_menu;
  const hasFatMenu = hasFatMenuSetting ?? false;

  const lang = useSelector((state: RootState) => state.intl.locale);
  const token = useSelector(
    (state: RootState) => state.userSession.token,
    shallowEqual,
  );
  const items = useSelector(
    (state: RootState) => state.navigation.items,
    shallowEqual,
  );

  const closeMenu = useCallback(() => {
    setDesktopMenuOpen(null);
    setCurrentOpenIndex(null);
  }, [setDesktopMenuOpen, setCurrentOpenIndex]);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target;
      if (
        (navigation.current && doesNodeContainClick(navigation.current, e)) ||
        (target instanceof Element && target.parentElement === null)
      )
        return;
      closeMenu();
    },
    [closeMenu],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (!hasApiExpander('navigation', getBaseUrl(pathname))) {
      dispatch(getNavigation(getBaseUrl(pathname), config.settings.navDepth));
    }
  }, [pathname, token, dispatch]);

  const isExact = (url: string) => {
    return (url === '' && pathname === '/') || (url !== '' && pathname === url);
  };

  const isActive = (url: string) => {
    return (
      (url === '' && pathname === '/') ||
      (url !== '' && (pathname === url || pathname.startsWith(url + '/')))
    );
  };

  const openMenu = (index: number) => {
    if (index === currentOpenIndex) {
      setDesktopMenuOpen(null);
      setCurrentOpenIndex(null);
    } else {
      setDesktopMenuOpen(index);
      setCurrentOpenIndex(index);
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              {hasFatMenu ? (
                <>
                  <button
                    onClick={() => openMenu(index)}
                    className={cx('item', {
                      active:
                        desktopMenuOpen === index ||
                        (!desktopMenuOpen && pathname === item.url),
                    })}
                    aria-label={intl.formatMessage(messages.openFatMenu)}
                    aria-expanded={desktopMenuOpen === index}
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
                        <UniversalLink
                          href={item.url === '' ? '/' : item.url}
                          onClick={() => closeMenu()}
                          className={cx('submenu-header', {
                            active: isActive(item.url),
                          })}
                        >
                          <h2>{item.nav_title ?? item.title}</h2>
                        </UniversalLink>
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
                                <UniversalLink
                                  href={subitem.url}
                                  onClick={() => closeMenu()}
                                  className={cx({
                                    current: isExact(subitem.url),
                                    active: isActive(subitem.url),
                                  })}
                                  {...(isExact(subitem.url)
                                    ? { 'aria-current': 'page' }
                                    : {})}
                                >
                                  <span className="left-arrow">&#8212;</span>
                                  <span>
                                    {subitem.nav_title || subitem.title}
                                  </span>
                                </UniversalLink>
                                <div className="sub-submenu">
                                  <ul>
                                    {subitem.items &&
                                      subitem.items.length > 0 &&
                                      subitem.items.map((subsubitem) => (
                                        <li
                                          className="subsubitem-wrapper"
                                          key={subsubitem.url}
                                        >
                                          <UniversalLink
                                            href={subsubitem.url}
                                            onClick={() => closeMenu()}
                                            className={cx({
                                              current: isExact(subsubitem.url),
                                              active: isActive(subsubitem.url),
                                            })}
                                            {...(isExact(subsubitem.url)
                                              ? { 'aria-current': 'page' }
                                              : {})}
                                          >
                                            <span className="left-arrow">
                                              &#8212;
                                            </span>
                                            <span>
                                              {subsubitem.nav_title ||
                                                subsubitem.title}
                                            </span>
                                          </UniversalLink>
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

export default Navigation;
