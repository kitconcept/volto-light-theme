import React from 'react';
import DefaultSummary from './DefaultSummary';
import { default as NewsItemSummaryComponent } from './NewsItemSummary';
import { default as EventSummaryComponent } from './EventSummary';
import { default as FileSummaryComponent } from './FileSummary';

import type { Meta, StoryObj } from '@storybook/react';
import Wrapper from '@plone/volto/storybook';

const meta = {
  title: 'Primitives/Summary',
  component: DefaultSummary,
  parameters: {
    layout: 'centered',
    // backgrounds: { disable: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DefaultSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Summary: Story = {
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Wrapper>
        <DefaultSummary {...args} />
      </Wrapper>
    </div>
  ),
  args: {
    item: {
      title: 'Simple Card with strings',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
      head_title: 'Simple Card',
    },
  },
};

export const SummaryHideDescription: Story = {
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Wrapper>
        <DefaultSummary {...args} />
      </Wrapper>
    </div>
  ),
  args: {
    item: {
      title: 'Simple Card with strings',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
      head_title: 'Simple Card',
    },
    hide_description: true,
  },
};

export const NewsItemSummary: Story = {
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Wrapper>
        <NewsItemSummaryComponent {...args} />
      </Wrapper>
    </div>
  ),
  args: {
    item: {
      title: 'Simple Card with strings',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
      head_title: 'Simple Card',
      start: '2023-01-01T11:00:00+00:00',
      end: '2023-12-31T12:00:00+00:00',
      effective: '2023-07-06T18:35:00+00:00',
    },
  },
};

export const EventSummary: Story = {
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Wrapper>
        <EventSummaryComponent {...args} />
      </Wrapper>
    </div>
  ),
  args: {
    item: {
      title: 'Simple Card with strings',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
      head_title: 'Simple Card',
      start: '2023-01-01T11:00:00+00:00',
      end: '2023-12-31T12:00:00+00:00',
      effective: '2023-07-06T18:35:00+00:00',
    },
  },
};

export const FileSummary: Story = {
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Wrapper>
        <FileSummaryComponent {...args} />
      </Wrapper>
    </div>
  ),
  args: {
    item: {
      title: 'Simple Card with strings',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
      head_title: 'Simple Card',
      start: '2023-01-01T11:00:00+00:00',
      end: '2023-12-31T12:00:00+00:00',
      effective: '2023-07-06T18:35:00+00:00',
    },
  },
};
