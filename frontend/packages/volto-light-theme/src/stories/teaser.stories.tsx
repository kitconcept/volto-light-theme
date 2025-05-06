import React from 'react';
import TeaserDefaultBody from '@plone/volto/components/manage/Blocks/Teaser/DefaultBody';
import { teaserBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Teaser',
  component: TeaserDefaultBody,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TeaserDefaultBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Wrapper>
      <TeaserDefaultBody {...args} />
    </Wrapper>
  ),
  args: {
    data: teaserBlock,
  },
};

export const Center: Story = {
  render: (args) => (
    <Wrapper>
      <BlockWrapper {...args}>
        <TeaserDefaultBody {...args} />
      </BlockWrapper>
    </Wrapper>
  ),
  args: {
    data: {
      ...teaserBlock,
      styles: {
        align: 'center',
      },
    },
  },
};
