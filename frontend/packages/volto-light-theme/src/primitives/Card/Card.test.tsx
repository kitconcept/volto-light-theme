import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';

vi.mock(
  '@plone/volto/components/manage/ConditionalLink/ConditionalLink',
  () => {
    return {
      __esModule: true,
      default: React.forwardRef(
        (
          {
            condition,
            href,
            item,
            openLinkInNewTab: _openLinkInNewTab,
            children,
            ...rest
          }: {
            condition?: boolean;
            href?: string;
            item?: { ['@id']?: string };
            openLinkInNewTab?: boolean;
            children?: React.ReactNode;
          },
          ref: React.ForwardedRef<HTMLAnchorElement>,
        ) => {
          if (!condition) return null;

          const computedHref = href ?? item?.['@id'] ?? '#';

          return (
            <a {...rest} ref={ref} href={computedHref}>
              {children}
            </a>
          );
        },
      ),
    };
  },
);

type SummaryProps = {
  a11yLabelId?: string;
};

const SummaryContent = ({ a11yLabelId }: SummaryProps) => (
  <h3 id={a11yLabelId}>Card title</h3>
);

const BodyContent = () => <div>Body content</div>;

describe('Card', () => {
  const renderCard = (props: React.ComponentProps<typeof Card>) =>
    render(
      <MemoryRouter>
        <Card {...props}>
          <Card.Summary>
            <SummaryContent />
          </Card.Summary>
          <BodyContent />
        </Card>
      </MemoryRouter>,
    );

  it('is interactive when an href is provided', () => {
    const { container } = renderCard({ href: '/target', className: 'custom' });
    const card = container.querySelector('.card') as HTMLElement;

    expect(card).toHaveAttribute('role', 'link');
    expect(card).toHaveAttribute('tabindex', '0');

    const anchor = container.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor).toHaveAttribute('href', '/target');
  });

  it('is interactive when an item is provided', () => {
    const { container } = renderCard({ item: { '@id': '/item-target' } });
    const card = container.querySelector('.card') as HTMLElement;

    expect(card).toHaveAttribute('role', 'link');
    expect(card).toHaveAttribute('tabindex', '0');

    const anchor = container.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor).toHaveAttribute('href', '/item-target');
  });

  it('is not interactive when neither href nor item is provided', () => {
    const { container } = renderCard({});
    const card = container.querySelector('.card') as HTMLElement;

    expect(card).not.toHaveAttribute('role');
    expect(card).not.toHaveAttribute('tabindex');
    expect(container.querySelector('a')).toBeNull();
  });

  it('is not interactive when neither href nor item is provided and one is null', () => {
    const { container } = renderCard({ href: null });
    const card = container.querySelector('.card') as HTMLElement;

    expect(card).not.toHaveAttribute('role');
    expect(card).not.toHaveAttribute('tabindex');
    expect(container.querySelector('a')).toBeNull();
  });

  it('is not interactive when neither href nor item is provided and one is undefined', () => {
    const { container } = renderCard({ item: undefined });
    const card = container.querySelector('.card') as HTMLElement;

    expect(card).not.toHaveAttribute('role');
    expect(card).not.toHaveAttribute('tabindex');
    expect(container.querySelector('a')).toBeNull();
  });

  it('triggers navigation handlers when interactive', () => {
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    const selectionSpy = vi
      .spyOn(window, 'getSelection')
      .mockReturnValue({ toString: () => '' } as unknown as Selection);

    const { container } = renderCard({ href: '/target' });
    const card = container.querySelector('.card') as HTMLElement;

    fireEvent.click(card);
    fireEvent.keyDown(card, { key: 'Enter' });
    fireEvent.keyDown(card, { key: ' ' });
    fireEvent.keyDown(card, { key: 'Escape' });

    expect(clickSpy).toHaveBeenCalledTimes(3);

    clickSpy.mockRestore();
    selectionSpy.mockRestore();
  });
});