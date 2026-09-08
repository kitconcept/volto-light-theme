import React from 'react';
import ButtonView from '@kitconcept/volto-button-block/components/View';
import { buttonBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Button',
  component: ButtonView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonView>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <ButtonView {...args} />
    </BlockWrapper>
  </Wrapper>
);

// Alignment and width come from `styles` (`align:noprefix` / `blockWidth:noprefix`),
// added by ButtonStylingSchema on top of the theme.
const withStyles = (styles: Record<string, string>) => ({
  ...buttonBlock,
  styles: { ...buttonBlock.styles, ...styles },
});

export const Left: Story = {
  render,
  args: {
    data: withStyles({ 'align:noprefix': 'left' }),
  },
};

export const Center: Story = {
  render,
  args: {
    data: withStyles({ 'align:noprefix': 'center' }),
  },
};

export const Right: Story = {
  render,
  args: {
    data: withStyles({ 'align:noprefix': 'right' }),
  },
};

export const Narrow: Story = {
  render,
  args: {
    data: withStyles({
      'align:noprefix': 'center',
      'blockWidth:noprefix': 'narrow',
    }),
  },
};

export const WithoutLink: Story = {
  render,
  args: {
    data: {
      ...buttonBlock,
      href: [],
    },
  },
};

export const GreyBackground: Story = {
  render,
  args: {
    data: {
      ...buttonBlock,
      styles: { ...buttonBlock.styles, 'align:noprefix': 'center' },
      theme: 'grey',
    },
  },
};
