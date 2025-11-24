import React from 'react';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import Breadcrumbs from './Breadcrumbs';
import { getBreadcrumbs } from '@plone/volto/actions/breadcrumbs/breadcrumbs';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import { hasApiExpander } from '@plone/volto/helpers/Utils/Utils';

vi.mock('@plone/components', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}));

vi.mock('@plone/volto/components/theme/Icon/Icon', () => ({
  __esModule: true,
  default: () => <span data-testid="home-icon" />,
}));

vi.mock('@plone/volto/actions/breadcrumbs/breadcrumbs', () => ({
  getBreadcrumbs: vi.fn(() => ({ type: 'GET_BREADCRUMBS' })),
}));

vi.mock('@plone/volto/helpers/Url/Url', () => ({
  getBaseUrl: vi.fn(() => '/base'),
}));

vi.mock('@plone/volto/helpers/Utils/Utils', () => ({
  hasApiExpander: vi.fn(() => false),
}));

const mockStore = configureStore<{
  breadcrumbs: {
    items: { title: string; url: string }[];
    root?: string;
  };
  intl: {
    locale: string;
    messages: Record<string, string>;
  };
}>();

const mockedGetBreadcrumbs = vi.mocked(getBreadcrumbs);
const mockedGetBaseUrl = vi.mocked(getBaseUrl);
const mockedHasApiExpander = vi.mocked(hasApiExpander);

const renderBreadcrumbs = (
  options: {
    pathname?: string;
    items?: { title: string; url: string }[];
    root?: string;
  } = {},
) => {
  const {
    pathname = '/current-path',
    items = [
      { title: 'Section one', url: '/section-one' },
      { title: 'Current page', url: '/section-one/current' },
    ],
    root = '/home',
  } = options;

  const store = mockStore({
    breadcrumbs: {
      items,
      root,
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const renderResult = render(
    <Provider store={store}>
      <MemoryRouter>
        <Breadcrumbs pathname={pathname} />
      </MemoryRouter>
    </Provider>,
  );

  return { store, ...renderResult };
};

describe('Breadcrumbs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetBaseUrl.mockReturnValue('/base');
    mockedGetBreadcrumbs.mockReturnValue({ type: 'GET_BREADCRUMBS' });
  });

  it('renders the home link and breadcrumb items', () => {
    mockedHasApiExpander.mockReturnValue(true);
    const { container } = renderBreadcrumbs();

    const homeLink = screen.getByTitle('Home') as HTMLAnchorElement;
    expect(homeLink).toHaveAttribute('href', '/home');
    expect(screen.getByText('Section one')).toBeInTheDocument();
    expect(screen.getByText('Current page')).toHaveClass('section', {
      exact: false,
    });
    expect(container.querySelector('.section.active')?.textContent).toBe(
      'Current page',
    );
  });

  it('dispatches breadcrumb fetching when no expander is registered', () => {
    mockedHasApiExpander.mockReturnValue(false);
    mockedGetBaseUrl.mockReturnValue('/base-url');
    const { store } = renderBreadcrumbs({ pathname: '/another-path' });

    expect(mockedGetBaseUrl).toHaveBeenCalledWith('/another-path');
    expect(mockedGetBreadcrumbs).toHaveBeenCalledWith('/base-url');
    expect(store.getActions()).toEqual([{ type: 'GET_BREADCRUMBS' }]);
  });

  it('skips fetching when breadcrumbs expander already exists', () => {
    mockedHasApiExpander.mockReturnValue(true);
    const { store } = renderBreadcrumbs();

    expect(mockedGetBreadcrumbs).not.toHaveBeenCalled();
    expect(store.getActions()).toHaveLength(0);
  });
});
