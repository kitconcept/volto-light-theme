export const teaserSchemaEnhancer = ({ schema, formData, intl }) => {
  schema.properties.href.selectedItemAttrs.push('getRemoteUrl');

  return schema;
};
