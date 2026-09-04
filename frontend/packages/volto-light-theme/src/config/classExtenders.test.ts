import { describe, it, expect, beforeAll } from 'vitest';
import config from '@plone/volto/registry';
import {
  buildStyleClassNamesFromData,
  buildStyleClassNamesExtenders,
} from '@plone/volto/helpers/Blocks/Blocks';
import { styleClassNameConverters } from '@plone/volto/config/Style';
import installClassExtenders from './classExtenders';

// Reproduces what `StyleWrapper` puts on the block wrapper: the classes derived
// from `data.styles` plus the ones the extenders inject.
const classNamesFor = (
  data: any,
  content: any = { blocks: {}, blocks_layout: { items: ['block-1'] } },
) =>
  buildStyleClassNamesExtenders({
    block: 'block-1',
    content,
    data,
    classNames: buildStyleClassNamesFromData(data.styles),
  });

beforeAll(() => {
  // Start from the pristine core converters, so the `noprefix` override is
  // applied exactly once regardless of what else touched the registry.
  config.settings.styleClassNameConverters = { ...styleClassNameConverters };
  config.settings.styleClassNameExtenders = [];
  installClassExtenders(config);
});

describe('token style field class names', () => {
  it('emits one prefixed class per token field and no bare token', () => {
    const classNames = classNamesFor({
      '@type': 'image',
      styles: {
        'blockWidth:noprefix': 'narrow',
        'align:noprefix': 'left',
        'size:noprefix': 'm',
      },
    });

    expect(classNames).toContain('has--block-width--narrow');
    expect(classNames).toContain('has--block-alignment--left');
    expect(classNames).toContain('has--media-size--m');

    expect(classNames).not.toContain('narrow');
    expect(classNames).not.toContain('left');
    expect(classNames).not.toContain('m');
  });

  it('falls back to the default token for the fields that have one', () => {
    const classNames = classNamesFor({ '@type': 'image', styles: {} });

    expect(classNames).toContain('has--block-width--default');
  });

  it('emits no media size class when the size is unset', () => {
    const classNames = classNamesFor({ '@type': 'image', styles: {} });

    expect(
      classNames.filter((className: string) =>
        className.startsWith('has--media-size--'),
      ),
    ).toEqual([]);
  });

  it('emits each token field exactly once', () => {
    const classNames = classNamesFor({
      '@type': 'image',
      styles: { 'blockWidth:noprefix': 'full' },
    });

    expect(
      classNames.filter((className: string) =>
        className.startsWith('has--block-width--'),
      ),
    ).toEqual(['has--block-width--full']);
  });

  it('emits no class when the token is a pre-VLT8 CSS object', () => {
    const classNames = classNamesFor({
      '@type': 'image',
      styles: {
        'blockWidth:noprefix': { '--block-width': '100%' },
        'size:noprefix': { '--media-size': 'var(--size-large)' },
      },
    });

    // The inline `--block-width` still comes through `buildStyleObjectFromData`,
    // so claiming `has--block-width--default` here would contradict it.
    expect(
      classNames.filter(
        (className: string) =>
          className.startsWith('has--block-width--') ||
          className.startsWith('has--media-size--'),
      ),
    ).toEqual([]);
  });

  it('keeps the core behavior for `:noprefix` fields of other add-ons', () => {
    const classNames = classNamesFor({
      '@type': 'image',
      styles: { 'someAddonField:noprefix': 'fancy' },
    });

    expect(classNames).toContain('fancy');
  });

  it('does not treat inherited Object properties as token fields', () => {
    const classNames = classNamesFor({
      '@type': 'image',
      styles: { 'toString:noprefix': 'fancy' },
    });

    expect(classNames).toContain('fancy');
  });

  it('still emits the non-prefixed converters untouched', () => {
    const classNames = classNamesFor({
      '@type': 'separator',
      styles: { shortLine: true },
    });

    expect(classNames).toContain('has--shortLine--true');
  });
});

describe('background color class names', () => {
  it('derives the class from the block `theme`, not from `styles`', () => {
    const classNames = classNamesFor({ '@type': 'image', theme: 'grey' });

    expect(classNames).toContain('has--background-color--grey');
    expect(classNames).not.toContain('grey');
  });

  it('falls back to the default theme', () => {
    const classNames = classNamesFor({ '@type': 'image' });

    expect(classNames).toContain('has--background-color--default');
  });
});
