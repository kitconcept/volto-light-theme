import React from 'react';
import { flushSync } from 'react-dom';
import { Grid } from 'semantic-ui-react';
import { DateRangePicker } from '../components/DateRangePicker';
import { Facets } from '@plone/volto/components/manage/Blocks/Search/components';

import { SearchInput } from '../components';
// import SearchDetails from '../../../Search/components/SearchDetails';

function getDateRangeIOV(startDate, endDate) {
  if (startDate && endDate && startDate !== endDate) {
    return [
      {
        i: 'start',
        o: 'plone.app.querystring.operation.date.largerThan',
        v: startDate,
      },
      {
        i: 'end',
        o: 'plone.app.querystring.operation.date.lessThan',
        v: endDate,
      },
    ];
  }

  if (startDate) {
    return [
      {
        i: 'start',
        o: 'plone.app.querystring.operation.date.largerThan',
        v: startDate,
      },
    ];
  }

  if (endDate) {
    return [
      {
        i: 'end',
        o: 'plone.app.querystring.operation.date.lessThan',
        v: endDate,
      },
    ];
  }

  return [];
}

const toJSDate = (calendarDate, hour = 0, minute = 0, second = 0) => {
  if (!calendarDate) return '';
  const date = new Date(
    calendarDate.year,
    calendarDate.month - 1,
    calendarDate.day,
    hour,
    minute,
    second,
  );
  return date.toISOString().slice(0, 19);
};

const TopSideFacets = (props) => {
  const {
    children,
    data,
    // totalItems,
    facets,
    setFacets,
    // setSortOn,
    // setSortOrder,
    // sortOn,
    // sortOrder,
    onTriggerSearch,
    searchedText, // search text for previous search
    // searchText, // search text currently being entered (controlled input)
    // isEditMode,
    querystring = {},
    handleDateRangeChange,
    // searchData,
    // mode = 'view',
    // variation,
  } = props;
  const { showSearchButton } = data;
  const isLive = !showSearchButton;
  const onhandleDateRangeChange = (value) => {
    const start = toJSDate(value.start);
    const end = toJSDate(value.end);
    const dateRangeQuery = getDateRangeIOV(start, end);
    handleDateRangeChange(dateRangeQuery);
  };

  const FacetWrapper = ({ children }) => {
    const colWidth = data.facets.length < 5 ? 12 / data.facets.length : 4;
    return (
      <Grid.Column mobile={12} tablet={colWidth} computer={colWidth}>
        {children}
      </Grid.Column>
    );
  };

  return (
    <div className="search-block-event searchBlock-facets">
      {data.headline && <h2 className="headline">{data.headline}</h2>}
      <div className="first-row">
        <DateRangePicker onChange={onhandleDateRangeChange} />
        {/* <SearchDetails
          text={searchedText}
          total={totalItems}
          as="h5"
          data={data}
        /> */}
        {/* {showSortOnEvent && (
          <div className="search-filters-sort">
            <div className="sort-on-wrapper">
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
          </div>
        )} */}
        <div className="search-wrapper">
          <SearchInput {...props} isLive={isLive} />
        </div>
      </div>
      <Grid.Row>
        <Grid.Column>
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
        </Grid.Column>
      </Grid.Row>

      <Grid.Row className="template-container">
        <Grid.Column>{children}</Grid.Column>
      </Grid.Row>
    </div>
  );
};

export default TopSideFacets;
