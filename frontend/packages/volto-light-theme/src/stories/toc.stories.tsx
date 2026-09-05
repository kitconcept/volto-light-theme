import React from 'react';
import config from '@plone/volto/registry';
import TocView from '@plone/volto/components/manage/Blocks/ToC/View';
import { tocBlock, tocContent } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Table of Contents',
  component: TocView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TocView>;

export default meta;
type Story = StoryObj<typeof meta>;

// The ToC scans `properties` (the page content) for blocks that expose a
// `tocEntry` (headings here) and renders them via the default variation.
const defaultVariation = config.blocks.blocksConfig.toc.variations[0];

const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <TocView
        {...args}
        properties={tocContent}
        variation={defaultVariation}
      />
    </BlockWrapper>
  </Wrapper>
);

export const Default: Story = {
  render,
  args: {
    data: tocBlock,
  },
};

export const GreyBackground: Story = {
  render,
  args: {
    data: {
      ...tocBlock,
      theme: 'grey',
    },
  },
};
