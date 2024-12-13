export const teaserSchemaEnhancer = ({ schema, formData, intl }) => {
  schema.properties.href.selectedItemAttrs.push('getRemoteUrl');

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

export const gridTeaserDisableAlignHandlersSchema = ({
  schema,
  formData,
  intl,
}) => {
  schema.properties.styles.schema.fieldsets[0].fields =
    schema.properties.styles.schema.fieldsets[0].fields.filter(
      (item) => !['align'].includes(item),
    );
  return schema;
};
