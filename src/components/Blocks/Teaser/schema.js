import { defineMessages } from 'react-intl';
import { defaultStylingSchema } from '../schema';

const messages = defineMessages({
  modifiedHeadTitle: {
    id: 'Date / Time',
    defaultMessage: 'Date / Time',
  },
  align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
});

export const teaserSchemaEnhancer = ({ schema, formData, intl }) => {
  schema.properties.href.selectedItemAttrs.push('getRemoteUrl');
  if (formData.href?.[0]?.['@type'] === 'News Item') {
    // remove head_title
    schema.fieldsets[0].fields = [
      'href',
      'title',
      'description',
      'preview_image',
    ];
  }
  schema.properties.head_title.title = intl.formatMessage(
    messages.modifiedHeadTitle,
  );

  defaultStylingSchema({ schema, formData, intl });

  schema.properties.styles.schema.fieldsets[0].fields = [
    'align',
    'backgroundColor',
  ];

  schema.properties.styles.schema.properties.align = {
    widget: 'align',
    title: intl.formatMessage(messages.align),
    actions: ['left', 'right', 'center'],
    default: 'left',
  };

  return schema;
};

export const gridTeaserDisableStylingSchema = ({ schema, formData, intl }) => {
  schema.fieldsets = schema.fieldsets.filter((item) => item.id !== 'styling');
  return schema;
};
