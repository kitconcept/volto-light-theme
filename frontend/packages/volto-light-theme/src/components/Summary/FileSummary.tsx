import FileType from '@kitconcept/volto-light-theme/helpers/Filetype';
import type { DefaultSummaryProps } from './DefaultSummary';

const FileSummary = (props: DefaultSummaryProps) => {
  const { item, HeadingTag = 'h3', a11yLabelId, hide_description } = props;

  const headline = [item.getObjSize, FileType(item.mime_type), item.head_title]
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

export default FileSummary;
