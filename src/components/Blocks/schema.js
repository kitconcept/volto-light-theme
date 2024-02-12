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
  // TODO: remove and use the config.settings.backgroundColors as default below too
  const BG_COLORS = [
    { name: 'transparent', label: 'Transparent' },
    { name: 'grey', label: 'Grey' },
  ];

  const colors =
    config.blocks?.blocksConfig?.[formData['@type']]?.colors || BG_COLORS;

  const defaultBGColor =
    config.blocks?.blocksConfig?.[formData['@type']]?.defaultBGColor;

  addStyling({ schema, intl });

  schema.properties.styles.schema.fieldsets[0].fields = [
    ...schema.properties.styles.schema.fieldsets[0].fields,
    'backgroundColor:noprefix',
  ];
  schema.properties.styles.schema.properties['backgroundColor:noprefix'] = {
    widget: 'color_picker',
    title: intl.formatMessage(messages.backgroundColor),
    colors,
    default: defaultBGColor,
  };

  return schema;
};

export const removeStylingSchema = ({ schema, formData, intl }) => {
  schema.fieldsets = schema.fieldsets.filter((item) => item.id !== 'styling');
  return schema;
};
