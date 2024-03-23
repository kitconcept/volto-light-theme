export const teaserSchemaEnhancer = ({ schema, formData, intl }) => {
  schema.properties.href.selectedItemAttrs.push('getRemoteUrl');

  return schema;
};

export const gridTeaserDisableStylingSchema = ({ schema, formData, intl }) => {
  schema.fieldsets = schema.fieldsets.filter((item) => item.id !== 'styling');
  return schema;
};
