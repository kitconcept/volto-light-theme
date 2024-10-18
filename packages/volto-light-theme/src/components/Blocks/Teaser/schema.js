export const teaserSchemaEnhancer = ({ schema, formData, intl }) => {
  schema.properties.href.selectedItemAttrs.push('getRemoteUrl');

  schema.properties.styles.schema.fieldsets[0].fields = [
    ...schema.properties.styles.schema.fieldsets[0].fields,
    '--image-aspect-ratio',
  ];

  schema.properties.styles.schema.properties['--image-aspect-ratio'] = {
    widget: 'select',
    title: 'Aspect Ratio',
    choices: [
      ['1', '1:1'],
      ['16 / 9', '16/9'],
    ],
    default: '16 / 9',
  };

  return schema;
};

// Not sure why, but it was in the new one, check with blockModel3
// export const gridTeaserDisableStylingSchema = ({ schema, formData, intl }) => {
//   schema.fieldsets = schema.fieldsets.filter((item) => item.id !== 'styling');
//   return schema;
// };
export const gridTeaserDisableStylingSchema = ({ schema, formData, intl }) => {
  // Remove all the existing fields from the default schema
  schema.properties.styles.schema.fieldsets[0].fields = [];
  return schema;
};
