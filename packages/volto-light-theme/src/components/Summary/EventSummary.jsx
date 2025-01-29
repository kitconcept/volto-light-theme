const EventSummary = (props) => {
  const { item, HeadingTag = 'h3' } = props;
  const formatter = new Intl.DateTimeFormat(item.Language || 'default', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let kicker = [
    item.start && item.end && (
      <span className="day" key="day" suppressHydrationWarning>
        {formatter.formatRange(new Date(item.start), new Date(item.end))}
      </span>
    ),
    item.head_title,
  ]
    .filter((x) => x)
    .flatMap((x) => [' | ', x])
    .slice(1);

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

export default EventSummary;
