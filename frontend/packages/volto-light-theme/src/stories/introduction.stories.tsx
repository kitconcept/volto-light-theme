import React from 'react';
import IntroductionView from '@kitconcept/volto-introduction-block/components/Blocks/Introduction/View';
import { introductionBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Introduction',
  component: IntroductionView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IntroductionView>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <IntroductionView {...args} />
    </BlockWrapper>
  </Wrapper>
);

export const Default: Story = {
  render,
  args: {
    data: introductionBlock,
  },
};

export const Grey: Story = {
  render,
  args: {
    data: {
      ...introductionBlock,
      theme: 'grey',
    },
  },
};
