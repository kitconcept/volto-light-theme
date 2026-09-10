import React from 'react';
import BannerView from '@kitconcept/volto-banner-block/components/View';
import { bannerBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Banner',
  component: BannerView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BannerView>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <BannerView {...args} />
    </BlockWrapper>
  </Wrapper>
);

// Width comes from `styles.blockWidth:noprefix` (layout / full); the two text
// lines are `text` and `additionalText`.
export const Layout: Story = {
  render,
  args: {
    data: bannerBlock,
  },
};

export const FullWidth: Story = {
  render,
  args: {
    data: {
      ...bannerBlock,
      styles: { 'blockWidth:noprefix': 'full' },
    },
  },
};

export const SingleLine: Story = {
  render,
  args: {
    data: {
      ...bannerBlock,
      additionalText: '',
    },
  },
};

export const GreyBackground: Story = {
  render,
  args: {
    data: {
      ...bannerBlock,
      theme: 'grey',
    },
  },
};
