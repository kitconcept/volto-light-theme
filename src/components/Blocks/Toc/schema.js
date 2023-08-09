import { defineMessages } from 'react-intl';

const messages = defineMessages({
  toc: {
    id: 'toc',
    defaultMessage: 'Table of Contents',
  },
  Title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
});

export const tocBlockSchemaEnhancer = ({ formData, schema, intl }) => {
  schema.fieldsets[0].fields = ['title'];
  schema.properties.levels.choices = [
    ['h2', 'h2'],
    ['h3', 'h3'],
  ];
  schema.properties.levels.default = ['h2', 'h3'];

  // can be removed after https://github.com/plone/volto/pull/5073 is released
  schema.title = intl.formatMessage(messages.toc);
  schema.properties.title.title = intl.formatMessage(messages.Title);

  return schema;
};
