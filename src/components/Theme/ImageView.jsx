/**
 * Image view component.
 * @module components/theme/View/ImageView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container as SemanticContainer } from 'semantic-ui-react';

// BEGIN CUSTOMIZATION
import config from '@plone/volto/registry';
import Caption from '../Caption/Caption';

// END CUSTOMIZATION

/**
 * Image view component class.
 * @function ImageView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const ImageView = ({ content }) => {
  const Image = config.getComponent('Image').component;
  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;

  return (
    <Container id="page-document" className="view-wrapper image-view">
      {/* BEGIN CUSTOMIZATION */}
      <h1 className="documentFirstHeading">{content.title}</h1>
      {content?.image?.download && (
        <figure>
          <Image item={content} imageField="image" alt="" responsive={true} />
          <Caption
            title={content.title}
            description={content.description}
            credit={
              content?.copyright_and_sources ||
              content.credit?.data ||
              content?.rights
            }
          />
        </figure>
      )}
      {/* END CUSTOMIZATION */}
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ImageView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.shape({
      scales: PropTypes.shape({
        preview: PropTypes.shape({
          download: PropTypes.string,
        }),
      }),
    }),
    // BEGIN CUSTOMIZATION
    copyright_and_sources: PropTypes.string,
    credit: PropTypes.shape({
      data: PropTypes.string,
    }),
    rights: PropTypes.string,
    // END CUSTOMIZATION
  }).isRequired,
};

export default ImageView;
