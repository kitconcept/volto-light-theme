import React from 'react';
import CarouselView from '@kitconcept/volto-carousel-block/components/View';
import { carouselBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Carousel',
  component: CarouselView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CarouselView>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <CarouselView {...args} />
    </BlockWrapper>
  </Wrapper>
);

// The number of cards shown across comes from `items_to_show` (the `.one`..`.four`
// wrapper class is min(columns, items_to_show)); arrows and dots appear only when
// there are more columns than are shown.
export const FourColumns: Story = {
  render,
  args: {
    data: {
      ...carouselBlock,
      items_to_show: 4,
      columns: carouselBlock.columns.slice(0, 4),
    },
  },
};

export const FourColumnsWithNavigation: Story = {
  render,
  args: {
    data: {
      ...carouselBlock,
      items_to_show: 4,
      columns: carouselBlock.columns,
    },
  },
};

export const TwoColumns: Story = {
  render,
  args: {
    data: {
      ...carouselBlock,
      items_to_show: 2,
      columns: carouselBlock.columns.slice(0, 4),
    },
  },
};

export const WithHeadline: Story = {
  render,
  args: {
    data: {
      ...carouselBlock,
      items_to_show: 4,
      headline: 'Featured content',
    },
  },
};

export const HiddenDescription: Story = {
  render,
  args: {
    data: {
      ...carouselBlock,
      items_to_show: 4,
      hide_description: true,
    },
  },
};

export const GreyBackground: Story = {
  render,
  args: {
    data: {
      ...carouselBlock,
      items_to_show: 4,
      theme: 'grey',
    },
  },
};
