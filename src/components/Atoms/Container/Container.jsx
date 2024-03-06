import PropTypes from 'prop-types';
import { getElementType } from '../helpers';
import cx from 'classnames';

const Container = (props) => {
  const { children, className, layout, narrow, ...rest } = props;
  const classes = cx('a', 'container', className, { layout, narrow });

  const Component = getElementType(Container, props);
  // eslint-disable-next-line no-console
  console.warning(
    'The Container component in: @kitconcept/volto-light-theme/src/components/Atoms/Container/Container.jsx is deprecated, and it will be removed in the next major release of this package. Please use the one in @plone/components instead.',
  );
  return (
    <Component {...rest} className={classes}>
      {children}
    </Component>
  );
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
