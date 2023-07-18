import { defineMessages } from 'react-intl';
import { defaultStylingSchema } from '../schema';

const messages = defineMessages({
  BlockWidth: {
    id: 'Block Width',
    defaultMessage: 'Block Width',
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
    title: intl.formatMessage(messages.BlockWidth),
    actions: ['center', 'wide'],
  };

  schema.properties.inneralign.actions = ['left', 'center', 'right'];

  return schema;
};
