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
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GridBlockView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const One: Story = {
  render: (args) => (
    <Wrapper>
      <div
        style={{
          containerType: 'inline-size',
          width: 'var(--default-container-width)',
        }}
      >
        <BlockWrapper {...args}>
          <GridBlockView {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: gridBlockOne,
  },
};

export const Two: Story = {
  render: (args) => (
    <Wrapper>
      <div
        style={{
          containerType: 'inline-size',
          width: 'var(--default-container-width)',
        }}
      >
        <BlockWrapper {...args}>
          <GridBlockView {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: gridBlockTwo,
  },
};

export const Three: Story = {
  render: (args) => (
    <Wrapper>
      <div
        style={{
          containerType: 'inline-size',
          width: 'var(--default-container-width)',
        }}
      >
        <BlockWrapper {...args}>
          <GridBlockView {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: gridBlockThree,
  },
};

export const Four: Story = {
  render: (args) => (
    <Wrapper>
      <div
        style={{
          containerType: 'inline-size',
          width: 'var(--default-container-width)',
        }}
      >
        <BlockWrapper {...args}>
          <GridBlockView {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: gridBlockFour,
  },
};

export const OneInversed: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <Wrapper>
      <div
        style={{
          containerType: 'inline-size',
          padding: '40px',
          backgroundColor: '#ecebeb',
        }}
      >
        <BlockWrapper {...args}>
          <GridBlockView {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: { ...gridBlockOne, theme: 'grey' },
  },
};

export const TwoInversed: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <Wrapper>
      <div
        style={{
          containerType: 'inline-size',
          padding: '40px',
          backgroundColor: '#ecebeb',
        }}
      >
        <BlockWrapper {...args}>
          <GridBlockView {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: { ...gridBlockTwo, theme: 'grey' },
  },
};

export const ThreeInversed: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <Wrapper>
      <div
        style={{
          containerType: 'inline-size',
          padding: '40px',
          backgroundColor: '#ecebeb',
        }}
      >
        <BlockWrapper {...args}>
          <GridBlockView {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: { ...gridBlockThree, theme: 'grey' },
  },
};

export const FourInversed: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <Wrapper>
      <div
        style={{
          containerType: 'inline-size',
          padding: '40px',
          backgroundColor: '#ecebeb',
        }}
      >
        <BlockWrapper {...args}>
          <GridBlockView {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: { ...gridBlockFour, theme: 'grey' },
  },
};

export const OnePerson: Story = {
  render: (args) => (
    <Wrapper>
      <div
        style={{
          containerType: 'inline-size',
          width: 'var(--default-container-width)',
        }}
      >
        <BlockWrapper {...args}>
          <GridBlockView {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: gridBlockOnePerson,
  },
};

export const TwoPerson: Story = {
  render: (args) => (
    <Wrapper>
      <div
        style={{
          containerType: 'inline-size',
          width: 'var(--default-container-width)',
        }}
      >
        <BlockWrapper {...args}>
          <GridBlockView {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: gridBlockTwoPerson,
  },
};

export const TwoDocumentAndPerson: Story = {
  render: (args) => (
    <Wrapper>
      <div
        style={{
          containerType: 'inline-size',
          width: 'var(--default-container-width)',
        }}
      >
        <BlockWrapper {...args}>
          <GridBlockView {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: gridBlockTwoDocumentPerson,
  },
};

export const TwoPersonsDifferentImageRatio: Story = {
  render: (args) => (
    <Wrapper>
      <div
        style={{
          containerType: 'inline-size',
          width: 'var(--default-container-width)',
        }}
      >
        <BlockWrapper {...args}>
          <GridBlockView {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: gridBlockTwoPersonDifferentRatio,
  },
};

export const ThreePerson: Story = {
  render: (args) => (
    <Wrapper>
      <div
        style={{
          containerType: 'inline-size',
          width: 'var(--default-container-width)',
        }}
      >
        <BlockWrapper {...args}>
          <GridBlockView {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: gridBlockThreePerson,
  },
};

export const FourPerson: Story = {
  render: (args) => (
    <Wrapper>
      <div
        style={{
          containerType: 'inline-size',
          width: 'var(--default-container-width)',
        }}
      >
        <BlockWrapper {...args}>
          <GridBlockView {...args} />
        </BlockWrapper>
      </div>
    </Wrapper>
  ),
  args: {
    data: gridBlockFourPerson,
  },
};
