import React from 'react';
import config from '@plone/volto/registry';
import View from '@plonegovbr/volto-social-media/components/Blocks/FollowUs/View';
import { followUsBlock, socialNetworks } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

// The block reads the available networks from `config.settings.socialNetworks`
// (its fallback when there is no backend data), so we seed it for the story.
config.settings.socialNetworks = socialNetworks;

const meta = {
  title: 'Blocks/Follow Us',
  component: View,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof View>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <View {...args} />
    </BlockWrapper>
  </Wrapper>
);

export const Default: Story = {
  render,
  args: {
    data: followUsBlock,
  },
};

export const WithoutTitle: Story = {
  render,
  args: {
    data: {
      ...followUsBlock,
      title: '',
    },
  },
};

export const Animated: Story = {
  render,
  args: {
    data: {
      ...followUsBlock,
      animate: true,
    },
  },
};

export const Centered: Story = {
  render,
  args: {
    data: {
      ...followUsBlock,
      styles: { 'align:noprefix': 'center' },
    },
  },
};
