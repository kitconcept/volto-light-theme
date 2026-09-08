import React from 'react';
import VideoView from '@plone/volto/components/manage/Blocks/Video/View';
import { videoBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Video',
  component: VideoView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VideoView>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <VideoView {...args} />
    </BlockWrapper>
  </Wrapper>
);

// The video shows the provider poster + play button; `align` positions it
// (left / right / center / full).
export const Center: Story = {
  render,
  args: {
    data: videoBlock,
  },
};

export const AlignLeft: Story = {
  render,
  args: {
    data: {
      ...videoBlock,
      align: 'left',
    },
  },
};

export const FullWidth: Story = {
  render,
  args: {
    data: {
      ...videoBlock,
      align: 'full',
    },
  },
};

export const GreyBackground: Story = {
  render,
  args: {
    data: {
      ...videoBlock,
      theme: 'grey',
    },
  },
};
