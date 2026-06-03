import { defaultStylingSchema } from '../schema';
import config from '@plone/volto/registry';

export const ButtonStylingSchema = ({ schema, formData, intl }) => {
  defaultStylingSchema({ schema, formData, intl });
  const styleProps = schema.properties.styles?.schema?.properties;
  if (styleProps?.['align:noprefix']) {
    delete styleProps['align:noprefix'].filterActions;
    styleProps['align:noprefix'].actions = config.blocks.alignments.map(
      (alignment) => alignment.name,
    );
  }
  if (styleProps?.['blockWidth:noprefix']) {
    delete styleProps['blockWidth:noprefix'].filterActions;
    styleProps['blockWidth:noprefix'].actions = ['narrow', 'default'];
  }

  return schema;
};
