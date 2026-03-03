import * as React from 'react';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import type { ObjectBrowserItem } from '@plone/types';
import { smartTextRenderer } from '../../helpers/smartText';

export type DefaultSummaryProps = {
  item: Partial<ObjectBrowserItem>;
  HeadingTag?: React.ElementType;
  a11yLabelId?: string;
  hide_description?: boolean;
  cardHref?: string;
  cardItem?: Partial<ObjectBrowserItem>;
  cardOpenLinkInNewTab?: boolean;
  cardIsInteractive?: boolean;
  cardPrimaryLinkRef?: React.RefObject<HTMLAnchorElement | null>;
};

export type SummaryComponentType = React.ComponentType<DefaultSummaryProps> & {
  hideLink?: boolean;
};

const DefaultSummary = (props: DefaultSummaryProps) => {
  const {
    item,
    HeadingTag = 'h3',
    a11yLabelId,
    hide_description,
    cardHref,
    cardItem,
    cardOpenLinkInNewTab,
    cardIsInteractive,
    cardPrimaryLinkRef,
  } = props;
  return (
    <>
      {item?.head_title && <div className="headline">{item.head_title}</div>}
      <HeadingTag className="title" id={a11yLabelId}>
        <ConditionalLink
          className="card-primary-link"
          condition={cardIsInteractive}
          href={cardHref}
          item={cardItem}
          openLinkInNewTab={cardOpenLinkInNewTab}
          ref={cardPrimaryLinkRef}
        >
          {item.title ? item.title : item.id}
        </ConditionalLink>
      </HeadingTag>
      {!hide_description && (
        <p className="description">{smartTextRenderer(item.description)}</p>
      )}
    </>
  );
};
DefaultSummary.hideLink = false;

export default DefaultSummary;
