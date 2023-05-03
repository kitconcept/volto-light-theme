import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from '@plone/volto/components';

/**
 * Custom AboveTitle component to display item above the title.
 * @function Field
 * @param {Object} props Component properties.
 * @param {Object} props.item Item to display above the title.
 * @returns {string} Markup of the component.
 */
const AboveTitle = ({ item }) => {
  const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return (
    <header className="head-title">
      <FormattedDate date={item.effective} format={dateOptions} />
      {item.effective && item.head_title && ' | '}
      {item.head_title && <span>{item.head_title}</span>}
    </header>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
AboveTitle.propTypes = {
  /**
   * Item to display above the title.
   */
  item: PropTypes.object,
};

export default AboveTitle;
