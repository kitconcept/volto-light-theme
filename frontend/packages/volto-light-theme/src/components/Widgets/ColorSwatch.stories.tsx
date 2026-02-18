import React from 'react';
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

const palettesWithoutDefault: StyleDefinition[] = [
  {
    name: 'primary',
    label: 'Primary',
    style: {
      '--theme-color': '#333333',
      '--theme-foreground-color': '#f2f2f2',
      '--theme-low-contrast-foreground-color': '#d9d9d9',
    },
  },
  {
    name: 'secondary',
    label: 'Secondary',
    style: {
      '--theme-color': '#666666',
      '--theme-foreground-color': '#ffffff',
      '--theme-low-contrast-foreground-color': '#f0f0f0',
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

const resolveSelectedColorName = (
  args: ColorSwatchProps,
  value: string | undefined,
) => {
  const colors = args.themes || args.colors || [];
  const selectedColorName = colors.find(({ name }) => name === value)?.name;
  const defaultSelectedColorName =
    !selectedColorName && typeof args.default === 'string'
      ? colors.find(({ name }) => name === args.default)?.name
      : undefined;

  if (selectedColorName || defaultSelectedColorName) {
    return selectedColorName ?? defaultSelectedColorName;
  }

  return colors.find(({ name }) => name === 'default')?.name ?? colors[0]?.name;
};

const InteractiveColorSwatch = (args: ColorSwatchProps) => {
  const [value, setValue] = React.useState(args.value);
  const selectedValue = resolveSelectedColorName(args, value);

  return (
    <>
      <ColorSwatch
        {...args}
        value={value}
        onChange={(id, selectedValue) => {
          setValue(selectedValue);
          args.onChange?.(id, selectedValue);
        }}
      />
      <div style={{ marginTop: '10px' }}>
        The selected value is: <strong>{selectedValue || 'none'}</strong>
      </div>
    </>
  );
};

export const NoPalettes: Story = {
  render: (args) => <InteractiveColorSwatch {...args} />,
  args: {
    id: 'color',
    label: 'Theme',
    title: 'Theme',
    themes: [],
  },
};

export const DefaultPalette: Story = {
  render: (args) => <InteractiveColorSwatch {...args} />,
  args: {
    id: 'color',
    label: 'Color palette',
    title: 'Color palette',
    value: 'default',
    colors: palettes,
  },
};

export const ThemePalette: Story = {
  render: (args) => <InteractiveColorSwatch {...args} />,
  args: {
    id: 'theme',
    label: 'Theme palette',
    title: 'Theme palette',
    value: 'ocean',
    themes: themePalettes,
  },
};

export const ColorPaletteWithDefault: Story = {
  render: (args) => <InteractiveColorSwatch {...args} />,
  args: {
    id: 'color',
    label: 'Color palette',
    title: 'Color palette',
    colors: palettes,
    default: 'warm',
  },
};

export const ColorPaletteNoValueNoDefault: Story = {
  render: (args) => <InteractiveColorSwatch {...args} />,
  args: {
    id: 'color',
    label: 'Color palette',
    title: 'Color palette',
    colors: palettes,
  },
};

export const ColorPaletteNoValueNoDefaultWithFallbackToFirst: Story = {
  render: (args) => <InteractiveColorSwatch {...args} />,
  args: {
    id: 'color',
    label: 'Color palette',
    title: 'Color palette',
    colors: palettesWithoutDefault,
  },
};
