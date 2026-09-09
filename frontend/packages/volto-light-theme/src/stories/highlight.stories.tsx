import React from 'react';
import config from '@plone/volto/registry';
import HighlightView from '@kitconcept/volto-highlight-block/components/Blocks/Highlight/View';
import { highlightBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Highlight',
  component: HighlightView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HighlightView>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <HighlightView blocksConfig={config.blocks.blocksConfig} {...args} />
    </BlockWrapper>
  </Wrapper>
);

// The description panel color comes from `styles.descriptionColor`, one of the
// block's registered `descriptionColors` (each sets `--descriptionColor` and
// `--descriptionColor-foreground`).
const withColor = (name: string) => ({
  ...highlightBlock,
  styles: { descriptionColor: name },
});

export const Grey: Story = {
  render,
  args: {
    data: withColor('highlight-custom-color-1'),
  },
};

export const Teal: Story = {
  render,
  args: {
    data: withColor('highlight-custom-color-2'),
  },
};

export const Indigo: Story = {
  render,
  args: {
    data: withColor('highlight-custom-color-4'),
  },
};

export const Yellow: Story = {
  render,
  args: {
    data: withColor('highlight-custom-color-6'),
  },
};

export const Black: Story = {
  render,
  args: {
    data: withColor('highlight-custom-color-7'),
  },
};

export const WithoutButton: Story = {
  render,
  args: {
    data: {
      ...highlightBlock,
      button: false,
    },
  },
};

export const GreyBackground: Story = {
  render,
  args: {
    data: {
      ...highlightBlock,
      theme: 'grey',
    },
  },
};
