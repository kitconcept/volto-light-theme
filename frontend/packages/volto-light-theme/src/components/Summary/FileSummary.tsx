import FileType from '@kitconcept/volto-light-theme/helpers/Filetype';
import type { DefaultSummaryProps } from './DefaultSummary';
import { smartTextRenderer } from '../../helpers/smartText';

const FileHeadline = (props: { item: any }) => {
  const { item } = props;
  const headline =
    item.getObjSize || FileType(item.mime_type) || item.head_title;

  return headline.length === 0 ? null : (
    <div className="headline">
      <span className="file-size">{item.getObjSize}</span>
      {item.getObjSize && item.mime_type && ' | '}
      <span className="file-type">{FileType(item.mime_type)}</span>
      {item.mime_type && item.head_title && ' | '}
      <span className="headline-content">{item.head_title}</span>
    </div>
  );
};

const FileSummary = (props: DefaultSummaryProps) => {
  const { item, HeadingTag = 'h3', a11yLabelId, hide_description } = props;

  return (
    <>
      <FileHeadline item={item} />
      <HeadingTag className="title" id={a11yLabelId}>
        {item.title ? item.title : item.id}
      </HeadingTag>
      {!hide_description && (
        <p className="description">{smartTextRenderer(item.description)}</p>
      )}
    </>
  );
};

export default FileSummary;
