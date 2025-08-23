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

export const Person: Story = {
  render: (args) => (
    <BlockWrapper {...args}>
      <div className="block listing">
        <ListingBody {...args} />
      </div>
    </BlockWrapper>
  ),
  args: {
    data: listingBlockPerson,
    listingItems: listingBlockPerson.items,
  },
  decorators: [
    (Story) => (
      <Wrapper>
        <div style={{ width: 'var(--default-container-width)' }}>
          <Story />
        </div>
      </Wrapper>
    ),
  ],
};

export const PersonSummary: Story = {
  render: (args) => (
    <BlockWrapper {...args}>
      <div className="block listing summary">
        <ListingBody {...args} />
      </div>
    </BlockWrapper>
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
  decorators: [
    (Story) => (
      <Wrapper>
        <div style={{ width: 'var(--default-container-width)' }}>
          <Story />
        </div>
      </Wrapper>
    ),
  ],
};

export const PersonSummaryWithBigDescription: Story = {
  render: (args) => (
    <BlockWrapper {...args}>
      <div className="block listing summary">
        <ListingBody {...args} />
      </div>
    </BlockWrapper>
  ),
  args: {
    data: {
      ...listingBlockPerson,
      items: [
        {
          ...listingBlockPerson.items[0],
          description:
            'USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations. USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations. USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations. USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations.',
        },
      ],
    },
    listingItems: listingBlockPerson.items,
    variation: {
      id: 'summary',
      template: SummaryTemplate,
      title: 'List with images',
    },
  },
  decorators: [
    (Story) => (
      <Wrapper>
        <div style={{ width: 'var(--default-container-width)' }}>
          <Story />
        </div>
      </Wrapper>
    ),
  ],
};

export const PersonSummarySquared: Story = {
  render: (args) => (
    <BlockWrapper {...args}>
      <div className="block listing summary">
        <ListingBody {...args} />
      </div>
    </BlockWrapper>
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
  decorators: [
    (Story) => (
      <Wrapper>
        <div
          className="person-squared-images"
          style={{ width: 'var(--default-container-width)' }}
        >
          <Story />
        </div>
      </Wrapper>
    ),
  ],
};

export const PersonSummarySquaredWithBigDescription: Story = {
  render: (args) => (
    <BlockWrapper {...args}>
      <div className="block listing summary">
        <ListingBody {...args} />
      </div>
    </BlockWrapper>
  ),
  args: {
    data: {
      ...listingBlockPerson,
      items: [
        {
          ...listingBlockPerson.items[0],
          description:
            'USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations. USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations. USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations. USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations.',
        },
      ],
    },
    listingItems: listingBlockPerson.items,
    variation: {
      id: 'summary',
      template: SummaryTemplate,
      title: 'List with images',
    },
  },
  decorators: [
    (Story) => (
      <Wrapper>
        <div
          className="person-squared-images"
          style={{ width: 'var(--default-container-width)' }}
        >
          <Story />
        </div>
      </Wrapper>
    ),
  ],
};
