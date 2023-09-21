import { defineMessages } from 'react-intl';
import { defaultStylingSchema } from '../schema';

const messages = defineMessages({
  flagAlign: {
    id: 'Flag align',
    defaultMessage: 'Flag align',
  },
  buttonText: {
    id: 'Button text',
    defaultMessage: 'Button text',
  },
  hideButton: {
    id: 'Hide Button',
    defaultMessage: 'Hide Button',
  },
});

export const sliderBlockSchemaEnhancer = ({ formData, schema, intl }) => {
  defaultStylingSchema({ schema, formData, intl });

  schema.properties.slides.schema.fieldsets[0].fields.push('buttonText');
  schema.properties.slides.schema.properties.buttonText = {
    title: intl.formatMessage(messages.buttonText),
  };
  schema.properties.slides.schema.fieldsets[0].fields.push('hideButton');
  schema.properties.slides.schema.properties.hideButton = {
    title: intl.formatMessage(messages.hideButton),
    type: 'boolean',
  };

  schema.properties.slides.schema.fieldsets[0].fields.push('flagAlign');
  schema.properties.slides.schema.properties.flagAlign = {
    widget: 'inner_align',
    title: intl.formatMessage(messages.flagAlign),
    actions: ['left', 'right'],
    default: 'left',
  };

  return schema;
};
