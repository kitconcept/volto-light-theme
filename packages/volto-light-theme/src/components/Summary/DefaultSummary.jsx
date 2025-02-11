const DefaultSummary = (props) => {
  const { item, HeadingTag = 'h3' } = props;
  return (
    <>
      {item?.head_title && <div className="headline">{item.head_title}</div>}
      <HeadingTag className="title">
        {item.title ? item.title : item.id}
      </HeadingTag>
      {!item.hide_description && (
        <p className="description">{item.description}</p>
      )}
    </>
  );
};

export default DefaultSummary;
