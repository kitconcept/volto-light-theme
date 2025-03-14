import FileType from '@kitconcept/volto-light-theme/helpers/Filetype';

const FileSummary = (props) => {
  const { item, HeadingTag = 'h3' } = props;

  const headline = [item.getObjSize, FileType(item.mime_type), item.head_title]
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

export default FileSummary;
