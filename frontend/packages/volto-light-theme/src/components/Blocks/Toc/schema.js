export const tocBlockSchemaEnhancer = ({ formData, schema, intl }) => {
  schema.fieldsets[0].fields = ['title'];
  schema.properties.levels.choices = [
    ['h2', 'h2'],
    ['h3', 'h3'],
  ];
  schema.properties.levels.default = ['h2', 'h3'];
  return schema;
};
