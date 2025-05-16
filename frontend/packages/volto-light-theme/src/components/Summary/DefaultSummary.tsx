import * as React from 'react';
import type { ObjectBrowserItem } from '@plone/types';

export type DefaultSummaryProps = {
  item: Partial<ObjectBrowserItem>;
  HeadingTag?: React.ElementType;
  a11yLabelId?: string;
  hide_description?: boolean;
};

const DefaultSummary = (props: DefaultSummaryProps) => {
  const { item, HeadingTag = 'h3', a11yLabelId, hide_description } = props;
  return (
    <>
      {item?.head_title && <div className="headline">{item.head_title}</div>}
      <HeadingTag className="title" id={a11yLabelId}>
        {item.title ? item.title : item.id}
      </HeadingTag>
      {!hide_description && <p className="description">{item.description}</p>}
    </>
  );
};

export default DefaultSummary;
