import cx from 'classnames';

// This extra wrapper is required to fulfill the "all blocks snap to 1440"
// on some of the blocks, the ones that are more pure, eg. the ones the view is
// super simple, and a single element (p or an h)... So it's required on slate
// blocks and heading
const ExtraAlignWrapper =
  (Component) =>
  ({ ...props }) => {
    const { data } = props;

    return (
      <div
        className={cx(`${data['@type']}`, {
          [data.align]: data.align,
          [data.styles?.align]: data.styles?.align,
        })}
      >
        <Component {...props} />
      </div>
    );
  };

export default ExtraAlignWrapper;
