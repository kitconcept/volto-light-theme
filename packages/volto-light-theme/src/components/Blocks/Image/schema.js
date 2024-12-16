import { defineMessages } from 'react-intl';
import { insertInArray } from '@plone/volto/helpers/Utils/Utils';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import config from '@plone/volto/registry';

const messages = defineMessages({
  Description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  Title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  BlockWidth: {
    id: 'Block Width',
    defaultMessage: 'Block Width',
  },
});

export const imageBlockSchemaEnhancer = ({ formData, schema, intl }) => {
  if (formData.url) {
    schema.fieldsets[0].fields = insertInArray(
      schema.fieldsets[0].fields,
      'description',
      1,
    );
    schema.fieldsets[0].fields = insertInArray(
      schema.fieldsets[0].fields,
      'title',
      1,
    );

    schema.properties.description = {
      title: intl.formatMessage(messages.Description),
      widget: 'textarea',
    };
    schema.properties.title = {
      title: intl.formatMessage(messages.Title),
    };
  }

  return schema;
};

export const standAloneImageBlockSchemaEnhancer = ({
  formData,
  schema,
  intl,
}) => {
  if (formData.url) {
    schema.properties.align.default = 'center';
    schema.properties.align.actions = ['left', 'right', 'center'];

    schema.properties.size.default = 'l';
    schema.properties.size.disabled = formData.align === 'center';
    schema.properties.styles.schema.fieldsets[0].fields = [
      'blockWidth:noprefix',
      ...schema.properties.styles.schema.fieldsets[0].fields,
    ];

    schema.properties.styles.schema.properties['blockWidth:noprefix'] = {
      widget: 'blockWidth',
      title: intl.formatMessage(messages.BlockWidth),
      default: 'default',
      filterActions: ['narrow', 'default', 'layout', 'full'],
      actions: config.blocks.widths,
    };

    schema.properties.styles.schema.properties['blockWidth:noprefix'].disabled =
      formData.align === 'left' || formData.align === 'right';
  }

  return schema;
};

export function aspectRatioSchemaEnhancer({ schema, intl }) {
  addStyling({ schema, intl });

  schema.properties.styles.schema.fieldsets[0].fields = [
    ...schema.properties.styles.schema.fieldsets[0].fields,
    '--image-aspect-ratio',
  ];
  schema.properties.styles.schema.properties['--image-aspect-ratio'] = {
    widget: 'select',
    title: 'Aspect Ratio',
    choices: [
      ['16 / 9', '16/9'],
      ['1', '1:1'],
    ],
  };

  return schema;
}
