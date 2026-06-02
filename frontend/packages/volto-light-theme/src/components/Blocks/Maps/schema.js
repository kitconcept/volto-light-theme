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

  const align = formData.styles?.['align:noprefix'];
  const isFloating = align === 'left' || align === 'right';

  schema.properties.styles.schema.fieldsets[0].fields = [
    'align:noprefix',
    'blockWidth:noprefix',
    ...schema.properties.styles.schema.fieldsets[0].fields,
  ];
  schema.properties.styles.schema.properties['align:noprefix'] = {
    widget: 'blockAlignment',
    title: intl.formatMessage(messages.Alignment),
    default: 'center',
    actions: config.blocks.alignments.map((alignment) => alignment.name),
  };
  schema.properties.styles.schema.properties['blockWidth:noprefix'] = {
    widget: 'blockWidth',
    title: intl.formatMessage(messages.BlockWidth),
    default: 'default',
    actions: config.blocks.widths.map((width) => width.name),
  };
  schema.properties.styles.schema.properties['blockWidth:noprefix'].disabled =
    isFloating;
  return schema;
};
