import {
  parseDateFromCatalog,
  formatDateRange,
} from '@kitconcept/volto-light-theme/helpers/dates';
import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';
import type { DefaultSummaryProps } from './DefaultSummary';

const EventSummary = (props: DefaultSummaryProps) => {
  const { item, HeadingTag = 'h3', a11yLabelId, hide_description } = props;
  const start = parseDateFromCatalog(item.start);
  const end = parseDateFromCatalog(item.end);
  const headline = [
    start && end ? (
      <span className="day" key="day" suppressHydrationWarning>
        {formatDateRange({ start, end, locale: item.Language })}
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
      {!hide_description && <p className="description">{item.description}</p>}
    </>
  );
};

export default EventSummary;
