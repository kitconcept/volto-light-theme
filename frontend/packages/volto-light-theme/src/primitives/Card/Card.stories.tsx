import React from 'react';
import Card from './Card';

import type { Meta, StoryObj } from '@storybook/react';
import { ObjectBrowserItem } from '../../stories/mocks';
import Wrapper from '@plone/volto/storybook';
import { Button } from '@plone/components';
import DefaultSummary from '../../components/Summary/DefaultSummary';

const meta = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    // backgrounds: { disable: true },
  },
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const item = {
  title: 'Card Title',
  description:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
  head_title: 'Card Kicker',
};
const imageSRC = 'black-starry-night.jpg';
const imageSRC2 = 'image-light.jpg';

export const Simple: Story = {
  render: (args) => (
    <Card href={args.href}>
      <Card.Image src={imageSRC} />
      <Card.Summary>
        <DefaultSummary item={item} HeadingTag="h2" />
      </Card.Summary>
    </Card>
  ),
  args: {
    href: '/folder/page',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const SimpleWithoutLink: Story = {
  render: (args) => (
    <Card>
      <Card.Image src={imageSRC} />
      <Card.Summary>
        <DefaultSummary item={item} HeadingTag="h2" />
      </Card.Summary>
    </Card>
  ),
  args: {
    href: '/folder/page',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const AlignedLeft: Story = {
  render: (args) => (
    <div
      className="has--align--left"
      style={{ width: 'var(--default-container-width)' }}
    >
      <Card href={args.href}>
        <Card.Image src={imageSRC} />
        <Card.Summary>
          <DefaultSummary item={item} HeadingTag="h2" />
        </Card.Summary>
      </Card>
    </div>
  ),
  args: {
    href: '/folder/page',
  },
};

export const AlignedRight: Story = {
  render: (args) => (
    <div
      className="has--align--right"
      style={{ width: 'var(--default-container-width)' }}
    >
      <Card href={args.href}>
        <Card.Image src={imageSRC} />
        <Card.Summary>
          <DefaultSummary item={item} HeadingTag="h2" />
        </Card.Summary>
      </Card>
    </div>
  ),
  args: {
    href: '/folder/page',
  },
};

export const SimpleContained: Story = {
  render: (args) => (
    <div
      className="contained"
      style={{ ['--theme-high-contrast-color' as string]: '#ecebeb' }}
    >
      <Card href={args.href}>
        <Card.Image src={imageSRC} />
        <Card.Summary>
          <DefaultSummary item={item} HeadingTag="h2" />
        </Card.Summary>
      </Card>
    </div>
  ),
  args: {
    href: '/folder/page',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const SimpleListing: Story = {
  render: (args) => (
    <div
      className="card-listing"
      style={{ width: 'var(--default-container-width)' }}
    >
      <Card href={args.href}>
        <Card.Image src={imageSRC} />
        <Card.Summary>
          <DefaultSummary item={item} HeadingTag="h2" />
        </Card.Summary>
      </Card>
    </div>
  ),
  args: {
    href: '/folder/page',
  },
};

export const CustomImage: Story = {
  render: (args) => (
    <div
      className="card-listing"
      style={{ width: 'var(--default-container-width)' }}
    >
      <Card href={args.href}>
        <Card.Image>
          <div className="date-inset">
            <div className="day">10</div>
            <div className="month">May 2025</div>
          </div>
        </Card.Image>
        <Card.Summary>
          <DefaultSummary item={item} HeadingTag="h2" />
        </Card.Summary>
      </Card>
    </div>
  ),
  args: {
    href: '/folder/page',
  },
};

export const CustomAction: Story = {
  render: (args) => (
    <div style={{ width: 'var(--default-container-width)' }}>
      <Card href={args.href}>
        <Card.Image src={imageSRC} />
        <Card.Summary>
          <DefaultSummary item={item} HeadingTag="h2" />
        </Card.Summary>
        <Card.Actions>
          <div style={{ marginTop: '20px' }}>
            <a href="https://www.plone.org" rel="noreferrer" target="_blank">
              <Button>Read More</Button>
            </a>
          </div>
        </Card.Actions>
      </Card>
    </div>
  ),
  args: {
    href: '/folder/page',
  },
};

export const WithItem: Story = {
  render: (args) => (
    <Card href={args.href}>
      <Card.Image src={imageSRC} />
      <Card.Summary>
        <DefaultSummary item={ObjectBrowserItem(imageSRC)} HeadingTag="h2" />
      </Card.Summary>
    </Card>
  ),
  args: {
    href: ObjectBrowserItem(imageSRC)['@id'],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithCustomImage: Story = {
  render: (args) => (
    <Card href={args.href}>
      <Card.Image image={ObjectBrowserItem(imageSRC2)} />
      <Card.Summary>
        <DefaultSummary item={ObjectBrowserItem(imageSRC)} HeadingTag="h2" />
      </Card.Summary>
    </Card>
  ),
  args: {
    href: ObjectBrowserItem(imageSRC)['@id'],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};
