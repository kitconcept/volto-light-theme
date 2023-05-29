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
  const BG_COLORS = [
    { name: 'transparent', label: 'Transparent' },
    { name: 'grey', label: 'Grey' },
  ];

  const colors =
    config.blocks?.blocksConfig?.[formData['@type']]?.colors || BG_COLORS;

  const defaultBGColor =
    config.blocks?.blocksConfig?.[formData['@type']]?.defaultBGColor;

  addStyling({ schema, intl });

  schema.properties.styles.schema.fieldsets[0].fields = ['backgroundColor'];
  schema.properties.styles.schema.properties.backgroundColor = {
    widget: 'color_picker',
    title: intl.formatMessage(messages.backgroundColor),
    colors,
    default: defaultBGColor,
  };
  return schema;
};
