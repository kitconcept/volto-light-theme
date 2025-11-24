import React from 'react';
import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';
import Wrapper from '@plone/volto/storybook';
import type { StyleDefinition } from '@plone/types';

import ColorSwatch, { type ColorSwatchProps } from './ColorSwatch';

const palettes: StyleDefinition[] = [
  {
    name: 'default',
    label: 'Default',
    style: {
      '--theme-color': '#ffffff',
      '--theme-foreground-color': '#1b1c1d',
      '--theme-low-contrast-foreground-color': '#585858',
    },
  },
  {
    name: 'warm',
    label: 'Warm',
    style: {
      '--theme-color': '#fff5ed',
      '--theme-foreground-color': '#6b2c1f',
      '--theme-low-contrast-foreground-color': '#b06a54',
    },
  },
  {
    name: 'unstyled',
    label: 'No Inline Style',
    style: undefined,
  },
];

const themePalettes: StyleDefinition[] = [
  {
    name: 'ocean',
    label: 'Ocean',
    style: {
      '--theme-color': '#dff5ff',
      '--theme-foreground-color': '#003d5b',
      '--theme-low-contrast-foreground-color': '#5c6b73',
    },
  },
  {
    name: 'forest',
    label: 'Forest',
    style: {
      '--theme-color': '#e6f4ea',
      '--theme-foreground-color': '#1e4d2b',
      '--theme-low-contrast-foreground-color': '#4b7754',
    },
  },
];

const meta = {
  title: 'Widgets/ColorSwatch',
  component: ColorSwatch,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Wrapper>
        <div style={{ width: 320 }}>
          <Story />
        </div>
      </Wrapper>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveColorSwatch = (args: ColorSwatchProps) => {
  const [value, setValue] = React.useState(args.value || args.default);

  return (
    <>
      <ColorSwatch
        {...args}
        onChange={(id, selectedValue) => {
          setValue(selectedValue);
          args.onChange?.(id, selectedValue);
        }}
      />
      <div style={{ marginTop: '10px' }}>
        The selected value is: <strong>{value}</strong>
      </div>
    </>
  );
};

export const DefaultPalette: Story = {
  render: (args) => <InteractiveColorSwatch {...args} />,
  args: {
    id: 'color',
    title: 'Color palette',
    value: 'default',
    colors: palettes,
    onChange: fn(),
  },
};

export const ThemePalette: Story = {
  render: (args) => <InteractiveColorSwatch {...args} />,
  args: {
    id: 'theme',
    title: 'Theme palette',
    value: 'ocean',
    themes: themePalettes,
    onChange: fn(),
  },
};

export const ColorPaletteWithDefault: Story = {
  render: (args) => <InteractiveColorSwatch {...args} />,
  args: {
    id: 'color',
    title: 'Color palette',
    colors: palettes,
    default: 'warm',
    onChange: fn(),
  },
};

export const ColorPaletteNoValueNoDefault: Story = {
  render: (args) => <InteractiveColorSwatch {...args} />,
  args: {
    id: 'color',
    title: 'Color palette',
    colors: palettes,
    onChange: fn(),
  },
};

export const ColorPaletteNoValueNoDefaultWithFallbackToFirst: Story = {
  render: (args) => <InteractiveColorSwatch {...args} />,
  args: {
    id: 'color',
    title: 'Color palette',
    themes: themePalettes,
    onChange: fn(),
  },
};
