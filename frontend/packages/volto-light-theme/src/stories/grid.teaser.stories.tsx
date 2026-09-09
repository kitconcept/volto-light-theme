import React from 'react';
import GridBlockView from '@plone/volto/components/manage/Blocks/Grid/View';
import {
  gridBlockOne,
  gridBlockTwo,
  gridBlockThree,
  gridBlockFour,
  gridBlockTwoDocumentPerson,
  gridBlockTwoPersonDifferentRatio,
  gridBlockOnePerson,
  gridBlockTwoPerson,
  gridBlockThreePerson,
  gridBlockFourPerson,
} from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Grid Teaser',
  component: GridBlockView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GridBlockView>;

export default meta;
type Story = StoryObj<typeof meta>;

// `person-squared-images` is a content-area modifier (it only sets CSS
// variables), reproduced on `#page-document` via BlockWrapper's `pageClassName`.
const makeRender =
  (opts: { pageClassName?: string } = {}) =>
  (args) => (
    <Wrapper>
      <BlockWrapper {...args} {...opts}>
        <GridBlockView {...args} />
      </BlockWrapper>
    </Wrapper>
  );

const render = makeRender();
const renderSquared = makeRender({ pageClassName: 'person-squared-images' });

export const One: Story = {
  render,
  args: { data: gridBlockOne },
};

export const Two: Story = {
  render,
  args: { data: gridBlockTwo },
};

export const Three: Story = {
  render,
  args: { data: gridBlockThree },
};

export const Four: Story = {
  render,
  args: { data: gridBlockFour },
};

// Inversed = grey background band, painted by the real `.blocks-group-wrapper`
// (via `data.theme: 'grey'`).
export const OneInversed: Story = {
  render,
  args: { data: { ...gridBlockOne, theme: 'grey' } },
};

export const TwoInversed: Story = {
  render,
  args: { data: { ...gridBlockTwo, theme: 'grey' } },
};

export const ThreeInversed: Story = {
  render,
  args: { data: { ...gridBlockThree, theme: 'grey' } },
};

export const FourInversed: Story = {
  render,
  args: { data: { ...gridBlockFour, theme: 'grey' } },
};

export const OnePerson: Story = {
  render,
  args: { data: gridBlockOnePerson },
};

export const TwoPerson: Story = {
  render,
  args: { data: gridBlockTwoPerson },
};

export const TwoDocumentAndPerson: Story = {
  render,
  args: { data: gridBlockTwoDocumentPerson },
};

export const TwoPersonsDifferentImageRatio: Story = {
  render,
  args: { data: gridBlockTwoPersonDifferentRatio },
};

export const ThreePerson: Story = {
  render,
  args: { data: gridBlockThreePerson },
};

export const FourPerson: Story = {
  render,
  args: { data: gridBlockFourPerson },
};

export const OnePersonSquared: Story = {
  render: renderSquared,
  args: { data: gridBlockOnePerson },
};

export const TwoPersonSquared: Story = {
  render: renderSquared,
  args: { data: gridBlockTwoPerson },
};

export const TwoDocumentAndPersonSquared: Story = {
  render: renderSquared,
  args: { data: gridBlockTwoDocumentPerson },
};

export const TwoPersonsDifferentImageRatioSquared: Story = {
  render: renderSquared,
  args: { data: gridBlockTwoPersonDifferentRatio },
};

export const ThreePersonSquared: Story = {
  render: renderSquared,
  args: { data: gridBlockThreePerson },
};

export const FourPersonSquared: Story = {
  render: renderSquared,
  args: { data: gridBlockFourPerson },
};
