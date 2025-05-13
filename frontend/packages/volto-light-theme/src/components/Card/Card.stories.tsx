import React from 'react';
import Card from './Card';

import type { Meta, StoryObj } from '@storybook/react';
import { ObjectBrowserItem } from '../../stories/mocks';
import Wrapper from '@plone/volto/storybook';
import { Button } from '@plone/components';
import DefaultSummary from '../Summary/DefaultSummary';

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

const item = {
  title: 'Card Title',
  description:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
  head_title: 'Card Kicker',
};
const imageSRC = 'black-starry-night.jpg';

export const Simple: Story = {
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Wrapper>
        <Card href={args.href}>
          <Card.Image src={imageSRC} />
          <Card.Summary>
            <DefaultSummary item={item} HeadingTag="h2" titleId="card-title" />
          </Card.Summary>
        </Card>
      </Wrapper>
    </div>
  ),
  args: {
    href: '/folder/page',
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
        <Card href={args.href}>
          <Card.Image src={imageSRC} />
          <Card.Summary>
            <DefaultSummary item={item} HeadingTag="h2" titleId="card-title" />
          </Card.Summary>
        </Card>
      </div>
    </Wrapper>
  ),
  args: {
    href: '/folder/page',
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
        <Card href={args.href}>
          <Card.Image src={imageSRC} />
          <Card.Summary>
            <DefaultSummary item={item} HeadingTag="h2" titleId="card-title" />
          </Card.Summary>
        </Card>
      </div>
    </Wrapper>
  ),
  args: {
    href: '/folder/page',
    enableLink: true,
  },
};

export const SimpleContained: Story = {
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Wrapper>
        <div
          className="contained"
          style={{ ['--theme-high-contrast-color' as string]: '#ecebeb' }}
        >
          <Card href={args.href}>
            <Card.Image src={imageSRC} />
            <Card.Summary>
              <DefaultSummary
                item={item}
                HeadingTag="h2"
                titleId="card-title"
              />
            </Card.Summary>
          </Card>
        </div>
      </Wrapper>
    </div>
  ),
  args: {
    href: '/folder/page',
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
        <Card href={args.href}>
          <Card.Image src={imageSRC} />
          <Card.Summary>
            <DefaultSummary item={item} HeadingTag="h2" titleId="card-title" />
          </Card.Summary>
        </Card>
      </div>
    </Wrapper>
  ),
  args: {
    href: '/folder/page',
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
        <Card href={args.href} a11yLinkId="card-title">
          <Card.Image>
            <div className="date-inset">
              <div className="day">10</div>
              <div className="month">May 2025</div>
            </div>
          </Card.Image>
          <Card.Summary>
            <DefaultSummary item={item} HeadingTag="h2" titleId="card-title" />
          </Card.Summary>
        </Card>
      </div>
    </Wrapper>
  ),
  args: {
    href: '/folder/page',
    enableLink: true,
  },
};

export const CustomActionInset: Story = {
  render: (args) => (
    <Wrapper>
      <div style={{ width: 'var(--default-container-width)' }}>
        <Card href={args.href}>
          <Card.Image src={imageSRC} />
          <Card.Summary>
            <DefaultSummary item={item} HeadingTag="h2" titleId="card-title" />
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
    </Wrapper>
  ),
  args: {
    href: '/folder/page',
    enableLink: true,
  },
};

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Wrapper>
        <Card href={args.href}>
          <Card.Image src={imageSRC} />
          <Card.Summary>
            <DefaultSummary
              item={ObjectBrowserItem}
              HeadingTag="h2"
              titleId="card-title"
            />
          </Card.Summary>
        </Card>
      </Wrapper>
    </div>
  ),
  args: {
    href: ObjectBrowserItem['@id'],
    // image: ObjectBrowserItem.image_scales[ObjectBrowserItem.image_field][0],
    enableLink: true,
  },
};
