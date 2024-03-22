import { defineMessages } from 'react-intl';
import { insertInArray } from '@plone/volto/helpers/Utils/Utils';

const messages = defineMessages({
  Description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  Title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
});

export const imageBlockSchemaEnhancer = ({ formData, schema, intl }) => {
  if (formData.url) {
    schema.fieldsets[0].fields = insertInArray(
      schema.fieldsets[0].fields,
      'description',
      1,
    );
    schema.fieldsets[0].fields = insertInArray(
      schema.fieldsets[0].fields,
      'title',
      1,
    );
    schema.properties.description = {
      title: intl.formatMessage(messages.Description),
      widget: 'textarea',
    };
    schema.properties.title = {
      title: intl.formatMessage(messages.Title),
    };
  }
  schema.properties.align.default = 'center';
  schema.properties.align.actions = ['left', 'right', 'center', 'wide', 'full'];
  schema.properties.size.default = 'l';
  schema.properties.size.disabled =
    formData.align === 'full' ||
    formData.align === 'wide' ||
    formData.align === 'center';

  return schema;
};
