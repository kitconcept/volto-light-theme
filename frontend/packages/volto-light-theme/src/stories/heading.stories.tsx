import React from 'react';
import HeadingView from '@kitconcept/volto-heading-block/components/View';
import { headingBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Heading',
  component: HeadingView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeadingView>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <HeadingView {...args} />
    </BlockWrapper>
  </Wrapper>
);

// In VLT the heading is restricted to `h2` (allowed_headings) with no alignment
// control, so the meaningful variants are the heading itself and the theme.
export const Default: Story = {
  render,
  args: {
    data: headingBlock,
  },
};

export const GreyBackground: Story = {
  render,
  args: {
    data: {
      ...headingBlock,
      theme: 'grey',
    },
  },
};
