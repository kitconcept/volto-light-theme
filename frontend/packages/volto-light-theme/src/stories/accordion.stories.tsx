import React from 'react';
import AccordionView from '@eeacms/volto-accordion-block/components/manage/Blocks/Accordion/View';
import { accordionBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Accordion',
  component: AccordionView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AccordionView>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <AccordionView {...args} />
    </BlockWrapper>
  </Wrapper>
);

// The accordion is a container block: `data.data` holds the panels, each a
// blocks form with a `title` and nested blocks rendered via RenderBlocks.
export const Default: Story = {
  render,
  args: {
    data: accordionBlock,
  },
};

export const Collapsed: Story = {
  render,
  args: {
    data: {
      ...accordionBlock,
      collapsed: true,
    },
  },
};

export const WithHeadline: Story = {
  render,
  args: {
    data: {
      ...accordionBlock,
      headline: 'Frequently asked questions',
    },
  },
};

export const RightArrows: Story = {
  render,
  args: {
    data: {
      ...accordionBlock,
      right_arrows: true,
    },
  },
};

export const GreyBackground: Story = {
  render,
  args: {
    data: {
      ...accordionBlock,
      theme: 'grey',
    },
  },
};
