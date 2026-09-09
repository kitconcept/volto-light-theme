import React from 'react';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import { slateBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Text (Slate)',
  component: TextBlockView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextBlockView>;

export default meta;
type Story = StoryObj<typeof meta>;

// The slate text block renders rich text from `data.value` (headings,
// paragraphs with marks, lists, links). Marks are inline element nodes
// (`{ type: 'strong', children: [...] }`), not leaf props.
const render = (args) => (
  <Wrapper>
    <BlockWrapper {...args}>
      <div className="block slate">
        <TextBlockView {...args} />
      </div>
    </BlockWrapper>
  </Wrapper>
);

export const Default: Story = {
  render,
  args: {
    data: slateBlock,
  },
};

export const GreyBackground: Story = {
  render,
  args: {
    data: {
      ...slateBlock,
      theme: 'grey',
    },
  },
};
