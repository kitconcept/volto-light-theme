/**
 * OVERRIDE AboveTitle.jsx
 * REASON: Add Title header with effective date and head title
 * FILE: https://github.com/plone/volto/blob/master/src/components/manage/Blocks/Title/AboveTitle.jsx
 * FILE VERSION: Volto 17.0.0-alpha.5
 * DATE: 2023-05-01
 * DEVELOPER: @danalvrz
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from '@plone/volto/components';

/**
 * Component to display item above the title, returns null by default. Addons or themes can register the desired AboveTitle component.
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
    /* START CUSTOMIZATION */
    item['@type'] === 'News Item' ? (
      <header className="head-title">
        <FormattedDate date={item.effective} format={dateOptions} />

        {item['@type'] === 'News Item' && item.head_title && ' | '}
        {item.head_title && <span>{item.head_title}</span>}
      </header>
    ) : null
    /* END CUSTOMIZATION */
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
