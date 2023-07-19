/**
 * Image view component.
 * @module components/theme/View/ImageView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container as SemanticContainer } from 'semantic-ui-react';

import { flattenToAppURL } from '@plone/volto/helpers';

// BEGIN CUSTOMIZATION
import config from '@plone/volto/registry';
import Caption from '@kitconcept/volto-image-block/components/Caption/Caption';

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
          <Image
            width={content.image?.width}
            height={content.image?.height}
            alt={content.alt_tag || ''}
            src={content.image}
            blurhash={content.blurhash}
            blurhashOptions={{
              // override default width 100%
              style: {},
            }}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <Caption
            title={content.title}
            description={content.description}
            credit={content.credit?.data}
            downloadFilename={content.title}
            downloadHref={
              content.allow_image_download &&
              flattenToAppURL(
                content.image.scales.fullscreen?.download ||
                  content.image.download,
              )
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
    allow_image_download: PropTypes.bool,
    credit: PropTypes.shape({
      data: PropTypes.string,
    }),
    alt_tag: PropTypes.string,
    // END CUSTOMIZATION
  }).isRequired,
};

export default ImageView;
