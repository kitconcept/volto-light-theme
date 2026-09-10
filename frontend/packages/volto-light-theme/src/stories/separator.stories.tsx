import React from 'react';
import SeparatorView from '@kitconcept/volto-separator-block/components/View';
import { separatorBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Separator',
  component: SeparatorView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SeparatorView>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <SeparatorView {...args} />
    </BlockWrapper>
  </Wrapper>
);

export const Default: Story = {
  render,
  args: {
    data: separatorBlock,
  },
};

export const ShortLine: Story = {
  render,
  args: {
    data: {
      ...separatorBlock,
      styles: {
        shortLine: true,
        'align:noprefix': 'left',
      },
    },
  },
};

export const ShortLineCenter: Story = {
  render,
  args: {
    data: {
      ...separatorBlock,
      styles: {
        shortLine: true,
        'align:noprefix': 'center',
      },
    },
  },
};

export const ShortLineRight: Story = {
  render,
  args: {
    data: {
      ...separatorBlock,
      styles: {
        shortLine: true,
        'align:noprefix': 'right',
      },
    },
  },
};

export const Narrow: Story = {
  render,
  args: {
    data: {
      ...separatorBlock,
      styles: {
        'blockWidth:noprefix': 'narrow',
      },
    },
  },
};

export const Grey: Story = {
  render,
  args: {
    data: {
      ...separatorBlock,
      theme: 'grey',
    },
  },
};
