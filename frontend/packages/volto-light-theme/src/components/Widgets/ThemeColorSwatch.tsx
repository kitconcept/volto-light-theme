import ColorSwatchWidget from './ColorSwatch';
import config from '@plone/volto/registry';
import type { ColorSwatchProps } from './ColorSwatch';

const ThemeColorSwatch = (
  props: Omit<ColorSwatchProps, 'themes' | 'colors'>,
) => {
  const themes: ColorSwatchProps['themes'] = config.blocks.themes;

  return <ColorSwatchWidget {...props} themes={themes} />;
};

export default ThemeColorSwatch;
