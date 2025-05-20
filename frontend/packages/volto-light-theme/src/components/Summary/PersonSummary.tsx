import * as React from 'react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import type { ObjectBrowserItem } from '@plone/types';
import mailSVG from '@plone/volto/icons/email.svg';
import locationSVG from '@plone/volto/icons/map.svg';
import phoneSVG from '@plone/volto/icons/mobile.svg';

export type PersonSummaryProps = {
  item: Partial<ObjectBrowserItem>;
  HeadingTag?: React.ElementType;
  a11yLabelId?: string;
  hide_description?: boolean;
};

const PersonSummary = (props: PersonSummaryProps) => {
  const { item, HeadingTag = 'h3', a11yLabelId, hide_description } = props;
  return (
    <>
      {item?.head_title && <div className="headline">{item.head_title}</div>}
      <HeadingTag className="title" id={a11yLabelId}>
        {item.title ? item.title : item.id}
      </HeadingTag>
      {!hide_description && <p className="description">{item.description}</p>}

      {item.contact_email && (
        <div className="summary-extra-info">
          <Icon name={mailSVG} size="24px" />
          <a href={`mailto:${item.contact_email}`}>{item.contact_email}</a>
        </div>
      )}

      <div className="summary-room-phone">
        {item.contact_room && (
          <div className="summary-extra-info">
            <Icon name={locationSVG} size="24px" />
            {item.contact_room}
          </div>
        )}
        {item.contact_phone && (
          <div className="summary-extra-info">
            <Icon name={phoneSVG} size="24px" />
            {item.contact_phone}
          </div>
        )}
      </div>
    </>
  );
};

export default PersonSummary;
