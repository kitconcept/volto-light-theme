import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container as SemanticContainer } from 'semantic-ui-react';
import config from '@plone/registry';

const Tags = ({ content }) => {
  const tags = content?.subjects || [];
  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;

  if (!config.settings.showTags || !tags.length) return null;

  return (
    <Container className="default tags">
      {tags.map((tag) => (
        <Link className="ui label" to={`/search?Subject=${tag}`} key={tag}>
          {tag}
        </Link>
      ))}
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Tags.propTypes = {
  content: PropTypes.shape({
    subjects: PropTypes.arrayOf(PropTypes.string),
  }),
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Tags.defaultProps = {
  content: {
    subjects: [],
  },
};

export default Tags;
