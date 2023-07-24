export const tocBlockSchemaEnhancer = ({ formData, schema, intl }) => {
  schema.properties.levels.choices = [
    ['h2', 'h2'],
    ['h3', 'h3'],
  ];
  return schema;
};
