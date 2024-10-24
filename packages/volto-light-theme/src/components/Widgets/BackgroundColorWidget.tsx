import ColorPickerWidget from '@plone/volto/components/manage/Widgets/ColorPickerWidget';
import config from '@plone/volto/registry';
import type { ColorPickerWidgetProps } from '@plone/volto/components/manage/Widgets/ColorPickerWidget';

const BackgroundColorWidget = (props: ColorPickerWidgetProps) => {
  const colors: ColorPickerWidgetProps['colors'] =
    config.settings.backgroundColors;

  const defaultValue = colors.find(
    (color) => color.name === config.settings.defaultBackgroundColor,
  )?.style;

  return (
    <ColorPickerWidget {...props} default={defaultValue} colors={colors} />
  );
};

export default BackgroundColorWidget;
