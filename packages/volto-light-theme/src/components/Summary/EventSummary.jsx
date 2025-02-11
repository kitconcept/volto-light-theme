import {
  parseDateFromCatalog,
  formatDateRange,
} from '@kitconcept/volto-light-theme/helpers/dates';
import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';

const EventSummary = (props) => {
  const { item, HeadingTag = 'h3' } = props;
  const start = parseDateFromCatalog(item.start);
  const end = parseDateFromCatalog(item.end);
  const headline = [
    start && end ? (
      <span className="day" key="day" suppressHydrationWarning>
        {formatDateRange({ start, end, locale: item.Language })}
      </span>
    ) : start ? (
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
      <HeadingTag className="title">
        {item.title ? item.title : item.id}
      </HeadingTag>
      {!item.hide_description && (
        <p className="description">{item.description}</p>
      )}
    </>
  );
};

export default EventSummary;
