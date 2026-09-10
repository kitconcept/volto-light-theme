import React from 'react';
import TeaserBody from '@plone/volto/components/manage/Blocks/Teaser/Body';
import { teaserBlock, personBlock } from './mocks';
import Wrapper from '@plone/volto/storybook';
import BlockWrapper from './BlockWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Blocks/Teaser',
  component: TeaserBody,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TeaserBody>;

export default meta;
type Story = StoryObj<typeof meta>;

// `person-squared-images` is a content-area modifier (it only sets CSS
// variables); the narrow width demonstrates the person card in a half column.
const makeRender =
  (opts: { pageClassName?: string; width?: string } = {}) =>
  (args) => (
    <Wrapper>
      <BlockWrapper {...args} {...opts}>
        <TeaserBody {...args} />
      </BlockWrapper>
    </Wrapper>
  );

const render = makeRender();
const renderNarrow = makeRender({
  width: 'calc(var(--default-container-width) / 2)',
});
const renderSquared = makeRender({ pageClassName: 'person-squared-images' });
const renderSquaredNarrow = makeRender({
  pageClassName: 'person-squared-images',
  width: 'calc(var(--default-container-width) / 2)',
});

export const Left: Story = {
  render,
  args: {
    data: teaserBlock,
  },
};

export const Right: Story = {
  render,
  args: {
    data: {
      ...teaserBlock,
      styles: {
        align: 'right',
      },
    },
  },
};

export const Top: Story = {
  render,
  args: {
    data: {
      ...teaserBlock,
      styles: {
        align: 'center',
      },
    },
  },
};

// The teaser's schemaEnhancer includes the theme, so it supports a grey band.
export const Grey: Story = {
  render,
  args: {
    data: {
      ...teaserBlock,
      theme: 'grey',
    },
  },
};

export const PersonTeaserLeft: Story = {
  render,
  args: {
    data: personBlock,
  },
};

export const PersonTeaserTop: Story = {
  render: renderNarrow,
  args: {
    data: {
      ...personBlock,
      styles: {
        align: 'center',
      },
    },
  },
};

export const PersonTeaserRight: Story = {
  render,
  args: {
    data: {
      ...personBlock,
      styles: {
        align: 'right',
      },
    },
  },
};

export const PersonTeaserLeftSquared: Story = {
  render: renderSquared,
  args: {
    data: personBlock,
  },
};

export const PersonTeaserTopSquared: Story = {
  render: renderSquaredNarrow,
  args: {
    data: {
      ...personBlock,
      styles: {
        align: 'center',
      },
    },
  },
};

export const PersonTeaserRightSquared: Story = {
  render: renderSquared,
  args: {
    data: {
      ...personBlock,
      styles: {
        align: 'right',
      },
    },
  },
};
