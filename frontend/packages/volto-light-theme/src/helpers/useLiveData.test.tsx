import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import { useLiveData } from './useLiveData';
import type { Content } from '@plone/types';

const HEADER_BEHAVIOR = 'voltolighttheme.header';

const mockStore = configureStore();

type StoreState = {
  form: { global: Record<string, unknown> };
  errorContext: Content | null;
};

function renderUseLiveData<T>({
  content,
  behavior,
  field,
  storeState,
  pathname = '/page',
}: {
  content: Content | null;
  behavior: string | undefined;
  field: string;
  storeState: StoreState;
  pathname?: string;
}) {
  const store = mockStore({ intl: { locale: 'en', messages: {} }, ...storeState });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[pathname]}>{children}</MemoryRouter>
    </Provider>
  );

  return renderHook(() => useLiveData<T>(content as Content, behavior, field), {
    wrapper,
  });
}

const contentWithInheritedHeader = {
  '@components': {
    inherit: {
      [HEADER_BEHAVIOR]: {
        data: { has_intranet_header: true, intranet_flag: 'Intranet' },
      },
    },
  },
  subjects: ['parent-tag'],
} as unknown as Content;

describe('useLiveData', () => {
  describe('view/edit mode', () => {
    it('returns the inherited (behavior) value when there is no form data', () => {
      const { result } = renderUseLiveData<boolean>({
        content: contentWithInheritedHeader,
        behavior: HEADER_BEHAVIOR,
        field: 'has_intranet_header',
        storeState: { form: { global: {} }, errorContext: null },
      });
      expect(result.current).toBe(true);
    });

    it('prefers live form data over the inherited value', () => {
      const { result } = renderUseLiveData<string>({
        content: contentWithInheritedHeader,
        behavior: HEADER_BEHAVIOR,
        field: 'intranet_flag',
        storeState: {
          form: { global: { intranet_flag: 'Edited flag' } },
          errorContext: null,
        },
      });
      expect(result.current).toBe('Edited flag');
    });

    it('reads a per-object field directly from the content (no behavior)', () => {
      const { result } = renderUseLiveData<string[]>({
        content: contentWithInheritedHeader,
        behavior: undefined,
        field: 'subjects',
        storeState: { form: { global: {} }, errorContext: null },
      });
      expect(result.current).toEqual(['parent-tag']);
    });

    it('falls back to errorContext when there is no content', () => {
      const { result } = renderUseLiveData<boolean>({
        content: null,
        behavior: HEADER_BEHAVIOR,
        field: 'has_intranet_header',
        storeState: {
          form: { global: {} },
          errorContext: contentWithInheritedHeader,
        },
      });
      expect(result.current).toBe(true);
    });
  });

  describe('add mode', () => {
    it('keeps the inherited (behavior) value while adding a child', () => {
      const { result } = renderUseLiveData<boolean>({
        content: contentWithInheritedHeader,
        behavior: HEADER_BEHAVIOR,
        field: 'has_intranet_header',
        storeState: { form: { global: {} }, errorContext: null },
        pathname: '/some-folder/add',
      });
      expect(result.current).toBe(true);
    });

    it('still previews live form data for inherited settings while adding', () => {
      const { result } = renderUseLiveData<string>({
        content: contentWithInheritedHeader,
        behavior: HEADER_BEHAVIOR,
        field: 'intranet_flag',
        storeState: {
          form: { global: { intranet_flag: 'New flag' } },
          errorContext: null,
        },
        pathname: '/some-folder/add',
      });
      expect(result.current).toBe('New flag');
    });

    it('does not inherit a per-object field from the parent object', () => {
      // The new child must not show the parent's tags.
      const { result } = renderUseLiveData<string[] | undefined>({
        content: contentWithInheritedHeader,
        behavior: undefined,
        field: 'subjects',
        storeState: { form: { global: {} }, errorContext: null },
        pathname: '/some-folder/add',
      });
      expect(result.current).toBeUndefined();
    });

    it('previews the per-object field value being entered on the add form', () => {
      const { result } = renderUseLiveData<string[]>({
        content: contentWithInheritedHeader,
        behavior: undefined,
        field: 'subjects',
        storeState: {
          form: { global: { subjects: ['new-tag'] } },
          errorContext: null,
        },
        pathname: '/some-folder/add',
      });
      expect(result.current).toEqual(['new-tag']);
    });
  });
});
