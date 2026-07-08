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
  Alignment: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  size: {
    id: 'Image size',
    defaultMessage: 'Image size',
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
    schema.fieldsets[0].fields = schema.fieldsets[0].fields.filter(
      (f) => f !== 'align' && f !== 'size',
    );
    delete schema.properties.size;

    const align = formData.styles?.['align:noprefix'];
    const isFloating = align === 'left' || align === 'right';

    schema.properties.styles.schema.fieldsets[0].fields = [
      'blockWidth:noprefix',
      'align:noprefix',
      'size:noprefix',
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

    schema.properties.styles.schema.properties['size:noprefix'] = {
      widget: 'image_size',
      title: intl.formatMessage(messages.size),
      default: 'l',
    };

    schema.properties.styles.schema.properties['blockWidth:noprefix'].disabled =
      isFloating;
    schema.properties.styles.schema.properties['size:noprefix'].disabled =
      !isFloating;

    // Show the `styling` fieldset after `default`.
    const stylingIndex = schema.fieldsets.findIndex((f) => f.id === 'styling');
    if (stylingIndex > -1) {
      const [styling] = schema.fieldsets.splice(stylingIndex, 1);
      schema.fieldsets.splice(1, 0, styling);
    }
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
