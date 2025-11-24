import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import Navigation from './Navigation';
import { getNavigation } from '@plone/volto/actions/navigation/navigation';
import { hasApiExpander } from '@plone/volto/helpers/Utils/Utils';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';

vi.mock('../../helpers/doesNodeContainClick', () => ({
  __esModule: true,
  default: () => false,
}));

vi.mock('@plone/volto/components/theme/Icon/Icon', () => ({
  __esModule: true,
  default: () => <span data-testid="icon" />,
}));

vi.mock('@plone/volto/components/theme/Navigation/NavItem', () => ({
  __esModule: true,
  default: ({ item }: { item: { title: string } }) => (
    <span data-testid="nav-item">{item.title}</span>
  ),
}));

vi.mock('@plone/volto/actions/navigation/navigation', () => ({
  getNavigation: vi.fn(() => ({ type: 'GET_NAVIGATION' })),
}));

vi.mock('@plone/volto/helpers/Url/Url', () => ({
  getBaseUrl: vi.fn((path: string) => path),
}));

vi.mock('@plone/volto/helpers/Utils/Utils', () => ({
  hasApiExpander: vi.fn(() => false),
}));

vi.mock('@plone/volto/registry', () => ({
  __esModule: true,
  default: {
    settings: {
      navDepth: 3,
    },
  },
}));

vi.mock('@plone/volto/icons/clear.svg', () => ({
  __esModule: true,
  default: 'clear.svg',
}));

const mockStore = configureStore();

const mockedHasApiExpander = vi.mocked(hasApiExpander);
const mockedGetNavigation = vi.mocked(getNavigation);
const mockedGetBaseUrl = vi.mocked(getBaseUrl);

type TestNavigationItem = {
  title: string;
  url: string;
  nav_title?: string;
  items?: TestNavigationItem[];
};

const baseItems: TestNavigationItem[] = [
  { title: 'About', url: '/about' },
  { title: 'News', url: '/news' },
];

const renderNavigation = ({
  items = baseItems,
  hasFatMenuHeader = false,
  formFatMenu,
  pathname = '/news',
}: {
  items?: TestNavigationItem[];
  hasFatMenuHeader?: boolean;
  formFatMenu?: boolean;
  pathname?: string;
} = {}) => {
  const store = mockStore({
    content: {
      data: {
        '@components': {
          inherit: {
            'voltolighttheme.header': {
              data: { has_fat_menu: hasFatMenuHeader },
            },
          },
        },
      },
    },
    form: {
      global:
        formFatMenu === undefined ? undefined : { has_fat_menu: formFatMenu },
    },
    intl: {
      locale: 'en',
    },
    userSession: {
      token: null,
    },
    navigation: {
      items,
    },
  });

  const renderResult = render(
    <Provider store={store}>
      <MemoryRouter>
        <Navigation pathname={pathname} />
      </MemoryRouter>
    </Provider>,
  );

  return { store, ...renderResult };
};

describe('Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedHasApiExpander.mockReturnValue(false);
    mockedGetNavigation.mockReturnValue({ type: 'GET_NAVIGATION' });
    mockedGetBaseUrl.mockImplementation((path: string) => path);
  });

  it('renders simple nav items when fat menu is disabled', () => {
    renderNavigation({ hasFatMenuHeader: false });

    const navItems = screen.getAllByTestId('nav-item');
    expect(navItems).toHaveLength(baseItems.length);
    expect(navItems[0]).toHaveTextContent('About');
  });

  it('expands and collapses the fat menu', () => {
    const { container } = renderNavigation({
      hasFatMenuHeader: true,
      items: [
        {
          title: 'Sections',
          url: '/sections',
          items: [
            {
              title: 'First',
              url: '/sections/first',
              items: [],
            },
          ],
        },
      ],
    });

    const openButtons = screen.getAllByRole('button', {
      name: 'Open menu',
    });
    fireEvent.click(openButtons[0]);
    expect(container.querySelector('.submenu.active')).not.toBeNull();

    const closeButton = screen.getByLabelText('Close menu');
    fireEvent.click(closeButton);
    expect(container.querySelector('.submenu.active')).toBeNull();
  });

  it('fetches navigation data when no expander is present', () => {
    mockedGetBaseUrl.mockReturnValue('/base');
    const { store } = renderNavigation({ pathname: '/blog' });

    expect(mockedGetBaseUrl).toHaveBeenCalledWith('/blog');
    expect(mockedGetNavigation).toHaveBeenCalledWith('/base', 3);
    expect(store.getActions()).toEqual([{ type: 'GET_NAVIGATION' }]);
  });
});
