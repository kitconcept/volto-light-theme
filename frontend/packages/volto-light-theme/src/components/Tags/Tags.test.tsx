import React from 'react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Tags from './Tags';
import type { Content } from '@plone/types';

const mockConfig = vi.hoisted(() => ({
  getComponent: vi.fn(() => ({
    component: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="container">{children}</div>
    ),
  })),
  settings: {
    showTags: true,
  },
}));

vi.mock('@plone/registry', () => ({
  __esModule: true,
  default: mockConfig,
}));

const mockUseLiveData = vi.fn();

vi.mock('@kitconcept/volto-light-theme/helpers/useLiveData', () => ({
  useLiveData: (content: unknown, behavior: unknown, field: string) =>
    mockUseLiveData(content, behavior, field),
}));

describe('Tags', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockConfig.settings.showTags = true;
  });

  it('renders tag links when enabled', () => {
    mockUseLiveData.mockReturnValue(['React', 'Volto']);
    render(
      <MemoryRouter>
        <Tags content={{ subjects: ['React', 'Volto'] } as Content} />
      </MemoryRouter>,
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/search?Subject=React');
    expect(links[1]).toHaveTextContent('Volto');
  });

  it('returns null when tags are hidden or empty', () => {
    mockConfig.settings.showTags = false;
    mockUseLiveData.mockReturnValue(['React']);
    const { container: hidden } = render(
      <MemoryRouter>
        <Tags />
      </MemoryRouter>,
    );
    expect(hidden.firstChild).toBeNull();

    mockConfig.settings.showTags = true;
    mockUseLiveData.mockReturnValue([]);
    const { container: empty } = render(
      <MemoryRouter>
        <Tags />
      </MemoryRouter>,
    );
    expect(empty.firstChild).toBeNull();
  });
});
