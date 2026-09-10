import React from 'react';
import { SearchBlockViewComponent } from '../components/Blocks/EventCalendar/Search/SearchBlockView';
import { eventCalendarItems } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Event Calendar',
  component: SearchBlockViewComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBlockViewComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const BLOCK_ID = 'eventCalendar-1';

// The eventCalendar is a search block: in production `withSearch`/`withQueryString`
// fetch events and feed them through redux `querystringsearch`. For the story we
// render the inner `SearchBlockViewComponent` directly (bypassing the fetching
// HOCs) and inject the results into the store via the Wrapper's `customStore`, so
// the calendar renders real event cards without hitting a backend. The search
// props are the no-op equivalents of what `withSearch` would provide.
const searchProps = {
  id: BLOCK_ID,
  path: '/',
  mode: 'view' as const,
  searchData: { query: [] },
  facets: {},
  setFacets: () => {},
  setSortOn: () => {},
  setSortOrder: () => {},
  sortOn: 'start',
  sortOrder: 'ascending',
  searchedText: '',
  searchText: '',
  setSearchText: () => {},
  removeSearchQuery: () => {},
  onTriggerSearch: () => {},
  handleDateRangeChange: () => {},
  querystring: {},
  totalItems: eventCalendarItems.length,
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

// BlockWrapper's StyleWrapper clones its `block` id onto the child, so we set it
// to BLOCK_ID to match the redux subrequest key the listing reads from.
const render = (args) => (
  <Wrapper customStore={makeStore(eventCalendarItems)}>
    <BlockWrapper block={BLOCK_ID} {...args}>
      <SearchBlockViewComponent {...searchProps} {...args} />
    </BlockWrapper>
  </Wrapper>
);

export const Default: Story = {
  render,
  args: {
    data: { '@type': 'eventCalendar', query: [], facets: [] },
  },
};

export const WithHeadline: Story = {
  render,
  args: {
    data: {
      '@type': 'eventCalendar',
      query: [],
      facets: [],
      headline: 'Upcoming events',
    },
  },
};
