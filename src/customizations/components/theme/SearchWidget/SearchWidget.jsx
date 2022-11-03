/**
 * Search widget component.
 * @module components/theme/SearchWidget/SearchWidget
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';

import { Icon } from '@plone/volto/components';
import zoomSVG from '@plone/volto/icons/zoom.svg';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  searchSite: {
    id: 'Search Site',
    defaultMessage: 'Search Site',
  },
});

/**
 * SearchWidget component class.
 * @class SearchWidget
 * @extends Component
 */
class SearchWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    pathname: PropTypes.string,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      text: '',
      active: false,
    };
  }

  /**
   * On change text
   * @method onChangeText
   * @param {object} event Event object.
   * @param {string} value Text value.
   * @returns {undefined}
   */
  onChangeText(event) {
    this.setState({
      text: event.target.value,
    });
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {event} event Event object.
   * @returns {undefined}
   */
  onSubmit(event) {
    const path =
      this.props.pathname?.length > 0
        ? `&path=${encodeURIComponent(this.props.pathname)}`
        : '';
    this.props.history.push(
      `/search?SearchableText=${encodeURIComponent(this.state.text)}${path}`,
    );
    event.preventDefault();
    this.setState({ active: false });
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  handleClickOutside = (e) => {
    if (
      this.searchbar.current &&
      doesNodeContainClick(this.searchbar.current, e)
    )
      return;
    this.setState({ active: false });
  };

  searchbar = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <>
        <div
          ref={this.searchbar}
          className={cx('search-bar', {
            active: this.state.active,
          })}
        >
          <div className="ui container">
            <form action="/search" onSubmit={this.onSubmit}>
              <div className="searchbox">
                <input
                  aria-label={this.props.intl.formatMessage(messages.search)}
                  onChange={(e) => this.onChangeText(e)}
                  name="SearchableText"
                  value={this.state.text}
                  autoComplete="off"
                  placeholder={this.props.intl.formatMessage(
                    messages.searchSite,
                  )}
                  title={this.props.intl.formatMessage(messages.search)}
                />
                <button
                  aria-label={this.props.intl.formatMessage(messages.search)}
                >
                  <Icon name={zoomSVG} size="48px" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="search-button">
          <button
            aria-label={this.props.intl.formatMessage(messages.search)}
            onClick={() => this.setState({ active: !this.state.active })}
          >
            {' '}
            <Icon name={zoomSVG} size="48px" />
          </button>
        </div>
      </>
    );
  }
}

export default compose(withRouter, injectIntl)(SearchWidget);
