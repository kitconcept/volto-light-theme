import { parseDateFromCatalog } from '@kitconcept/volto-light-theme/helpers/dates';
import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';

const NewsItemSummary = (props) => {
  const { item, HeadingTag = 'h3' } = props;

  const effective = parseDateFromCatalog(item.effective);
  const headline = [
    effective ? (
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
      <HeadingTag className="title">
        {item.title ? item.title : item.id}
      </HeadingTag>
      {!item.hide_description && (
        <p className="description">{item.description}</p>
      )}
    </>
  );
};

export default NewsItemSummary;
