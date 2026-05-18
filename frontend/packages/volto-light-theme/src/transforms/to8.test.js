import { describe, it, expect } from 'vitest';
import { migrateToVLT8FloatingBlocks } from './to8';

const alignLeft = {
  'align:noprefix': { '--block-alignment': 'var(--align-left)' },
};
const alignRight = {
  'align:noprefix': { '--block-alignment': 'var(--align-right)' },
};
const alignCenter = {
  'align:noprefix': { '--block-alignment': 'var(--align-center)' },
};
const narrowWidth = {
  'blockWidth:noprefix': { '--block-width': 'var(--narrow-container-width)' },
};
const defaultWidth = {
  'blockWidth:noprefix': { '--block-width': 'var(--default-container-width)' },
};
const fullWidth = {
  'blockWidth:noprefix': { '--block-width': '100%' },
};

// Wraps a single block in the `data` shape the transform expects and runs it.
const migrate = (block) => {
  const data = { blocks: { 'block-1': block } };
  migrateToVLT8FloatingBlocks(data);
  return data.blocks['block-1'];
};

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

  it('leaves an already migrated block untouched', () => {
    // No legacy `align`, alignment and width already live in `styles`.
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
