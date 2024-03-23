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
    'blockWidth:noprefix',
    ...schema.properties.styles.schema.fieldsets[0].fields,
  ];

  schema.properties.styles.schema.properties['blockWidth:noprefix'] = {
    widget: 'blockWidth',
    title: intl.formatMessage(messages.BlockWidth),
    default: 'default',
    filterActions: ['narrow', 'default'],
  };

  schema.properties.inneralign.actions = ['left', 'center', 'right'];

  return schema;
};
