const NewsItemSummary = (props) => {
  const { item, HeadingTag = 'h3' } = props;
  const formatter = new Intl.DateTimeFormat(item.Language || 'default', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let kicker = [
    item.EffectiveDate !== 'None' && item.effective && (
      <span className="day" key="day" suppressHydrationWarning>
        {formatter.format(new Date(item.effective))}
      </span>
    ),
    item.head_title,
  ].filter((x) => x);
  if (kicker.length > 1) {
    kicker = kicker.reduce((prev, curr) => [prev, ' | ', curr]);
  }

  return (
    <>
      {kicker.length ? <div className="headline">{kicker}</div> : null}
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
