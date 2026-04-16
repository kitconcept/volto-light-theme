import config from '@plone/volto/registry';
import { defineMessages } from 'react-intl';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const messages = defineMessages({
  BlockWidth: {
    id: 'Block Width',
    defaultMessage: 'Block Width',
  },
  Alignment: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
});
export const mapsBlockSchemaEnhancer = ({ formData, schema, intl }) => {
  addStyling({ schema, intl });

  schema.fieldsets[0].fields = schema.fieldsets[0].fields.filter(
    (f) => f !== 'align',
  );

  const alignStyle = formData.styles?.['align:noprefix']?.['--block-alignment'];
  const isFloating =
    alignStyle === 'var(--align-left)' || alignStyle === 'var(--align-right)';

  schema.properties.styles.schema.fieldsets[0].fields = [
    'align:noprefix',
    'blockWidth:noprefix',
    ...schema.properties.styles.schema.fieldsets[0].fields,
  ];
  schema.properties.styles.schema.properties['align:noprefix'] = {
    widget: 'blockAlignment',
    title: intl.formatMessage(messages.Alignment),
    default: 'center',
  };
  schema.properties.styles.schema.properties['blockWidth:noprefix'] = {
    widget: 'blockWidth',
    title: intl.formatMessage(messages.BlockWidth),
    default: 'default',
    filterActions: ['narrow', 'default', 'layout', 'full'],
    actions: config.blocks.widths,
  };
  schema.properties.styles.schema.properties['blockWidth:noprefix'].disabled =
    isFloating;
  return schema;
};
