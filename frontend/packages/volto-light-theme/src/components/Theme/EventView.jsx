/**
 * EventView view component.
 * @module components/theme/View/EventView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { hasBlocksData } from '@plone/volto/helpers/Blocks/Blocks';
import { flattenHTMLToAppURL } from '@plone/volto/helpers/Url/Url';
import { Container as SemanticContainer } from 'semantic-ui-react';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';

import config from '@plone/volto/registry';
import { injectIntl } from 'react-intl';

export const createEventFormatters = (language = 'default') => ({
  formatter: new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }),
  Dateformatter: new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),
  TimeFormatter: new Intl.DateTimeFormat(language, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }),
});
const EventTextfieldView = ({ content }) => {
  const Image = config.getComponent({ name: 'Image' }).component;
  return (
    <React.Fragment>
      {content.title && (
        <h1 className="documentFirstHeading">{content.title}</h1>
      )}
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}
      {content.preview_image && (
        <Image
          className="document-image ui right floated image"
          item={content}
          imageField="preview_image"
          alt=""
        />
      )}
      {content.text && (
        <div
          dangerouslySetInnerHTML={{
            __html: flattenHTMLToAppURL(content.text.data),
          }}
        />
      )}
    </React.Fragment>
  );
};

export const formatDayTime = ({
  isOpenEnd,
  wholeDay,
  formatter,
  Dateformatter,
  TimeFormatter,
  start,
  end,
}) => {
  // Case 1: Single Day, no time (open end + whole day)
  if (isOpenEnd && wholeDay) {
    return Dateformatter.format(start);
  }
  // Case 2: Single Day, start time only (open end, not whole day)
  if (isOpenEnd && !wholeDay) {
    return `${Dateformatter.format(start)} · from  ${TimeFormatter.format(start)}`;
  }
  // Case 4,9: Multi Day , no Time
  if (!isOpenEnd && wholeDay) {
    return Dateformatter.formatRange(start, end);
  }
  // Case 3: Single day, start-end time with dot separator
  if (Dateformatter.format(start) === Dateformatter.format(end)) {
    return `${Dateformatter.format(start)} · ${TimeFormatter.format(start)}–${TimeFormatter.format(end)}`;
  }
  // Case 6,10 : Multi day, with start and end time (normal)
  return formatter.formatRange(start, end);
};

/**
 * EventView view component class.
 * @function EventView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const EventView = (props) => {
  const { content } = props;

  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;
  const language = content.language?.token || 'default';
  const start = content.start ? new Date(content.start) : null;
  const end = content.end ? new Date(content.end) : null;
  const isOpenEnd = !!content.open_end;
  const wholeDay = !!content.whole_day;
  const { formatter, Dateformatter, TimeFormatter } =
    createEventFormatters(language);

  const DayTimeFormatted = formatDayTime({
    isOpenEnd,
    wholeDay,
    TimeFormatter,
    Dateformatter,
    formatter,
    start,
    end,
  });

  return (
    <Container id="page-document" className="view-wrapper event-view">
      <div className="dates">
        {DayTimeFormatted ? (
          <span className="day" suppressHydrationWarning>
            {DayTimeFormatted}
          </span>
        ) : null}{' '}
        {content?.head_title && (
          <span className="head-title"> {content?.head_title}</span>
        )}
      </div>
      {hasBlocksData(content) ? (
        <>
          <RenderBlocks {...props} />
        </>
      ) : (
        <EventTextfieldView {...props} />
      )}
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
EventView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.shape({
      data: PropTypes.string,
    }),
    attendees: PropTypes.arrayOf(PropTypes.string).isRequired,
    contact_email: PropTypes.string,
    contact_name: PropTypes.string,
    contact_phone: PropTypes.string,
    end: PropTypes.string.isRequired,
    event_url: PropTypes.string,
    location: PropTypes.string,
    open_end: PropTypes.bool,
    recurrence: PropTypes.any,
    start: PropTypes.string.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
    whole_day: PropTypes.bool,
  }).isRequired,
};
export default injectIntl(EventView);
