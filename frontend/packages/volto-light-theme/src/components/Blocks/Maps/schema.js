export const mapsBlockSchemaEnhancer = ({ formData, schema, intl }) => {
  schema.properties.align.default = 'wide';
  schema.properties.align.actions = ['left', 'right', 'center', 'wide', 'full'];
  return schema;
};
