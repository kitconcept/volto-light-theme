import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
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
  LinkToItem?: React.ElementType;
};

const SummaryContent = ({
  a11yLabelId,
  LinkToItem = React.Fragment,
}: SummaryProps) => (
  <h3 id={a11yLabelId}>
    <LinkToItem>Card title</LinkToItem>
  </h3>
);

const BodyContent = () => <div>Body content</div>;

describe('Card', () => {
  const renderCard = (props: React.ComponentProps<typeof Card>) =>
    render(
      <Card {...props}>
        <Card.Summary>
          <SummaryContent />
        </Card.Summary>
        <BodyContent />
      </Card>,
    );

  it('is interactive when an href is provided', () => {
    const { container } = renderCard({ href: '/target', className: 'custom' });

    const anchor = container.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor).toHaveAttribute('href', '/target');
    expect(anchor).toHaveClass('card-primary-link');
  });

  it('is interactive when an item is provided', () => {
    const { container } = renderCard({ item: { '@id': '/item-target' } });

    const anchor = container.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor).toHaveAttribute('href', '/item-target');
    expect(anchor).toHaveClass('card-primary-link');
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
});
