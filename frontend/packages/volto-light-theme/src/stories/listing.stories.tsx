import React from 'react';
import config from '@plone/volto/registry';
import { ListingBody } from '../components/Blocks/Listing/ListingBody';
import SummaryTemplate from '../components/Blocks/Listing/SummaryTemplate';
import { listingBlockPerson } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const listingVariation = (id: string) =>
  config.blocks.blocksConfig.listing.variations.find((v) => v.id === id);

const meta = {
  title: 'Blocks/Listing',
  component: ListingBody,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ListingBody>;

export default meta;
type Story = StoryObj<typeof meta>;

// `person-squared-images` is a content-area modifier (it only sets CSS
// variables), reproduced on `#page-document` via BlockWrapper's `pageClassName`.
const makeRender =
  (className: string, opts: { pageClassName?: string } = {}) =>
  (args) => (
    <BlockWrapper {...args} {...opts}>
      <div className={className}>
        <ListingBody {...args} />
      </div>
    </BlockWrapper>
  );

const decorators = [
  (Story) => (
    <Wrapper>
      <Story />
    </Wrapper>
  ),
];

const summaryVariation = {
  id: 'summary',
  template: SummaryTemplate,
  title: 'List with images',
};

const bigDescription =
  'USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations. USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations. USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations. USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations.';

export const Person: Story = {
  render: makeRender('block listing'),
  args: {
    data: listingBlockPerson,
    listingItems: listingBlockPerson.items,
    variation: listingVariation('default'),
  },
  decorators,
};

export const PersonGrid: Story = {
  render: makeRender('block listing'),
  args: {
    data: listingBlockPerson,
    listingItems: listingBlockPerson.items,
    variation: listingVariation('grid'),
  },
  decorators,
};

export const PersonSummary: Story = {
  render: makeRender('block listing summary'),
  args: {
    data: {
      ...listingBlockPerson,
    },
    listingItems: listingBlockPerson.items,
    variation: summaryVariation,
  },
  decorators,
};

export const PersonSummaryWithBigDescription: Story = {
  render: makeRender('block listing summary'),
  args: {
    data: {
      ...listingBlockPerson,
      items: [
        {
          ...listingBlockPerson.items[0],
          description: bigDescription,
        },
      ],
    },
    listingItems: listingBlockPerson.items,
    variation: summaryVariation,
  },
  decorators,
};

export const PersonSummarySquared: Story = {
  render: makeRender('block listing summary', {
    pageClassName: 'person-squared-images',
  }),
  args: {
    data: {
      ...listingBlockPerson,
    },
    listingItems: listingBlockPerson.items,
    variation: summaryVariation,
  },
  decorators,
};

export const PersonSummarySquaredWithBigDescription: Story = {
  render: makeRender('block listing summary', {
    pageClassName: 'person-squared-images',
  }),
  args: {
    data: {
      ...listingBlockPerson,
      items: [
        {
          ...listingBlockPerson.items[0],
          description: bigDescription,
        },
      ],
    },
    listingItems: listingBlockPerson.items,
    variation: summaryVariation,
  },
  decorators,
};
