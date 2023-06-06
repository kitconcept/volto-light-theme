import { defineMessages } from 'react-intl';
import { defaultStylingSchema } from '../schema';

const messages = defineMessages({
  Align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
});

export const ButtonStylingSchema = ({ schema, formData, intl }) => {
  defaultStylingSchema({ schema, formData, intl });

  schema.properties.styles.schema.fieldsets[0].fields = [
    'buttonAlign',
    ...schema.properties.styles.schema.fieldsets[0].fields,
  ];

  schema.properties.styles.schema.properties.buttonAlign = {
    widget: 'align',
    title: intl.formatMessage(messages.Align),
    actions: ['center', 'wide'],
  };

  return schema;
};
