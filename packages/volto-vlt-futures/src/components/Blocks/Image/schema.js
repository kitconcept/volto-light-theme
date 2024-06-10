import { defineMessages } from 'react-intl';
import { reorderArray } from '@plone/volto/helpers';

const messages = defineMessages({
  BlockWidth: {
    id: 'Block Width',
    defaultMessage: 'Block Width',
  },
});

export const imageBlockSchemaEnhancer = ({ formData, schema, intl }) => {
  if (formData.url) {
    schema.fieldsets = reorderArray(schema.fieldsets, 2, 1);

    schema.properties.styles.schema.fieldsets[0].fields = [
      'blockWidth:noprefix',
      '--image-aspect-ratio',
      ...schema.properties.styles.schema.fieldsets[0].fields,
    ];

    schema.properties.styles.schema.properties['--image-aspect-ratio'] = {
      widget: 'select',
      title: 'Aspect Ratio',
      choices: [
        ['1', '1:1'],
        ['16 / 9', '16/9'],
      ],
      default: '1',
    };
    schema.properties.align.actions = ['left', 'right', 'center'];

    schema.properties.styles.schema.properties['blockWidth:noprefix'] = {
      widget: 'blockWidth',
      title: intl.formatMessage(messages.BlockWidth),
      default: 'default',
      filterActions: ['narrow', 'default', 'layout', 'full'],
    };
  }
  return schema;
};
