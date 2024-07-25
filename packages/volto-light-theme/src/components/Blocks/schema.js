import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  backgroundColor: {
    id: 'Background color',
    defaultMessage: 'Background color',
  },
});

export const defaultStylingSchema = ({ schema, formData, intl }) => {
  addStyling({ schema, intl });

  if (config.settings.backgroundColors) {
    const colors =
      config.blocks?.blocksConfig?.[formData['@type']]?.colors ||
      config.settings.backgroundColors;

    const defaultBGColor =
      config.blocks?.blocksConfig?.[formData['@type']]?.defaultBGColor ||
      config.settings?.backgroundColors?.[0].style;

    schema.properties.styles.schema.fieldsets[0].fields = [
      'backgroundColor:noprefix',
      ...schema.properties.styles.schema.fieldsets[0].fields,
    ];
    schema.properties.styles.schema.properties['backgroundColor:noprefix'] = {
      widget: 'color_picker',
      title: intl.formatMessage(messages.backgroundColor),
      colors,
      default: formData?.styles?.['backgroundColor:noprefix'] ?? defaultBGColor,
    };
  }

  return schema;
};

export const removeStylingSchema = ({ schema, formData, intl }) => {
  schema.fieldsets = schema.fieldsets.filter((item) => item.id !== 'styling');
  return schema;
};
