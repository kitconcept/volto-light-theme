import * as React from 'react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import mailSVG from '@plone/volto/icons/email.svg';
import locationSVG from '@plone/volto/icons/map.svg';
import phoneSVG from '@plone/volto/icons/mobile.svg';
import type { DefaultSummaryProps } from './DefaultSummary';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  phone: {
    id: 'Phone',
    defaultMessage: 'Phone',
  },
  email: {
    id: 'eMail',
    defaultMessage: 'eMail',
  },
  room: {
    id: 'Room',
    defaultMessage: 'Room',
  },
});

const PersonSummary = (props: DefaultSummaryProps) => {
  const { item, HeadingTag = 'h3', a11yLabelId, hide_description } = props;
  const intl = useIntl();

  return (
    <>
      {item?.head_title && <div className="headline">{item.head_title}</div>}
      <HeadingTag className="title" id={a11yLabelId}>
        {item.title ? item.title : item.id}
      </HeadingTag>
      {!hide_description && <p className="description">{item.description}</p>}

      {item.contact_email && (
        <div className="summary-extra-info">
          <Icon
            title={intl.formatMessage(messages.email)}
            name={mailSVG}
            size="24px"
          />
          <a href={`mailto:${item.contact_email}`}>{item.contact_email}</a>
        </div>
      )}

      <div className="summary-room-phone">
        {item.contact_room && (
          <div className="summary-extra-info">
            <Icon
              title={intl.formatMessage(messages.room)}
              name={locationSVG}
              size="24px"
            />
            {item.contact_room}
          </div>
        )}
        {item.contact_phone && (
          <div className="summary-extra-info">
            <Icon
              title={intl.formatMessage(messages.phone)}
              name={phoneSVG}
              size="24px"
            />
            {item.contact_phone}
          </div>
        )}
      </div>
    </>
  );
};

export default PersonSummary;
