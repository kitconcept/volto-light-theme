import PropTypes from 'prop-types';
import { getElementType } from '../helpers';
import cx from 'classnames';

const Container = (props) => {
  const { children, className, layout, narrow } = props;
  const classes = cx('a', 'container', className, { layout, narrow });

  const Component = getElementType(Container, props);
  return <Component className={classes}>{children}</Component>;
};

Container.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,
};

export default Container;
