import { defaultStylingSchema } from '../schema';

export const sliderBlockSchemaEnhancer = ({ formData, schema, intl }) => {
  defaultStylingSchema({ schema, formData, intl });

  // Override flagAlign widget to inner_align
  // ToDo: Remove when backported to Volto 19
  schema.properties.slides.schema.properties.flagAlign.widget = 'inner_align';

  return schema;
};
