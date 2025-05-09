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

export const Left: Story = {
  render: (args) => (
    <Wrapper>
      <div className="page-layout">
        <BlockWrapper {...args}>
          <TeaserDefaultBody {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: teaserBlock,
  },
};

export const Right: Story = {
  render: (args) => (
    <Wrapper>
      <div style={{ width: 'var(--default-container-width)' }}>
        <BlockWrapper {...args}>
          <TeaserDefaultBody {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: {
      ...teaserBlock,
      styles: {
        align: 'right',
      },
    },
  },
};

export const Center: Story = {
  render: (args) => (
    <Wrapper>
      <div style={{ width: 'var(--default-container-width)' }}>
        <BlockWrapper {...args}>
          <TeaserDefaultBody {...args} />
        </BlockWrapper>
      </div>
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
