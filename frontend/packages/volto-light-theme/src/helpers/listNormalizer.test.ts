import { describe, it, expect } from 'vitest';
import { normalizeList, denormalizeList } from './listNormalizer';

describe('normalizeList', () => {
  it('normalizes an array of strings', () => {
    const input = ['foo', 'bar'];
    const output = normalizeList(input);
    expect(output).toEqual([
      { label: 'foo', id: 'foo' },
      { label: 'bar', id: 'bar' },
    ]);
  });

  it('normalizes an array of InputA objects', () => {
    const input = [
      { title: 'Foo', token: 'foo' },
      { title: 'Bar', token: 'bar' },
    ];
    const output = normalizeList(input);
    expect(output).toEqual([
      { label: 'Foo', id: 'foo' },
      { label: 'Bar', id: 'bar' },
    ]);
  });

  it('normalizes an array of InputB objects', () => {
    const input = [
      { label: 'Foo', value: 'foo' },
      { label: 'Bar', value: 'bar' },
    ];
    const output = normalizeList(input);
    expect(output).toEqual([
      { label: 'Foo', id: 'foo' },
      { label: 'Bar', id: 'bar' },
    ]);
  });

  it('normalizes a mixed array', () => {
    const input = [
      'baz',
      { title: 'Foo', token: 'foo' },
      { label: 'Bar', value: 'bar' },
    ];
    const output = normalizeList(input);
    expect(output).toEqual([
      { label: 'baz', id: 'baz' },
      { label: 'Foo', id: 'foo' },
      { label: 'Bar', id: 'bar' },
    ]);
  });

  it('throws on invalid item shape', () => {
    // @ts-expect-error
    expect(() => normalizeList([{ foo: 'bar' }])).toThrow('Invalid item shape');
  });
});

describe('denormalizeList', () => {
  it('denormalizes a normalized array', () => {
    const input = [
      { label: 'Foo', id: 'foo' },
      { label: 'Bar', id: 'bar' },
    ];
    const output = denormalizeList(input);
    expect(output).toEqual(['foo', 'bar']);
  });

  it('denormalizes an empty array', () => {
    expect(denormalizeList([])).toEqual([]);
  });
});
