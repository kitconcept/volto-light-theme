import React, { createContext, useContext } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ColorSwatch from './ColorSwatch';
import type { StyleDefinition } from '@plone/types';

vi.mock('@plone/volto/components/manage/Widgets/FormFieldWrapper', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="form-field-wrapper">{children}</div>
  ),
}));

const MockRadioGroupContext = createContext<
  ((value: string) => void) | undefined
>(undefined);

vi.mock('@plone/components', () => ({
  RadioGroup: ({
    children,
    onChange,
    ...rest
  }: {
    children: React.ReactNode;
    onChange?: (value: string) => void;
  }) => {
    const { isDisabled: _isDisabled, ...passThrough } = rest as Record<
      string,
      unknown
    >;

    return (
      <MockRadioGroupContext.Provider value={onChange}>
        <div role="radiogroup" {...passThrough}>
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child, {
                  onSelect: onChange,
                })
              : child,
          )}
        </div>
      </MockRadioGroupContext.Provider>
    );
  },
  Radio: ({
    value,
    onSelect,
    className,
    children,
    ...rest
  }: {
    value: string;
    onSelect?: (value: string) => void;
    className?: string;
    children?: React.ReactNode;
  }) => {
    const groupOnChange = useContext(MockRadioGroupContext);
    return (
      <button
        type="button"
        className={className}
        data-value={value}
        onClick={() => {
          groupOnChange?.(value);
          onSelect?.(value);
        }}
        {...rest}
      >
        {children}
      </button>
    );
  },
  Tooltip: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="tooltip">{children}</span>
  ),
}));

vi.mock('react-aria-components', () => ({
  Focusable: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  TooltipTrigger: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const palette: StyleDefinition[] = [
  {
    name: 'default',
    label: 'Default',
    style: { '--theme-color': '#fff' },
  },
  {
    name: 'ocean',
    label: 'Ocean',
    style: { '--theme-color': '#00a0e6' },
  },
  {
    name: 'sunset',
    label: 'Sunset',
    style: { '--theme-color': '#ff6b00' },
  },
];

const renderColorSwatch = (
  props: Partial<React.ComponentProps<typeof ColorSwatch>> = {},
) => {
  const { colors = palette, themes, onChange = vi.fn(), ...rest } = props;

  const componentProps: React.ComponentProps<typeof ColorSwatch> = {
    id: 'theme',
    label: 'Theme',
    title: 'Theme',
    colors,
    onChange,
    ...rest,
  } as React.ComponentProps<typeof ColorSwatch>;

  if (themes !== undefined) {
    componentProps.themes = themes;
  }

  return render(<ColorSwatch {...componentProps} />);
};

const getActiveClassName = (container: HTMLElement | Document) =>
  container.querySelector('.color-swatch-option-handler.active')?.className ??
  '';

describe('ColorSwatch', () => {
  it('renders nothing when no palettes are provided', () => {
    const { container } = renderColorSwatch({ themes: [] });
    expect(container.firstChild).toBeNull();
  });

  it('highlights the provided value', () => {
    const { container } = renderColorSwatch({ value: 'ocean' });
    expect(getActiveClassName(container)).toContain('ocean');
  });

  it('highlights the default value when no current value exists', () => {
    const { container } = renderColorSwatch({
      value: undefined,
      default: 'sunset',
    });
    expect(getActiveClassName(container)).toContain('sunset');
  });

  it('falls back to the "default" palette name when no value or default is provided', () => {
    const { container } = renderColorSwatch({
      value: undefined,
      default: undefined,
    });
    expect(getActiveClassName(container)).toContain('default');
  });

  it('falls back to the first color when no "default" palette is present', () => {
    const colorsWithoutDefault: StyleDefinition[] = [
      {
        name: 'primary',
        label: 'Primary',
        style: { '--theme-color': '#333' },
      },
      {
        name: 'secondary',
        label: 'Secondary',
        style: { '--theme-color': '#666' },
      },
    ];

    const { container } = renderColorSwatch({
      colors: colorsWithoutDefault,
      value: undefined,
      default: undefined,
    });

    expect(getActiveClassName(container)).toContain('primary');
  });

  it('notifies when a different swatch is chosen', () => {
    const handleChange = vi.fn();
    const { container } = renderColorSwatch({ onChange: handleChange });
    const buttons = container.querySelectorAll('.color-swatch-option-wrapper');

    fireEvent.click(buttons[2]);

    expect(handleChange).toHaveBeenCalledWith('theme', 'sunset');
  });
});
