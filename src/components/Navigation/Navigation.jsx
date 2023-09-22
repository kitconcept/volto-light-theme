/**
 * Navigation components.
 * @module components/theme/Navigation/Navigation
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, withRouter } from 'react-router-dom';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import { getBaseUrl, hasApiExpander } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

import { getNavigation } from '@plone/volto/actions';
import { Icon } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  overview: {
    id: 'Overview',
    defaultMessage: 'Overview',
  },
});

/**
 * Navigation container class.
 * @class Navigation
 * @extends Component
 */
class Navigation extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getNavigation: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
    lang: PropTypes.string.isRequired,
  };

  static defaultProps = {
    token: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Navigation
   */
  constructor(props) {
    super(props);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
    this.state = {
      isMobileMenuOpen: false,
      desktopMenuOpen: null,
      currentOpenIndex: null,
    };
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */

  componentDidMount() {
    const { settings } = config;
    const { lang, pathname } = this.props;
    if (!hasApiExpander('navigation', getBaseUrl(this.props.pathname))) {
      // For /profile paths, hack the call to the endpoint
      let adjustedPathName = pathname;
      if (pathname.startsWith('/profile')) {
        adjustedPathName = `/${lang}`;
      }
      this.props.getNavigation(getBaseUrl(adjustedPathName), settings.navDepth);
    }
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { settings } = config;
    const { lang, pathname } = nextProps;
    if (
      nextProps.pathname !== this.props.pathname ||
      nextProps.token !== this.props.token
    ) {
      if (!hasApiExpander('navigation', getBaseUrl(this.props.pathname))) {
        // For /profile paths, hack the call to the endpoint
        let adjustedPathName = pathname;
        if (pathname.startsWith('/profile')) {
          adjustedPathName = `/${lang}`;
        }
        this.props.getNavigation(
          getBaseUrl(adjustedPathName),
          settings.navDepth,
        );
      }
    }
  }

  /**
   * Toggle mobile menu's open state
   * @method toggleMobileMenu
   * @returns {undefined}
   */
  toggleMobileMenu() {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen });
  }

  /**
   * Close mobile menu
   * @method closeMobileMenu
   * @returns {undefined}
   */
  closeMobileMenu() {
    if (!this.state.isMobileMenuOpen) {
      return;
    }
    this.setState({ isMobileMenuOpen: false });
  }

  isActive(url) {
    return (
      (url === '' && this.props.pathname === '/') ||
      (url !== '' && this.props.pathname === url)
    );
  }

  handleClickOutside = (e) => {
    if (
      this.navigation.current &&
      doesNodeContainClick(this.navigation.current, e)
    )
      return;
    this.closeMenu();
  };

  openMenu = (index) => {
    if (index === this.state.currentOpenIndex) {
      this.setState({
        desktopMenuOpen: null,
        currentOpenIndex: null,
      });
    } else {
      this.setState({
        desktopMenuOpen: index,
        currentOpenIndex: index,
      });
    }
  };

  closeMenu = (index) => {
    this.setState({
      desktopMenuOpen: null,
      currentOpenIndex: null,
    });
  };

  navigation = React.createRef();
  navigationItems = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <nav
        id="navigation"
        aria-label="navigation"
        className="navigation"
        ref={this.navigation}
      >
        <div
          stackable
          pointing
          secondary
          className={'computer large screen widescreen only'}
        >
          <ul className="desktop-menu">
            {this.props.items.map((item, index) => (
              <li key={item.url}>
                <button
                  onClick={() =>
                    !this.state.isMobileMenuOpen
                      ? this.openMenu(index)
                      : window.open(item.url, '_self')
                  }
                  className={cx('item', {
                    active:
                      this.state.desktopMenuOpen === index ||
                      (!this.state.desktopMenuOpen &&
                        this.props.location.pathname === item.url),
                  })}
                >
                  {item.title}
                </button>
                <div className="submenu-wrapper">
                  <div
                    className={cx('submenu', {
                      active: this.state.desktopMenuOpen === index,
                    })}
                  >
                    <div
                      role="presentation"
                      className="close"
                      onClick={this.closeMenu}
                    >
                      <Icon name={clearSVG} size="48px" />
                    </div>
                    <div className="submenu-inner">
                      <NavLink
                        to={item.url === '' ? '/' : item.url}
                        onClick={() => this.closeMenu()}
                        className="submenu-header"
                      >
                        <h2>
                          {item.nav_title ?? item.title} (
                          {this.props.intl.formatMessage(messages.overview)})
                        </h2>
                      </NavLink>
                      <ul>
                        {item.items &&
                          item.items.length > 0 &&
                          item.items.map((subitem) => (
                            <div className="subitem-wrapper" key={subitem.url}>
                              <li key={subitem.url}>
                                <NavLink
                                  to={subitem.url}
                                  onClick={() => this.closeMenu()}
                                  className={cx({
                                    current: this.isActive(subitem.url),
                                  })}
                                >
                                  <span className="left-arrow">&#8212;</span>
                                  <span>
                                    {subitem.nav_title || subitem.title}
                                  </span>
                                </NavLink>
                              </li>
                              <div className="sub-submenu">
                                <ul>
                                  {subitem.items &&
                                    subitem.items.length > 0 &&
                                    subitem.items.map((subsubitem) => (
                                      <div
                                        className="subsubitem-wrapper"
                                        key={subsubitem.url}
                                      >
                                        <li key={subsubitem.url}>
                                          <NavLink
                                            to={subsubitem.url}
                                            onClick={() => this.closeMenu()}
                                            className={cx({
                                              current: this.isActive(
                                                subsubitem.url,
                                              ),
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
                                      </div>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* {this.props.items.map((item) => (
             <NavLink
               to={item.url === '' ? '/' : item.url}
               key={item.url}
               className="item"
               activeClassName="active"
               exact={
                 settings.isMultilingual
                   ? item.url === `/${lang}`
                   : item.url === ''
               }
             >
               {item.nav_title || item.title}
             </NavLink>
           ))} */}
        </div>
      </nav>
    );
  }
}

export default compose(
  injectIntl,
  withRouter,
  connect(
    (state) => ({
      token: state.userSession.token,
      items: state.navigation.items,
      lang: state.intl.locale,
    }),
    { getNavigation },
  ),
)(Navigation);
