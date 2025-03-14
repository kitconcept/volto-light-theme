export const searchBlockSchemaEnhancer = ({ schema, formData, intl }) => {
  schema.properties.showSortOn.default = true;
  schema.fieldsets = schema.fieldsets.filter((item) => item.id !== 'views');

  return schema;
};
