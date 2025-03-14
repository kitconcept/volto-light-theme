import { defineMessages } from 'react-intl';
import { defaultStylingSchema } from '../schema';

const messages = defineMessages({
  BlockWidth: {
    id: 'Block Width',
    defaultMessage: 'Block Width',
  },
  Alignment: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  shortline: {
    id: 'Short line',
    defaultMessage: 'Short line',
  },
});

export const SeparatorStylingSchema = ({ schema, formData, intl }) => {
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

  schema.properties.styles.schema.fieldsets[0].fields = [
    'align:noprefix',
    ...schema.properties.styles.schema.fieldsets[0].fields,
  ];

  schema.properties.styles.schema.properties['align:noprefix'] = {
    widget: 'blockAlignment',
    title: intl.formatMessage(messages.Alignment),
    default: 'left',
  };

  schema.properties.styles.schema.fieldsets[0].fields = [
    'shortLine',
    ...schema.properties.styles.schema.fieldsets[0].fields,
  ];

  schema.properties.styles.schema.properties.shortLine = {
    title: intl.formatMessage(messages.shortline),
    type: 'boolean',
  };

  schema.properties.styles.schema.properties['align:noprefix'].disabled =
    !formData?.styles?.shortLine;

  return schema;
};
