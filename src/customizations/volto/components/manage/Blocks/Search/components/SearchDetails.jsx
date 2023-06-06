/**
 * OVERRIDE SearchDetails.jsx
 * REASON: Special template for displaying this component, use h2 instead of h4
 */
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  searchResults: {
    id: 'Search results',
    defaultMessage: 'Search results',
  },
  searchedFor: {
    id: 'Searched for',
    defaultMessage: 'Searched for',
  },
});

const SearchDetails = ({ total, text }) => {
  const intl = useIntl();
  return (
    <h2 className="search-details">
      <nobr>
        <span className="number">{total}</span>{' '}
        <span className="label">
          {intl.formatMessage(messages.searchResults)}
        </span>
      </nobr>
    </h2>
  );
};

export default SearchDetails;
