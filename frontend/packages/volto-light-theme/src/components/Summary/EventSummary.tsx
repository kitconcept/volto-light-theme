import { parseDateFromCatalog } from '@kitconcept/volto-light-theme/helpers/dates';
import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';
import type { DefaultSummaryProps } from './DefaultSummary';
import { smartTextRenderer } from '../../helpers/smartText';
import {
  formatDayTime,
  createEventFormatters,
} from '@kitconcept/volto-light-theme/components/Theme/EventView';

const EventSummary = (props: DefaultSummaryProps) => {
  const { item, HeadingTag = 'h3', a11yLabelId, hide_description } = props;

  const dateOnly = (isoString) => new Date(isoString.slice(0, 10));

  const wholeDay = !!item.whole_day;
  const isOpenEnd = !!item.open_end;

  const start = parseDateFromCatalog(item.start);
  const end =
    wholeDay && !isOpenEnd
      ? dateOnly(item.end)
      : parseDateFromCatalog(item.end);

  const { formatter, Dateformatter, TimeFormatter } = createEventFormatters(
    item.Language,
  );

  const DayTimeFormatted = formatDayTime({
    isOpenEnd,
    wholeDay,
    start,
    formatter,
    Dateformatter,
    TimeFormatter,
    end,
  });

  const headline = [
    start && end ? (
      <span className="day" key="day" suppressHydrationWarning>
        {DayTimeFormatted}
      </span>
    ) : start ? (
      // @ts-expect-error
      <FormattedDate key="day" date={start} />
    ) : null,
    item.head_title,
  ]
    .filter((x) => x)
    .flatMap((x) => [' | ', x])
    .slice(1);

  return (
    <>
      {headline.length ? <div className="headline">{headline}</div> : null}
      <HeadingTag className="title" id={a11yLabelId}>
        {item.title ? item.title : item.id}
      </HeadingTag>
      {!hide_description && (
        <p className="description">{smartTextRenderer(item.description)}</p>
      )}
    </>
  );
};

export default EventSummary;
