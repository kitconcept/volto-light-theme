import React from 'react';
import Card from './Card';

import type { Meta, StoryObj } from '@storybook/react';
import { ObjectBrowserItem } from '../../stories/mocks';
import Wrapper from '@plone/volto/storybook';
import { Button } from '@plone/components';

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
    imageSRC: 'black-starry-night.jpg',
    item: {
      title: 'Simple Card with strings',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
      head_title: 'Simple Card',
    },
    enableLink: true,
  },
};

export const AlignedLeft: Story = {
  render: (args) => (
    <Wrapper>
      <div
        className="has--align--left"
        style={{ width: 'var(--default-container-width)' }}
      >
        <Card {...args} />
      </div>
    </Wrapper>
  ),
  args: {
    target: '/folder/page',
    imageSRC: 'black-starry-night.jpg',
    item: {
      title: 'Simple Card with strings',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
      head_title: 'Simple Card',
    },
    enableLink: true,
  },
};

export const AlignedRight: Story = {
  render: (args) => (
    <Wrapper>
      <div
        className="has--align--right"
        style={{ width: 'var(--default-container-width)' }}
      >
        <Card {...args} />
      </div>
    </Wrapper>
  ),
  args: {
    target: '/folder/page',
    imageSRC: 'black-starry-night.jpg',
    item: {
      title: 'Simple Card with strings',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
      head_title: 'Simple Card',
    },
    enableLink: true,
  },
};

export const SimpleContained: Story = {
  render: (args) => (
    <div>
      <Wrapper>
        <div
          className="contained"
          style={{
            ['--theme-high-contrast-color' as string]: '#ecebeb',
            width: 'calc(var(--default-container-width) * .5)',
          }}
        >
          <Card {...args} />
        </div>
      </Wrapper>
    </div>
  ),
  args: {
    target: '/folder/page',
    imageSRC: 'black-starry-night.jpg',
    item: {
      title: 'Simple Card with strings',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
      head_title: 'Simple Card',
    },
    enableLink: true,
  },
};

export const SimpleListing: Story = {
  render: (args) => (
    <Wrapper>
      <div
        className="card-listing"
        style={{ width: 'var(--default-container-width)' }}
      >
        <Card {...args} />
      </div>
    </Wrapper>
  ),
  args: {
    target: '/folder/page',
    imageSRC: 'black-starry-night.jpg',
    item: {
      title: 'Simple Card with strings',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
      head_title: 'Simple Card',
    },
    enableLink: true,
  },
};

export const CustomImageInset: Story = {
  render: (args) => (
    <Wrapper>
      <div
        className="card-listing"
        style={{ width: 'var(--default-container-width)' }}
      >
        <Card {...args} />
      </div>
    </Wrapper>
  ),
  args: {
    target: '/folder/page',
    imageSRC: 'black-starry-night.jpg',
    imageInset: (
      <div className="date-inset">
        <div className="day">10</div>
        <div className="month">May 2025</div>
      </div>
    ),
    item: {
      title: 'Simple Card with strings',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
      head_title: 'Simple Card',
    },
    enableLink: true,
  },
};

export const CustomActionInset: Story = {
  render: (args) => (
    <Wrapper>
      <div
        style={{
          width: 'var(--default-container-width)',
          ['--theme-high-contrast-color' as string]: '#ecebeb',
          ['--theme-foreground-color' as string]: '#000',
          ['--theme-color' as string]: '#fff',
        }}
      >
        <Card {...args} />
      </div>
    </Wrapper>
  ),
  args: {
    target: '/folder/page',
    imageSRC: 'black-starry-night.jpg',
    actionsInset: (
      <a
        className="button"
        href="https://www.plone.org"
        rel="noreferrer"
        target="_blank"
      >
        Read More
      </a>
    ),
    item: {
      title: 'Card with a button (actionable inset)',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
      head_title: 'This is the kicker',
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
