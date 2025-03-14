/**
 * Intranet Search Widget component.
 * @module components/SearchWidget
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import zoomSVG from '@plone/volto/icons/zoom.svg';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  searchSite: {
    id: 'Search Site',
    defaultMessage: 'Search Site',
  },
  placeholder: {
    id: 'Search for People, E-Mail Address, Phone Number, ...',
    defaultMessage: 'Search for People, E-Mail Address, Phone Number, ...',
  },
});

/**
 * IntranetSearchWidget component class.
 * @class IntranetSearchWidget
 * @extends Component
 */
class IntranetSearchWidget extends Component {
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
    };
  }

  /**
   * On change text
   * @method onChangeText
   * @param {object} event Event object.
   * @param {string} value Text value.
   * @returns {undefined}
   */
  onChangeText(event, { value }) {
    this.setState({
      text: value,
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
    // reset input value
    this.setState({
      text: '',
    });
    event.preventDefault();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { intl } = this.props;
    return (
      <Form action="/search" onSubmit={this.onSubmit}>
        <Form.Field className="searchbox">
          <Input
            aria-label={intl.formatMessage(messages.search)}
            onChange={this.onChangeText}
            name="SearchableText"
            value={this.state.text}
            transparent
            autoComplete="off"
            placeholder={intl.formatMessage(messages.placeholder)}
            title={intl.formatMessage(messages.search)}
          />
          <button aria-label={intl.formatMessage(messages.search)}>
            <Icon name={zoomSVG} size="37px" />
          </button>
        </Form.Field>
      </Form>
    );
  }
}

export default compose(withRouter, injectIntl)(IntranetSearchWidget);
