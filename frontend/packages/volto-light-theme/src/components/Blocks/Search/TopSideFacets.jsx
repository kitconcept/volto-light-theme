import React from 'react';
import {
  SearchInput,
  SearchDetails,
  Facets,
  // FilterList,
  SortOn,
} from '@plone/volto/components/manage/Blocks/Search/components';
import { Grid } from 'semantic-ui-react';
import { flushSync } from 'react-dom';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  searchButtonText: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  sort: {
    id: 'Sorting',
    defaultMessage: 'Sorting',
  },
});

const TopSideFacets = (props) => {
  const {
    children,
    data,
    totalItems,
    facets,
    setFacets,
    setSortOn,
    setSortOrder,
    sortOn,
    sortOrder,
    onTriggerSearch,
    searchedText, // search text for previous search
    // searchText, // search text currently being entered (controlled input)
    isEditMode,
    querystring = {},
    // searchData,
    // mode = 'view',
    // variation,
  } = props;
  const { showSearchButton } = data;
  const isLive = !showSearchButton;
  const intl = useIntl();

  const FacetWrapper = ({ children }) => {
    const colWidth = data.facets.length < 5 ? 12 / data.facets.length : 4;
    return (
      <Grid.Column mobile={12} tablet={colWidth} computer={colWidth}>
        {children}
      </Grid.Column>
    );
  };

  return (
    <div className="searchBlock-container">
      {data.headline && <h2 className="headline">{data.headline}</h2>}

      <Grid className="searchBlock-facets" stackable>
        <Grid.Row>
          <Grid.Column>
            {(Object.keys(data).includes('showSearchInput')
              ? data.showSearchInput
              : true) && (
              <div className="search-input-resultscount-sort">
                <div className="search-wrapper">
                  <SearchInput {...props} isLive={isLive} />
                  {/* {data.showSearchButton && (
                    <Button primary onClick={() => onTriggerSearch(searchText)}>
                      {data.searchButtonLabel ||
                        intl.formatMessage(messages.searchButtonText)}
                    </Button>
                  )} */}
                </div>

                <div className="search-details-sort">
                  <SearchDetails
                    text={searchedText}
                    total={totalItems}
                    as="h5"
                  />
                  {data.sortOnOptions && data.sortOnOptions.length > 0 && (
                    <div className="sort-on-wrapper">
                      <span className="sort-label">
                        {intl.formatMessage(messages.sort)}
                      </span>
                      <SortOn
                        data={data}
                        querystring={querystring}
                        isEditMode={isEditMode}
                        sortOn={sortOn}
                        sortOrder={sortOrder}
                        setSortOn={(sortOn) => {
                          flushSync(() => {
                            setSortOn(sortOn);
                            onTriggerSearch(searchedText || '', facets, sortOn);
                          });
                        }}
                        setSortOrder={(sortOrder) => {
                          flushSync(() => {
                            setSortOrder(sortOrder);
                            onTriggerSearch(
                              searchedText || '',
                              facets,
                              sortOn,
                              sortOrder,
                            );
                          });
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {data.facets?.length > 0 && (
              <div className="facets">
                {data.facetsTitle && <h3>{data.facetsTitle}</h3>}
                <Grid verticalAlign="bottom" columns={12}>
                  <Facets
                    data={data}
                    querystring={querystring}
                    facets={facets}
                    setFacets={(f) => {
                      flushSync(() => {
                        setFacets(f);
                        onTriggerSearch(searchedText || '', f);
                      });
                    }}
                    facetWrapper={FacetWrapper}
                  />
                </Grid>
              </div>
            )}
            {/* <div className="search-filters-sort">
              <FilterList
                {...props}
                isEditMode={isEditMode}
                setFacets={(f) => {
                  flushSync(() => {
                    setFacets(f);
                    onTriggerSearch(searchedText || '', f);
                  });
                }}
              />
            </div> */}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>{children}</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default TopSideFacets;
