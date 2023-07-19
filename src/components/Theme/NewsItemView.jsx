/**
 * NewsItemView view component.
 * @module components/theme/View/NewsItemView
 */

import React from 'react';
import PropTypes from 'prop-types';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { FormattedDate } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { Container as SemanticContainer } from 'semantic-ui-react';

/**
 * NewsItemView view component class.
 * @function NewsItemView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const NewsItemView = ({ content }) => {
  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;
  return (
    <Container id="page-document" className="view-wrapper newsitem-view">
      <div className="dates">
        {content?.effective ? (
          <span className="day">
            <FormattedDate date={content?.effective} />{' '}
          </span>
        ) : (
          <span className="day">No date</span>
        )}{' '}
        {content?.head_title && (
          <span className="headtitle">| {content?.head_title}</span>
        )}
      </div>
      <RenderBlocks content={content} />
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
NewsItemView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.shape({
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default NewsItemView;
