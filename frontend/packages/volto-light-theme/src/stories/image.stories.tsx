import React from 'react';
import { ImageView } from '../components/Blocks/Image/View';
import { imageBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Image',
  component: ImageView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ImageView>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <ImageView {...args} />
    </BlockWrapper>
  </Wrapper>
);

// Size and alignment come from `styles` (`size:noprefix` = l/m/s, `align:noprefix`).
const withStyles = (styles: Record<string, string>) => ({
  ...imageBlock,
  styles: { ...imageBlock.styles, ...styles },
});

export const Large: Story = {
  render,
  args: {
    data: withStyles({ 'size:noprefix': 'l', 'align:noprefix': 'center' }),
  },
};

export const Medium: Story = {
  render,
  args: {
    data: withStyles({ 'size:noprefix': 'm', 'align:noprefix': 'center' }),
  },
};

export const Small: Story = {
  render,
  args: {
    data: withStyles({ 'size:noprefix': 's', 'align:noprefix': 'center' }),
  },
};

export const AlignLeft: Story = {
  render,
  args: {
    data: withStyles({ 'size:noprefix': 'm', 'align:noprefix': 'left' }),
  },
};

export const AlignRight: Story = {
  render,
  args: {
    data: withStyles({ 'size:noprefix': 'm', 'align:noprefix': 'right' }),
  },
};

export const WithCaption: Story = {
  render,
  args: {
    data: {
      ...withStyles({ 'size:noprefix': 'l', 'align:noprefix': 'center' }),
      title: 'The night sky',
      description: 'A long exposure of the stars over the mountains.',
      copyright_and_sources: 'Photo: Public domain',
    },
  },
};

export const GreyBackground: Story = {
  render,
  args: {
    data: {
      ...withStyles({ 'size:noprefix': 'l', 'align:noprefix': 'center' }),
      theme: 'grey',
    },
  },
};
