/**
 * Image/video caption component.
 * @module components/Image/Caption
 */
import React from 'react';
import PropTypes from 'prop-types';
import { UniversalLink } from '@plone/volto/components';

/**
 * Image/video caption component class.
 * @function Caption
 * @params {string} as HTML tag used to wrap the caption.
 * @params {string} title Image title.
 * @params {string} description Image description.
 * @params {object} imageNumber Image number.
 * @params {object} credit Credit rich text.
 * @params {bool} downloadHref Show download link.
 * @returns {string} Markup of the component.
 */
const Caption = ({
  as = 'figcaption',
  title,
  description,
  imageNumber = '',
  credit,
  downloadHref,
  downloadFilename,
}) => {
  const As = as;

  return (
    <As>
      {title && <div className="title">{title}</div>}
      {description && (
        <div className="description">
          {description.split('\n').map((line, index) => (
            <div key={index}>{line || '\u00A0'}</div>
          ))}
        </div>
      )}
      <div className="credits">
        {credit && (
          <div>
            {imageNumber}
            Credit: {credit}
          </div>
        )}
        {downloadHref && (
          <UniversalLink
            href={downloadHref}
            download={true}
            downloadFilename={downloadFilename}
            tabIndex="0"
          >
            Download
          </UniversalLink>
        )}
      </div>
    </As>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Caption.propTypes = {
  allow_image_download: PropTypes.bool,
  credit: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Caption;
