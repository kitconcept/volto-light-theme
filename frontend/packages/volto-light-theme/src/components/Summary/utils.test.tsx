import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { renderDescription } from './utils';

vi.mock('@plone/volto/components/manage/UniversalLink/UniversalLink', () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} data-testid="universal-link">
      {children}
    </a>
  ),
}));

const renderWithWrapper = (description: string | null | undefined) =>
  render(
    <div data-testid="description-wrapper">
      {renderDescription(description)}
    </div>,
  );

describe('renderDescription', () => {
  it('returns null for empty description', () => {
    expect(renderDescription('')).toBeNull();
    expect(renderDescription(null)).toBeNull();
    expect(renderDescription(undefined)).toBeNull();
  });

  it('renders plain text without creating links', () => {
    const description = 'This is a plain description.';
    const { container, queryByTestId } = renderWithWrapper(description);

    expect(container).toHaveTextContent(description);
    expect(queryByTestId('universal-link')).toBeNull();
  });

  it('renders a single markdown link and preserves surrounding text', () => {
    const description = 'Visit [Google](https://google.com) for more info.';
    const { container } = renderWithWrapper(description);
    const link = screen.getByRole('link', { name: 'Google' });

    expect(container).toHaveTextContent('Visit Google for more info.');
    expect(link).toHaveAttribute('href', 'https://google.com');
  });

  it('renders multiple markdown links with text segments between them', () => {
    const description = 'Check [One](/one) and [Two](/two) for details.';
    renderWithWrapper(description);
    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/one');
    expect(links[1]).toHaveAttribute('href', '/two');
  });

  it('trims whitespace around link text and href values', () => {
    const description = 'Go to [  Space  ](  /space  )!';
    const { container } = renderWithWrapper(description);
    const link = screen.getByRole('link', { name: 'Space' });

    expect(container).toHaveTextContent('Go to Space!');
    expect(link).toHaveAttribute('href', '/space');
  });

  it('ignores bracketed text that is not a markdown link', () => {
    const description = 'Keep [this] but not a link.';
    const { container } = renderWithWrapper(description);

    expect(container).toHaveTextContent('Keep [this] but not a link.');
  });

  it('resets the markdown matcher between invocations', () => {
    const { rerender } = renderWithWrapper('First [Link](/first) call.');
    expect(screen.getByRole('link', { name: 'Link' })).toHaveAttribute(
      'href',
      '/first',
    );

    rerender(
      <div data-testid="description-wrapper">
        {renderDescription('Second [Link](/second) call.')}
      </div>,
    );

    expect(screen.getByRole('link', { name: 'Link' })).toHaveAttribute(
      'href',
      '/second',
    );
  });
});
