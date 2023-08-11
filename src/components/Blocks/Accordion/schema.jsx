import { defineMessages } from 'react-intl';

const messages = defineMessages({
  addAccordion: {
    id: 'Add Accordion',
    defaultMessage: 'Add Accordion',
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
  schema.properties.data.schema.addMessage = intl.formatMessage(
    messages.addAccordion,
  );

  return schema;
}
