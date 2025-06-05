import React from 'react';
import { ListingBody } from '../components/Blocks/Listing/ListingBody';
import SummaryTemplate from '../components/Blocks/Listing/SummaryTemplate';
import { listingBlockPerson } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Listing',
  component: ListingBody,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ListingBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PersonListing: Story = {
  render: (args) => (
    <Wrapper>
      <div style={{ width: 'var(--default-container-width)' }}>
        <BlockWrapper {...args}>
          <div className="block listing">
            <ListingBody {...args} />
          </div>
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: listingBlockPerson,
    listingItems: listingBlockPerson.items,
  },
};

export const PersonListingSummary: Story = {
  render: (args) => (
    <Wrapper>
      <div style={{ width: 'var(--default-container-width)' }}>
        <BlockWrapper {...args}>
          <div className="block listing summary">
            <ListingBody {...args} />
          </div>
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: {
      ...listingBlockPerson,
    },
    listingItems: listingBlockPerson.items,
    variation: {
      id: 'summary',
      template: SummaryTemplate,
      title: 'List with images',
    },
  },
};
