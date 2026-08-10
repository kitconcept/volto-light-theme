import { defaultStylingSchema } from '../schema';

export const BannerStylingSchema = ({ schema, formData, intl }) => {
  defaultStylingSchema({ schema, formData, intl });
  const styleProps = schema.properties.styles?.schema?.properties;

  if (styleProps?.['blockWidth:noprefix']) {
    delete styleProps['blockWidth:noprefix'].filterActions;
    styleProps['blockWidth:noprefix'].actions = ['layout', 'full'];
  }

  return schema;
};
