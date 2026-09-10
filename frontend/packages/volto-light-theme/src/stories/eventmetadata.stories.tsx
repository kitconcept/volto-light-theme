import React from 'react';
import EventMetadataView from '../components/Blocks/EventMetadata/View';
import { eventMetadataContent } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Event Metadata',
  component: EventMetadataView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EventMetadataView>;

export default meta;
type Story = StoryObj<typeof meta>;

// EventMetadata is a fixed block on Event content types; it reads the event
// fields from `properties` (start/end/location/contact/website + ICS download).
const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <EventMetadataView {...args} />
    </BlockWrapper>
  </Wrapper>
);

export const Default: Story = {
  render,
  args: {
    data: { '@type': 'eventMetadata' },
    properties: eventMetadataContent,
  },
};

export const WholeDay: Story = {
  render,
  args: {
    data: { '@type': 'eventMetadata' },
    properties: {
      ...eventMetadataContent,
      whole_day: true,
      open_end: false,
    },
  },
};

export const OpenEnd: Story = {
  render,
  args: {
    data: { '@type': 'eventMetadata' },
    properties: {
      ...eventMetadataContent,
      open_end: true,
    },
  },
};
