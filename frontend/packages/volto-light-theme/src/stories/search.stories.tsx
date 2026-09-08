import React from 'react';
import config from '@plone/volto/registry';
import { SearchBlockViewComponent } from '@plone/volto/components/manage/Blocks/Search/SearchBlockView';
import { searchResultItems } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Search',
  component: SearchBlockViewComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBlockViewComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const BLOCK_ID = 'search-1';

// Same approach as the Event Calendar: render the inner `SearchBlockViewComponent`
// directly (bypassing the fetching HOCs) and inject the results into the store
// via the Wrapper's `customStore`. The `facetsTopSide` variation supplies the
// facets/search chrome (VLT's TopSideFacets).
const searchVariation = config.blocks.blocksConfig.search.variations.find(
  (v) => v.id === 'facetsTopSide',
);

const searchProps = {
  id: BLOCK_ID,
  path: '/',
  mode: 'view' as const,
  variation: searchVariation,
  searchData: { query: [] },
  facets: {},
  setFacets: () => {},
  setSortOn: () => {},
  setSortOrder: () => {},
  sortOn: 'effective',
  sortOrder: 'descending',
  searchedText: '',
  searchText: '',
  setSearchText: () => {},
  removeSearchQuery: () => {},
  onTriggerSearch: () => {},
  querystring: {},
  totalItems: searchResultItems.length,
};

const makeStore = (items) => ({
  querystringsearch: {
    subrequests: {
      [BLOCK_ID]: {
        items,
        total: items.length,
        batching: {},
        loaded: true,
        loading: false,
        error: null,
      },
    },
  },
});

const render = (args) => (
  <Wrapper customStore={makeStore(searchResultItems)}>
    <BlockWrapper block={BLOCK_ID} {...args}>
      <SearchBlockViewComponent {...searchProps} {...args} />
    </BlockWrapper>
  </Wrapper>
);

export const Default: Story = {
  render,
  args: {
    data: {
      '@type': 'search',
      query: {},
      facets: [],
      showSearchInput: true,
    },
  },
};

export const WithHeadline: Story = {
  render,
  args: {
    data: {
      '@type': 'search',
      query: {},
      facets: [],
      showSearchInput: true,
      headline: 'Search the site',
    },
  },
};
