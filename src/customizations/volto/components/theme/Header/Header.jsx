/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Anontools,
  LanguageSelector,
  Logo,
  Navigation,
  SearchWidget,
} from '@plone/volto/components';

/**
 * Header component class.
 * @class Header
 * @extends Component
 */
class Header extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    pathname: PropTypes.string.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div className="header-wrapper">
        <div className="ui container">
          <div className="header">
            <div className="logo-nav-wrapper">
              <div className="logo">
                <Logo />
              </div>
              <Navigation pathname={this.props.pathname} />
            </div>
            <div className="tools-search-wrapper">
              <LanguageSelector />
              {!this.props.token && (
                <div className="tools">
                  <Anontools />
                </div>
              )}
              <div className="search">
                <SearchWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  token: state.userSession.token,
}))(Header);
