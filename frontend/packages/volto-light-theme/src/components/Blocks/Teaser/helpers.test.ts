import { describe, expect, it } from 'vitest';
import { buildTeaserItem } from './helpers';

describe('buildTeaserItem', () => {
  it('returns href when overwrite is falsey', () => {
    const href = { '@id': '/news', title: 'News from href' };
    const result = buildTeaserItem({ overwrite: false }, href);

    expect(result).toEqual(href);
  });

  it('overrides missing href fields with undefined when overwriting', () => {
    const href = {
      '@id': '/news',
      title: 'Href title',
      description: 'Href description',
    };
    const data = {
      overwrite: true,
      title: 'New title',
    };

    const result = buildTeaserItem(data, href);

    expect(result).toEqual({
      '@id': '/news',
      title: 'New title',
      overwrite: true,
      description: undefined,
    });
  });

  it('merges provided fields from data when overwriting', () => {
    const href = {
      '@id': '/news',
      title: 'Href title',
    };
    const data = {
      overwrite: true,
      title: 'New title',
      description: 'New description',
    };

    const result = buildTeaserItem(data, href);

    expect(result).toEqual({
      '@id': '/news',
      title: 'New title',
      overwrite: true,
      description: 'New description',
    });
  });
});
