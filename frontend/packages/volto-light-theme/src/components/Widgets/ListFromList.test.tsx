import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  normalizeArray,
  // differenceByNameAndType is not exported, so we can't test it directly
} from './ListFromList';

vi.mock('uuid', () => ({
  v4: () => 'mock-uuid',
}));

describe('normalizeArray', () => {
  it('adds id to string items', () => {
    const input = ['foo', 'bar'];
    const result = normalizeArray(input);
    expect(result).toEqual([
      { id: 'foo', name: 'foo' },
      { id: 'bar', name: 'bar' },
    ]);
  });

  it('uses value, token, or id as id', () => {
    const input = [
      { value: 'v1', name: 'n1' },
      { token: 't2', name: 'n2' },
      { id: 'i3', name: 'n3' },
    ];
    const result = normalizeArray(input);
    expect(result).toEqual([
      { id: 'v1', name: 'n1', value: 'v1' },
      { id: 't2', name: 'n2', token: 't2' },
      { id: 'i3', name: 'n3' },
    ]);
  });

  it('generates uuid if no id, value, or token', () => {
    const input = [{ name: 'n4' }];
    const result = normalizeArray(input);
    expect(result).toEqual([{ id: 'mock-uuid', name: 'n4' }]);
  });
});
