import React from 'react';
import TeaserBody from '@plone/volto/components/manage/Blocks/Teaser/Body';
import { teaserBlock, personBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Teaser',
  component: TeaserBody,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TeaserBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {
  render: (args) => (
    <Wrapper>
      <div style={{ width: 'var(--default-container-width)' }}>
        <BlockWrapper {...args}>
          <TeaserBody {...args} />
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
          <TeaserBody {...args} />
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
          <TeaserBody {...args} />
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

export const PersonTeaser: Story = {
  render: (args) => (
    <Wrapper>
      <div style={{ width: 'var(--default-container-width)' }}>
        <BlockWrapper {...args}>
          <TeaserBody {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: personBlock,
  },
};
