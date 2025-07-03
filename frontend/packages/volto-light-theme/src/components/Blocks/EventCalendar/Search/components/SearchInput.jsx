import React from 'react';
import { TextField, Button } from '@plone/components';
import { defineMessages, useIntl } from 'react-intl';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import loupeSVG from '@plone/volto/icons/zoom.svg';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  cancel_search: {
    id: 'Cancel search',
    defaultMessage: 'Cancel search',
  },
});

const SearchInput = (props) => {
  const { data, searchText, setSearchText, isLive, onTriggerSearch } = props;
  const intl = useIntl();

  return (
    <div className="search-input">
      <TextField
        id={`${props.id}-searchtext`}
        value={searchText}
        placeholder={
          data.searchInputPrompt || intl.formatMessage(messages.search)
        }
        onKeyPress={(event) => {
          if (isLive || event.key === 'Enter') onTriggerSearch(searchText);
        }}
        onChange={(value) => {
          setSearchText(value);
          if (isLive) {
            onTriggerSearch(value);
          }
        }}
      />

      <div className="search-input-actions">
        {isLive && (
          <>
            <Button
              className="search-input-live-icon-button"
              aria-label={`${intl.formatMessage(messages.search)} ${searchText}`}
            >
              <Icon name={loupeSVG} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
