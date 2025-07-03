import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@kitconcept/volto-light-theme/primitives/Card/Card';
import DefaultSummary from '@kitconcept/volto-light-theme/components/Summary/DefaultSummary';
import cx from 'classnames';

const EventItem = ({ item, lang }) => {
  const formatter = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'short',
  });
  const headFormatter = new Intl.DateTimeFormat(lang, {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  });
  const start = item.start ? new Date(item.start) : null;
  const end = item.end ? new Date(item.end) : null;
  const formattedStartDate = start ? formatter.format(start) : '';
  const formattedEndDate = end ? formatter.format(end) : '';
  const formattedHeaderDate = !end
    ? headFormatter.format(start)
    : headFormatter.formatRange(start, end);
  return (
    <div className="card-listing">
      <Card href={item['@id']} className="event-card">
        <Card.Image>
          <div className={cx('date-inset', { 'has-end-date': end })}>
            <div className="day">
              {String(start.getDate()).padStart(2, '0')}
            </div>
            <div className="month">{formattedStartDate}</div>
            {end && (
              <>
                <div className="separator"></div>
                <div className="day">
                  {String(end.getDate()).padStart(2, '0')}
                </div>
                <div className="month">{formattedEndDate}</div>
              </>
            )}
          </div>
        </Card.Image>
        <Card.Summary>
          <div className="headline calendar">
            <span className="day">{formattedHeaderDate}</span>
            {item.head_title && (
              <span className="event-title">{item.head_title}</span>
            )}
          </div>
          <DefaultSummary item={item} HeadingTag="h2" />
        </Card.Summary>
      </Card>
    </div>
  );
};

const EventCalenderTemplate = (props) => {
  const lang = useSelector((state: any) => state.intl.locale);
  return (
    <div className="event-calendar items">
      {props.items.map((item: any, index: number) => (
        <EventItem key={index} item={item} lang={lang} />
      ))}
    </div>
  );
};

export default EventCalenderTemplate;
