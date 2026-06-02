import { describe, it, expect, beforeAll } from 'vitest';
import config from '@plone/volto/registry';
import { migrateToVLT8FloatingBlocks } from './to8';

const alignLeft = { 'align:noprefix': 'left' };
const alignRight = { 'align:noprefix': 'right' };
const alignCenter = { 'align:noprefix': 'center' };
const narrowWidth = { 'blockWidth:noprefix': 'narrow' };
const defaultWidth = { 'blockWidth:noprefix': 'default' };
const fullWidth = { 'blockWidth:noprefix': 'full' };

// Wraps a single block in the `data` shape the transform expects and runs it.
const migrate = (block) => {
  const data = { blocks: { 'block-1': block } };
  migrateToVLT8FloatingBlocks(data);
  return data.blocks['block-1'];
};

beforeAll(() => {
  config.blocks.widths = [
    {
      name: 'narrow',
      style: { '--block-width': 'var(--narrow-container-width)' },
    },
    {
      name: 'default',
      style: { '--block-width': 'var(--default-container-width)' },
    },
    {
      name: 'layout',
      style: { '--block-width': 'var(--layout-container-width)' },
    },
    { name: 'full', style: { '--block-width': '100%' } },
  ];
  config.blocks.alignments = [
    { name: 'left', style: { '--block-alignment': 'var(--align-left)' } },
    { name: 'center', style: { '--block-alignment': 'var(--align-center)' } },
    { name: 'right', style: { '--block-alignment': 'var(--align-right)' } },
  ];
});

describe('migrateToVLT8FloatingBlocks', () => {
  it('centers a non-floating image and applies the narrow width', () => {
    expect(migrate({ '@type': 'image', align: 'center' })).toEqual({
      '@type': 'image',
      styles: { ...alignCenter, ...narrowWidth },
    });
  });

  it('applies the default width to a wide image', () => {
    expect(migrate({ '@type': 'image', align: 'wide' })).toEqual({
      '@type': 'image',
      styles: { ...alignCenter, ...defaultWidth },
    });
  });

  it('applies the full width to a full image', () => {
    expect(migrate({ '@type': 'image', align: 'full' })).toEqual({
      '@type': 'image',
      styles: { ...alignCenter, ...fullWidth },
    });
  });

  it('applies the narrow width to a small floating image', () => {
    expect(migrate({ '@type': 'image', align: 'left', size: 'm' })).toEqual({
      '@type': 'image',
      size: 'm',
      styles: { ...alignLeft, ...narrowWidth },
    });
  });

  it('applies the default width to a floating image that is large by size', () => {
    expect(migrate({ '@type': 'image', align: 'right', size: 'l' })).toEqual({
      '@type': 'image',
      size: 'l',
      styles: { ...alignRight, ...defaultWidth },
    });
  });

  it('applies the default width to a floating image that is large by style', () => {
    expect(
      migrate({
        '@type': 'image',
        align: 'left',
        styles: { 'size:noprefix': 'var(--size-large)' },
      }),
    ).toEqual({
      '@type': 'image',
      styles: {
        'size:noprefix': 'var(--size-large)',
        ...alignLeft,
        ...defaultWidth,
      },
    });
  });

  it('applies the default width to a floating video', () => {
    expect(migrate({ '@type': 'video', align: 'left' })).toEqual({
      '@type': 'video',
      styles: { ...alignLeft, ...defaultWidth },
    });
  });

  it('applies the narrow width to a non-floating video', () => {
    expect(migrate({ '@type': 'video', align: 'center' })).toEqual({
      '@type': 'video',
      styles: { ...alignCenter, ...narrowWidth },
    });
  });

  it('applies the default width to a floating map', () => {
    expect(migrate({ '@type': 'maps', align: 'right' })).toEqual({
      '@type': 'maps',
      styles: { ...alignRight, ...defaultWidth },
    });
  });

  it('applies the full width to a full map', () => {
    expect(migrate({ '@type': 'maps', align: 'full' })).toEqual({
      '@type': 'maps',
      styles: { ...alignCenter, ...fullWidth },
    });
  });

  it('migrates the button inneralign to the align literal', () => {
    expect(migrate({ '@type': '__button', inneralign: 'right' })).toEqual({
      '@type': '__button',
      styles: { ...alignRight },
    });
  });

  it('keeps an existing button alignment over the legacy inneralign', () => {
    expect(
      migrate({
        '@type': '__button',
        inneralign: 'right',
        styles: { ...alignLeft },
      }),
    ).toEqual({
      '@type': '__button',
      styles: { ...alignLeft },
    });
  });

  it('drops the button inneralign property when it has no value', () => {
    expect(migrate({ '@type': '__button', inneralign: '' })).toEqual({
      '@type': '__button',
    });
  });

  it('leaves an already migrated block untouched', () => {
    // No legacy `align`, alignment and width already stored as literals.
    expect(
      migrate({ '@type': 'image', styles: { ...alignLeft, ...defaultWidth } }),
    ).toEqual({
      '@type': 'image',
      styles: { ...alignLeft, ...defaultWidth },
    });
  });

  it('keeps a pre-existing width for a non-floating block', () => {
    expect(
      migrate({ '@type': 'image', align: 'center', styles: { ...fullWidth } }),
    ).toEqual({
      '@type': 'image',
      styles: { ...fullWidth, ...alignCenter },
    });
  });

  it('ignores blocks of other types', () => {
    expect(migrate({ '@type': 'slate', align: 'left' })).toEqual({
      '@type': 'slate',
      align: 'left',
    });
  });

  it('migrates nested blocks recursively', () => {
    const data = {
      blocks: {
        'block-1': {
          '@type': 'image',
          align: 'left',
          blocks: {
            'block-2': { '@type': 'video', align: 'right' },
          },
        },
      },
    };

    migrateToVLT8FloatingBlocks(data);

    expect(data.blocks['block-1']).toMatchObject({
      '@type': 'image',
      styles: { ...alignLeft, ...narrowWidth },
    });
    expect(data.blocks['block-1'].blocks['block-2']).toEqual({
      '@type': 'video',
      styles: { ...alignRight, ...defaultWidth },
    });
  });
});
