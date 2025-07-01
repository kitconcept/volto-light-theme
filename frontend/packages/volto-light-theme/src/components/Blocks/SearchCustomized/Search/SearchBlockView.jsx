import React from 'react';

import ListingBody from '@plone/volto/components/manage/Blocks/Listing/ListingBody';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import config from '@plone/volto/registry';
import TopSideFacets from './layout/TopSideFacets';

import { withSearch } from './hocs';
import { withQueryString } from '@plone/volto/components/manage/Blocks/Search/hocs';
import { compose } from 'redux';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import cx from 'classnames';

// const getListingBodyVariation = (data) => {
//   const { variations } = config.blocks.blocksConfig.listing;

//   let variation = data.listingBodyTemplate
//     ? variations.find(({ id }) => id === data.listingBodyTemplate)
//     : variations.find(({ isDefault }) => isDefault);

//   if (!variation) variation = variations[0];

//   return variation;
// };

const isfunc = (obj) => typeof obj === 'function';

const _filtered = (obj) =>
  Object.assign(
    {},
    ...Object.keys(obj).map((k) => {
      const reject = k !== 'properties' && !isfunc(obj[k]);
      return reject ? { [k]: obj[k] } : {};
    }),
  );

const blockPropsAreChanged = (prevProps, nextProps) => {
  const prev = _filtered(prevProps);
  const next = _filtered(nextProps);

  return isEqual(prev, next);
};

/* I have made query: [..data.query, ...defaultQuery] to ensure that our event is included
when you change the facet. Why? When you change the facet, we are creating a new query object,
since our data.query is empty, we are losing the default event ones. so we make sure we add it
back to the query. */
const applyDefaults = (data, root) => {
  const defaultQuery = [
    {
      i: 'portal_type',
      o: 'plone.app.querystring.operation.selection.any',
      v: ['Event'],
    },
  ];

  const searchBySearchableText = data.query.filter(
    (item) => item['i'] === 'SearchableText',
  ).length;

  const sort_on = data?.sort_on
    ? { sort_on: data.sort_on }
    : searchBySearchableText === 0
      ? { sort_on: 'effective' }
      : {};
  const sort_order = data?.sort_order
    ? { sort_order: data.sort_order }
    : searchBySearchableText === 0
      ? { sort_order: 'descending' }
      : {};

  return {
    ...data,
    ...sort_on,
    ...sort_order,
    query: data?.query?.length
      ? [...data.query, ...defaultQuery]
      : defaultQuery,
  };
};

const SearchBlockView = (props) => {
  const { id, data, searchData, mode = 'view', className } = props;
  const selectedView = 'eventCalendar';
  const root = useSelector((state) => state.breadcrumbs.root);
  const listingBodyData = applyDefaults(searchData, root);

  const { variations } = config.blocks.blocksConfig.listing;
  const listingBodyVariation = variations.find(({ id }) => id === selectedView);

  return (
    <div className={cx('block eventsearch', selectedView, className)}>
      <TopSideFacets
        {...props}
        isEditMode={mode === 'edit'}
        selectedView={selectedView}
      >
        <ListingBody
          id={id}
          variation={{ ...data, ...listingBodyVariation }}
          data={listingBodyData}
          path={props.path}
          isEditMode={mode === 'edit'}
        />
      </TopSideFacets>
    </div>
  );
};

export const SearchBlockViewComponent = compose(
  withBlockExtensions,
  (Component) => React.memo(Component, blockPropsAreChanged),
)(SearchBlockView);

export default withSearch()(withQueryString(SearchBlockViewComponent));
