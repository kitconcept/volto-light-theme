import { defineMessages } from 'react-intl';

const messages = defineMessages({
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
});

export function AccordionSchemaEnhancer({ schema, formData, intl }) {
  // Opinionated removal of the options fieldset
  schema.fieldsets = schema.fieldsets.filter((item) => item.id !== 'options');

  // Some other opinionated defaults
  schema.required = [];
  schema.properties.right_arrows.default = true;
  schema.properties.collapsed.default = false;
  schema.properties.non_exclusive.default = false;

  // Add headline - TODO: Remove when https://github.com/eea/volto-accordion-block/pull/71
  // is merged
  schema.fieldsets[0].fields = ['headline', ...schema.fieldsets[0].fields];
  schema.properties.headline = {
    title: intl.formatMessage(messages.headline),
  };

  return schema;
}
