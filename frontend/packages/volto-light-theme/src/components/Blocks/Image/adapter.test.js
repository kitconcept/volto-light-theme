import { describe, it, expect, vi } from 'vitest';
import { ImageBlockDataAdapter } from './adapter';

const alignLeft = { 'align:noprefix': 'left' };
const alignRight = { 'align:noprefix': 'right' };

describe('ImageBlockDataAdapter', () => {
  it('forces a large size for non-floating images', () => {
    const onChangeBlock = vi.fn();

    ImageBlockDataAdapter({
      block: 'block-1',
      data: { '@type': 'image' },
      id: 'align',
      onChangeBlock,
      value: 'center',
    });

    expect(onChangeBlock).toHaveBeenCalledWith('block-1', {
      '@type': 'image',
      align: 'center',
      styles: { 'size:noprefix': 'l' },
    });
  });

  it('keeps the current size and applies a narrow width for a floating, non-large image', () => {
    const onChangeBlock = vi.fn();

    ImageBlockDataAdapter({
      block: 'block-1',
      data: {
        '@type': 'image',
        styles: { ...alignLeft, 'size:noprefix': 'm' },
      },
      id: 'align',
      onChangeBlock,
      value: 'left',
    });

    expect(onChangeBlock).toHaveBeenCalledWith('block-1', {
      '@type': 'image',
      align: 'left',
      styles: {
        ...alignLeft,
        'size:noprefix': 'm',
        'blockWidth:noprefix': 'narrow',
      },
    });
  });

  it('applies the default width for a floating image that is large by size', () => {
    const onChangeBlock = vi.fn();

    ImageBlockDataAdapter({
      block: 'block-1',
      data: {
        '@type': 'image',
        styles: { ...alignRight, 'size:noprefix': 'l' },
      },
      id: 'align',
      onChangeBlock,
      value: 'right',
    });

    expect(onChangeBlock).toHaveBeenCalledWith('block-1', {
      '@type': 'image',
      align: 'right',
      styles: {
        ...alignRight,
        'size:noprefix': 'l',
        'blockWidth:noprefix': 'default',
      },
    });
  });

  it('normalizes the legacy size CSS-var literal to a large, default-width image', () => {
    const onChangeBlock = vi.fn();

    ImageBlockDataAdapter({
      block: 'block-1',
      data: {
        '@type': 'image',
        styles: { ...alignLeft, 'size:noprefix': 'var(--size-large)' },
      },
      id: 'align',
      onChangeBlock,
      value: 'left',
    });

    expect(onChangeBlock).toHaveBeenCalledWith('block-1', {
      '@type': 'image',
      align: 'left',
      styles: {
        ...alignLeft,
        'size:noprefix': 'l',
        'blockWidth:noprefix': 'default',
      },
    });
  });

  it('copies the item metadata when a url value is set', () => {
    const onChangeBlock = vi.fn();
    const item = {
      credit: 'A photographer',
      Description: 'A description',
      Title: 'A title',
      image_field: 'image',
      image_scales: { image: [{ download: 'image.png' }] },
    };

    ImageBlockDataAdapter({
      block: 'block-1',
      data: { '@type': 'image' },
      id: 'url',
      item,
      onChangeBlock,
      value: '/an-image',
    });

    expect(onChangeBlock).toHaveBeenCalledWith('block-1', {
      '@type': 'image',
      url: '/an-image',
      styles: { 'size:noprefix': 'l' },
      credit: { data: 'A photographer' },
      description: 'A description',
      title: 'A title',
      image_field: 'image',
      image_scales: { image: [{ download: 'image.png' }] },
    });
  });

  it('clears the item metadata when the url value is removed', () => {
    const onChangeBlock = vi.fn();

    ImageBlockDataAdapter({
      block: 'block-1',
      data: {
        '@type': 'image',
        alt: 'alt text',
        credit: { data: 'credit' },
        description: 'description',
        image_scales: {},
        image_field: 'image',
        title: 'title',
      },
      id: 'url',
      onChangeBlock,
      value: '',
    });

    expect(onChangeBlock).toHaveBeenCalledWith('block-1', {
      '@type': 'image',
      url: '',
      styles: { 'size:noprefix': 'l' },
    });
  });
});
