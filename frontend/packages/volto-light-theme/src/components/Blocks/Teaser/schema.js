export const teaserSchemaEnhancer = ({ schema, formData, intl }) => {
  schema.properties.href.selectedItemAttrs.push('getRemoteUrl');
  schema.properties.href.selectedItemAttrs.push('effective');
  schema.properties.href.selectedItemAttrs.push('start');
  schema.properties.href.selectedItemAttrs.push('end');
  schema.properties.href.selectedItemAttrs.push('description');
  schema.properties.href.selectedItemAttrs.push('contact_email');
  schema.properties.href.selectedItemAttrs.push('contact_phone');
  schema.properties.href.selectedItemAttrs.push('contact_room');

  return schema;
};

export const gridTeaserDisableStylingSchema = ({ schema, formData, intl }) => {
  schema.fieldsets = schema.fieldsets.filter((item) => item.id !== 'styling');
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
