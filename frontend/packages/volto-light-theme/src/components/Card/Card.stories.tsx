import React from 'react';
import Card from './Card';

import type { Meta, StoryObj } from '@storybook/react';
import { ObjectBrowserItem } from '../../stories/mocks';
import Wrapper from '@plone/volto/storybook';

const meta = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    // backgrounds: { disable: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Wrapper>
        <Card {...args} />
      </Wrapper>
    </div>
  ),
  args: {
    target: '/folder/page',
    imageSRC: '/black-starry-night.jpg',
    item: {
      title: 'Simple Card with strings',
      description: 'This is a simple card with strings',
      head_title: 'Simple Card',
    },
    enableLink: true,
  },
};

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Wrapper>
        <Card {...args} />
      </Wrapper>
    </div>
  ),
  args: {
    target: ObjectBrowserItem['@id'],
    item: ObjectBrowserItem,
    // image: ObjectBrowserItem.image_scales[ObjectBrowserItem.image_field][0],
    enableLink: true,
  },
};
