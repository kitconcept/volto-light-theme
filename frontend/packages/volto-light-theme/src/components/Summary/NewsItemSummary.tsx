import { parseDateFromCatalog } from '@kitconcept/volto-light-theme/helpers/dates';
import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';
import type { DefaultSummaryProps } from './DefaultSummary';

const NewsItemSummary = (props: DefaultSummaryProps) => {
  const { item, HeadingTag = 'h3', a11yLabelId, hide_description } = props;

  const effective = parseDateFromCatalog(item.effective);
  const headline = [
    effective ? (
      // @ts-expect-error
      <FormattedDate
        key="day"
        date={effective}
        format={{
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }}
        className="day"
      />
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

export default NewsItemSummary;
