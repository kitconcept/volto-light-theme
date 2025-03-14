import ColorSwatchWidget from './ColorSwatch';
import config from '@plone/volto/registry';
import type { ColorSwatchProps } from './ColorSwatch';

const ThemeColorSwatch = (props: ColorSwatchProps) => {
  const colors: ColorSwatchProps['colors'] = config.blocks.themes;

  const defaultValue = colors.find(
    (color) => color.name === config.settings.defaultBackgroundColor,
  )?.style;

  return (
    <ColorSwatchWidget {...props} default={defaultValue} colors={colors} />
  );
};

export default ThemeColorSwatch;
