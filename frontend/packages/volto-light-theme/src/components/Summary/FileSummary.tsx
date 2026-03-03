import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import FileType from '@kitconcept/volto-light-theme/helpers/Filetype';
import type { DefaultSummaryProps } from './DefaultSummary';
import { smartTextRenderer } from '../../helpers/smartText';

const FileHeadline = (props: { item: any }) => {
  const { item } = props;
  const headline =
    item.getObjSize || FileType(item.mime_type) || item.head_title || '';

  return headline?.length === 0 ? null : (
    <div className="headline">
      {item.getObjSize && <span className="file-size">{item.getObjSize}</span>}
      {FileType(item.mime_type) && (
        <span className="file-type">{FileType(item.mime_type)}</span>
      )}
      {item.head_title && (
        <span className="headline-content">{item.head_title}</span>
      )}
    </div>
  );
};

const FileSummary = (props: DefaultSummaryProps) => {
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

  return (
    <>
      <FileHeadline item={item} />
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

export default FileSummary;
