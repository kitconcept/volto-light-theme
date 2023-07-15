/**
 * OVERRIDE NewsItemView.jsx
 * REASON: BFS theme
 * DATE: 2023-07-04
 * DEVELOPER: @IFlameing
 */

/**
 * NewsItemView view component.
 * @module components/theme/View/NewsItemView
 */

import React from 'react';
import PropTypes from 'prop-types';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { FormattedDate } from '@plone/volto/components';

/**
 * NewsItemView view component class.
 * @function NewsItemView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const NewsItemView = ({ content }) => {
  return (
    <div id="page-document" className="ui container viewwrapper event-view">
      <div className="dates">
        {content?.effective ? (
          <span className="day">
            <FormattedDate date={content?.effective} />{' '}
          </span>
        ) : (
          <span className="day">No date</span>
        )}{' '}
        <span className="headtitle">
          <span className="pre-headtitle">|</span> {content?.head_title}
        </span>
      </div>
      <RenderBlocks content={content} />
    </div>
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
