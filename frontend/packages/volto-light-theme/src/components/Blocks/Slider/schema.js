import { defaultStylingSchema } from '../schema';

export const sliderBlockSchemaEnhancer = ({ formData, schema, intl }) => {
  defaultStylingSchema({ schema, formData, intl });

  return schema;
};
