export const TeaserStylingSchema = ({ schema, formData, intl }) => {
  schema.properties.align.widget = 'inner_align';
  schema.properties.align.default = 'left';
  schema.properties.align.actions = ['left', 'right', 'center'];
  return schema;
};

// export const teaserSchemaEnhancer = ({ schema, formData, intl }) => {
//   if (formData.href?.[0]?.['@type'] === 'News Item') {
//     // remove head_title
//     schema.fieldsets[0].fields = [
//       'href',
//       'title',
//       'description',
//       'preview_image',
//     ];
//   }
//   return schema;
// };
