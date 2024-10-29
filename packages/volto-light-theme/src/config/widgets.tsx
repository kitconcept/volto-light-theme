import type { ConfigType } from '@plone/registry';
import ColorPicker from '../components/Widgets/ColorPickerWidget';

declare module '@plone/types' {
  export interface WidgetsConfigByWidget {
    color: typeof ColorPicker;
  }
}

export default function install(config: ConfigType) {
  config.widgets.widget.color = ColorPicker;

  return config;
}
