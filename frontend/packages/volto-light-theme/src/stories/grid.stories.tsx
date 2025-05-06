import React from 'react';
import GridBlockView from '@plone/volto/components/manage/Blocks/Grid/View';
import { gridBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Grid',
  component: GridBlockView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GridBlockView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Wrapper>
      <GridBlockView {...args} />
    </Wrapper>
  ),
  args: {
    data: gridBlock,
  },
};
