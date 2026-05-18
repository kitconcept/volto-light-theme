import { describe, it, expect, vi } from 'vitest';
import { VideoBlockDataAdapter } from './adapter';

const alignLeft = { 'align:noprefix': 'left' };
const alignCenter = { 'align:noprefix': 'center' };

describe('VideoBlockDataAdapter', () => {
  it('applies the default width for a floating video', () => {
    const onChangeBlock = vi.fn();

    VideoBlockDataAdapter({
      block: 'block-1',
      data: { '@type': 'video', styles: { ...alignLeft } },
      id: 'url',
      onChangeBlock,
      value: 'https://example.com/video',
    });

    expect(onChangeBlock).toHaveBeenCalledWith('block-1', {
      '@type': 'video',
      url: 'https://example.com/video',
      styles: {
        ...alignLeft,
        'blockWidth:noprefix': 'default',
      },
    });
  });

  it('leaves the styles untouched for a non-floating video', () => {
    const onChangeBlock = vi.fn();

    VideoBlockDataAdapter({
      block: 'block-1',
      data: { '@type': 'video', styles: { ...alignCenter } },
      id: 'url',
      onChangeBlock,
      value: 'https://example.com/video',
    });

    expect(onChangeBlock).toHaveBeenCalledWith('block-1', {
      '@type': 'video',
      url: 'https://example.com/video',
      styles: { ...alignCenter },
    });
  });

  it('leaves the styles untouched when no alignment is set', () => {
    const onChangeBlock = vi.fn();

    VideoBlockDataAdapter({
      block: 'block-1',
      data: { '@type': 'video' },
      id: 'url',
      onChangeBlock,
      value: 'https://example.com/video',
    });

    expect(onChangeBlock).toHaveBeenCalledWith('block-1', {
      '@type': 'video',
      url: 'https://example.com/video',
    });
  });
});
