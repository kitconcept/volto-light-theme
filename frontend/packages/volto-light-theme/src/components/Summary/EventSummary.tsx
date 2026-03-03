import {
  parseDateFromCatalog,
  formatDateRange,
} from '@kitconcept/volto-light-theme/helpers/dates';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';
import type { DefaultSummaryProps } from './DefaultSummary';
import { smartTextRenderer } from '../../helpers/smartText';

const EventSummary = (props: DefaultSummaryProps) => {
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

export default EventSummary;
