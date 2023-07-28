/**
 * Image/video caption component.
 * @module components/Image/Caption
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Image/video caption component class.
 * @function Caption
 * @params {string} as HTML tag used to wrap the caption.
 * @params {string} title Image title.
 * @params {string} description Image description.
 * @params {object} credit Credit text.
 * @returns {string} Markup of the component.
 */
const Caption = ({ as = 'figcaption', title, description, credit }) => {
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
      {credit && <div className="credits">{credit}</div>}
    </As>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Caption.propTypes = {
  credit: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Caption;
