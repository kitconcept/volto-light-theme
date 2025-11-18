type CaptionProps = {
  as?: keyof JSX.IntrinsicElements;
  title?: string;
  description?: string;
  credit?: string;
};

/**
 * Image/video caption component class.
 * @function Caption
 * @params {string} as HTML tag used to wrap the caption.
 * @params {string} title Image title.
 * @params {string} description Image description.
 * @params {object} credit Credit text.
 * @returns {string} Markup of the component.
 */
const Caption = ({
  as: Tag = 'figcaption',
  title,
  description,
  credit,
}: CaptionProps) => {
  return (
    <Tag>
      {title && <strong className="title">{title}</strong>}
      {description && (
        <div className="description">
          {description.split('\n').map((line, index) => (
            <p key={index}>{line || '\u00A0'}</p>
          ))}
        </div>
      )}
      {credit && <p className="credits">{credit}</p>}
    </Tag>
  );
};

export default Caption;
