import * as React from 'react';
import type { ObjectBrowserItem } from '@plone/types';
import { smartTextRenderer } from '../../helpers/smartText';

export type DefaultSummaryProps = {
  item: Partial<ObjectBrowserItem>;
  LinkToItem?: React.ElementType;
  HeadingTag?: React.ElementType;
  a11yLabelId?: string;
  hide_description?: boolean;
};

export type SummaryComponentType = React.ComponentType<DefaultSummaryProps> & {
  hideLink?: boolean;
};

const DefaultSummary = (props: DefaultSummaryProps) => {
  const {
    item,
    LinkToItem = React.Fragment,
    HeadingTag = 'h3',
    a11yLabelId,
    hide_description,
  } = props;
  return (
    <>
      {item?.head_title && <div className="headline">{item.head_title}</div>}
      <LinkToItem>
        <HeadingTag className="title" id={a11yLabelId}>
          {item.title ? item.title : item.id}
        </HeadingTag>
      </LinkToItem>
      {!hide_description && (
        <p className="description">{smartTextRenderer(item.description)}</p>
      )}
    </>
  );
};
DefaultSummary.hideLink = false;

export default DefaultSummary;
