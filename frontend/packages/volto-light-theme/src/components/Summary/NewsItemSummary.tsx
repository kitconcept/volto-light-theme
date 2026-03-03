import { parseDateFromCatalog } from '@kitconcept/volto-light-theme/helpers/dates';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';
import type { DefaultSummaryProps } from './DefaultSummary';
import { smartTextRenderer } from '../../helpers/smartText';

const NewsItemSummary = (props: DefaultSummaryProps) => {
  const {
    item,
    HeadingTag = 'h3',
    a11yLabelId,
    hide_description,
    cardHref,
    cardItem,
    cardOpenLinkInNewTab,
    cardIsInteractive,
    cardPrimaryLinkRef,
  } = props;

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
        <ConditionalLink
          className="card-primary-link"
          condition={cardIsInteractive}
          href={cardHref}
          item={cardItem}
          openLinkInNewTab={cardOpenLinkInNewTab}
          ref={cardPrimaryLinkRef}
        >
          {item.title ? item.title : item.id}
        </ConditionalLink>
      </HeadingTag>
      {!hide_description && (
        <p className="description">{smartTextRenderer(item.description)}</p>
      )}
    </>
  );
};

export default NewsItemSummary;
