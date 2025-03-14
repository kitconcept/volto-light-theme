export const disableBgColorSchema = ({ schema }) => {
  const { backgroundColor, ...filteredSchemaProperties } =
    schema.properties.styles.schema.properties;
  schema.properties.styles.schema.properties = filteredSchemaProperties;

  schema.properties.styles.schema.fieldsets[0].fields =
    schema.properties.styles.schema.fieldsets[0].fields.filter(
      (item) => item !== 'backgroundColor',
    );

  return schema;
};
