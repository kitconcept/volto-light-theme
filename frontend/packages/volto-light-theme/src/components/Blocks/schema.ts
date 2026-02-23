import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';
import type {
  BlocksFormData,
  JSONSchema,
  SchemaEnhancerArgs,
  StyleDefinition,
} from '@plone/types';

const messages = defineMessages({
  backgroundColor: {
    id: 'Background color',
    defaultMessage: 'Background color',
  },
});

const getThemes = (formData: BlocksFormData): StyleDefinition[] | undefined => {
  const blockConfig = config.blocks?.blocksConfig?.[formData['@type']];

  return blockConfig?.themes || config.blocks.themes;
};

const getDefaultTheme = (formData: BlocksFormData): string | undefined => {
  const blockConfig = config.blocks?.blocksConfig?.[formData['@type']];

  return (
    blockConfig?.defaultTheme || config.blocks.themes?.[0]?.name || undefined
  );
};

export const defaultStylingSchema = ({
  schema,
  formData,
  intl,
}: SchemaEnhancerArgs): JSONSchema => {
  const themes = getThemes(formData);
  const defaultTheme = getDefaultTheme(formData);

  addStyling({ schema, intl });

  const stylingIndex = schema.fieldsets.findIndex(
    (item) => item.id === 'styling',
  );

  if (stylingIndex === -1 || !schema.fieldsets[stylingIndex]) {
    return schema;
  }

  const stylingFieldset = schema.fieldsets[stylingIndex];

  stylingFieldset.fields = [...stylingFieldset.fields, 'theme'];

  schema.properties.theme = {
    widget: 'color_picker',
    title: intl.formatMessage(messages.backgroundColor),
    themes,
    default: defaultTheme,
  };

  return schema;
};

export const removeStylingSchema = ({
  schema,
}: Pick<SchemaEnhancerArgs, 'schema'>): JSONSchema => {
  schema.fieldsets = schema.fieldsets.filter((item) => item.id !== 'styling');
  return schema;
};
