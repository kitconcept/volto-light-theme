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
  const themes =
    config.blocks?.blocksConfig?.[formData['@type']]?.themes ||
    config.blocks.blocksThemes;

  const defaultBGColor =
    config.blocks?.blocksConfig?.[formData['@type']]?.defaultBGColor ||
    // The default color is the first color in the themes list
    config.blocks.blocksThemes?.[0].name;

  addStyling({ schema, intl });

  schema.fieldsets[0].fields = [...schema.fieldsets[0].fields, 'theme'];
  schema.properties.theme = {
    widget: 'color_picker',
    title: intl.formatMessage(messages.backgroundColor),
    themes,
    // default: formData?.styles?.['backgroundColor:noprefix'] ?? defaultBGColor,
    default: defaultBGColor,
  };

  return schema;
};

export const removeStylingSchema = ({ schema, formData, intl }) => {
  schema.fieldsets = schema.fieldsets.filter((item) => item.id !== 'styling');
  return schema;
};
