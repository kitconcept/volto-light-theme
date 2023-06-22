import { defineMessages } from 'react-intl';

const messages = defineMessages({
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
});

export function AccordionSchemaEnhancer({ schema, formData, intl }) {
  schema.required = [];
  schema.fieldsets = schema.fieldsets.filter((item) => item.id !== 'options');
  schema.properties.right_arrows.default = true;
  schema.properties.collapsed.default = false;
  schema.properties.non_exclusive.default = false;
  schema.fieldsets[0].fields = ['headline', ...schema.fieldsets[0].fields];
  schema.properties.headline = {
    title: intl.formatMessage(messages.headline),
  };
  return schema;
}
