import React from 'react';
import SliderView from '@kitconcept/volto-slider-block/components/View';
import { sliderBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Slider',
  component: SliderView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SliderView>;

export default meta;
type Story = StoryObj<typeof meta>;

// The slider is full-bleed: the faithful page structure constrains it to
// `--layout-container-width` (via `#page-document .blocks-group-wrapper > *`),
// and the always-present group wrapper provides the `--theme-*` variables the
// slider dots need (SliderView drops the incoming `style` prop, so the theme
// cannot reach it any other way).
const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <SliderView {...args} />
    </BlockWrapper>
  </Wrapper>
);

export const Default: Story = {
  render,
  args: {
    data: sliderBlock,
  },
};

export const Simple: Story = {
  render,
  args: {
    data: {
      ...sliderBlock,
      variation: 'simple',
    },
  },
};

export const SingleSlide: Story = {
  render,
  args: {
    data: {
      ...sliderBlock,
      slides: [sliderBlock.slides[0]],
    },
  },
};

// The grey theme is only painted by the `simple` variation (the default
// full-bleed variation covers the block with its images). BlockWrapper renders
// the real `.blocks-group-wrapper` when a `theme` is present on the data, so the
// background comes from `config.blocks.themes` exactly as in production.
export const SimpleGrey: Story = {
  render,
  args: {
    data: {
      ...sliderBlock,
      variation: 'simple',
      theme: 'grey',
    },
  },
};

export const HiddenButton: Story = {
  render,
  args: {
    data: {
      ...sliderBlock,
      slides: sliderBlock.slides.map((slide) => ({
        ...slide,
        hideButton: true,
      })),
    },
  },
};
