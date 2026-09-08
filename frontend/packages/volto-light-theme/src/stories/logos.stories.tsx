import React from 'react';
import LogosView from '@kitconcept/volto-logos-block/components/View';
import { logosBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Logos',
  component: LogosView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LogosView>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <LogosView {...args} />
    </BlockWrapper>
  </Wrapper>
);

export const Small: Story = {
  render,
  args: {
    data: logosBlock,
  },
};

export const Large: Story = {
  render,
  args: {
    data: {
      ...logosBlock,
      logos_size: 'l',
    },
  },
};

// `logos_container_width: 'layout'` widens the block's own inner container to
// `--layout-container-width`; with the faithful page structure the difference
// from the default container shows on its own, no special framing needed.
export const LayoutWidth: Story = {
  render,
  args: {
    data: {
      ...logosBlock,
      logos_container_width: 'layout',
    },
  },
};
