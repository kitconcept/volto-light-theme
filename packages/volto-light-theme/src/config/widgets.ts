import type { ConfigType } from '@plone/registry';

import BackgroundColorWidget from '../components/Widgets/BackgroundColorWidget';
import BlockWidthWidget from '../components/Widgets/BlockWidthWidget';
import BlockAlignmentWidget from '../components/Widgets/BlockAlignmentWidget';
import ColorPickerWidget from '../components/Widgets/ColorPickerWidget';

declare module '@plone/types' {
  export interface WidgetsConfigByWidget {
    BackgroundColorWidget: React.ComponentType<any>;
    blockWidth: React.ComponentType<any>;
    blockAlignment: React.ComponentType<any>;
  }
}

export default function install(config: ConfigType) {
  config.widgets.widget.BackgroundColorWidget = BackgroundColorWidget;
  config.widgets.widget.blockWidth = BlockWidthWidget;
  config.widgets.widget.blockAlignment = BlockAlignmentWidget;
  config.widgets.widget.color_picker = ColorPickerWidget;

  return config;
}
