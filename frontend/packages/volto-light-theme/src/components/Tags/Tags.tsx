import React from 'react';
import { Link } from 'react-router-dom';
import { Container as SemanticContainer } from 'semantic-ui-react';
import config from '@plone/registry';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/useLiveData';
import type { Content } from '@plone/types';

type TagsProps = {
  content?: Content;
};

const Tags: React.FC<TagsProps> = ({ content }) => {
  const safeContent = content ?? ({ subjects: [] } as Content);
  const tags = useLiveData<string[]>(safeContent, undefined, 'subjects') || [];
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

export default Tags;
