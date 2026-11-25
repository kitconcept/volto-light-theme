import React from 'react';
import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { useStickyContent } from './useStickyContent';

type State = {
  content: { data: Record<string, unknown> | null; get?: { error?: unknown } };
};

function setup(initial: State) {
  const store = createStore(
    (state: State = initial, action: { type: string; state?: State }) =>
      action.type === 'SET' && action.state ? action.state : state,
  );
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  const hook = renderHook(() => useStickyContent(), { wrapper });
  const set = (state: State) =>
    act(() => {
      store.dispatch({ type: 'SET', state });
    });
  return { hook, set };
}

const page = { '@id': '/page', title: 'Page' };
const other = { '@id': '/other', title: 'Other' };

describe('useStickyContent', () => {
  it('returns the current content', () => {
    const { hook } = setup({ content: { data: page } });
    expect(hook.result.current).toBe(page);
  });

  it('keeps the last content while the content is reset before a fetch', () => {
    const { hook, set } = setup({ content: { data: page } });
    set({ content: { data: null, get: {} } });
    expect(hook.result.current).toBe(page);
    set({ content: { data: other } });
    expect(hook.result.current).toBe(other);
  });

  it('returns null when the content request failed', () => {
    const { hook, set } = setup({ content: { data: page } });
    set({ content: { data: null, get: { error: { status: 404 } } } });
    expect(hook.result.current).toBeNull();
  });
});
