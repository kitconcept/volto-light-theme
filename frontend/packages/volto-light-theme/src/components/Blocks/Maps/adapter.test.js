import { describe, it, expect, vi } from 'vitest';
import { MapsBlockDataAdapter } from './adapter';

const alignRight = { 'align:noprefix': 'right' };
const alignCenter = { 'align:noprefix': 'center' };

describe('MapsBlockDataAdapter', () => {
  it('applies the default width for a floating map', () => {
    const onChangeBlock = vi.fn();

    MapsBlockDataAdapter({
      block: 'block-1',
      data: { '@type': 'maps', styles: { ...alignRight } },
      id: 'url',
      onChangeBlock,
      value: 'https://maps.example.com',
    });

    expect(onChangeBlock).toHaveBeenCalledWith('block-1', {
      '@type': 'maps',
      url: 'https://maps.example.com',
      styles: {
        ...alignRight,
        'blockWidth:noprefix': 'default',
      },
    });
  });

  it('leaves the styles untouched for a non-floating map', () => {
    const onChangeBlock = vi.fn();

    MapsBlockDataAdapter({
      block: 'block-1',
      data: { '@type': 'maps', styles: { ...alignCenter } },
      id: 'url',
      onChangeBlock,
      value: 'https://maps.example.com',
    });

    expect(onChangeBlock).toHaveBeenCalledWith('block-1', {
      '@type': 'maps',
      url: 'https://maps.example.com',
      styles: { ...alignCenter },
    });
  });

  it('leaves the styles untouched when no alignment is set', () => {
    const onChangeBlock = vi.fn();

    MapsBlockDataAdapter({
      block: 'block-1',
      data: { '@type': 'maps' },
      id: 'url',
      onChangeBlock,
      value: 'https://maps.example.com',
    });

    expect(onChangeBlock).toHaveBeenCalledWith('block-1', {
      '@type': 'maps',
      url: 'https://maps.example.com',
    });
  });
});
