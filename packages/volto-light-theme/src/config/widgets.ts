import type { ConfigType } from '@plone/registry';
import BackgroundColorWidget from '../components/Widgets/BackgroundColorWidget';
import BlockWidthWidget from '../components/Widgets/BlockWidthWidget';
import BlockAlignmentWidget from '../components/Widgets/BlockAlignmentWidget';
import ColorPickerWidget from '../components/Widgets/ColorPickerWidget';
import FooterLogosWidget from '../components/Widgets/FooterLogosWidget';
import FooterLinksWidget from '../components/Widgets/FooterLinksWidget';
import SizeWidget from '../components/Widgets/SizeWidget';
import ThemeColorPicker from '../components/Widgets/ThemeColorPicker';
import BlocksObjectWidget from '../components/Widgets/BlocksObjectWidget';
import { headerActionsSchema } from '../components/Widgets/schema/headerActionsSchema';
import { footerLogosSchema } from '../components/Widgets/schema/footerLogosSchema';
import { footerLinksSchema } from '../components/Widgets/schema/footerLinksSchema';

declare module '@plone/types' {
  export interface WidgetsConfigByWidget {
    BackgroundColorWidget: React.ComponentType<any>;
    blockWidth: React.ComponentType<any>;
    blockAlignment: React.ComponentType<any>;
    sizeWidget: React.ComponentType<any>;
    themeColorPicker: typeof ThemeColorPicker;
    blocksObjectWidget: typeof BlocksObjectWidget;
  }
}

export default function install(config: ConfigType) {
  // Color picker widget override
  config.widgets.widget.color_picker = ColorPickerWidget;

  config.widgets.widget.BackgroundColorWidget = BackgroundColorWidget;
  config.widgets.widget.blockWidth = BlockWidthWidget;
  config.widgets.widget.blockAlignment = BlockAlignmentWidget;
  config.widgets.widget.sizeWidget = SizeWidget;
  config.widgets.widget.themeColorPicker = ThemeColorPicker;
  config.widgets.widget.blocksObjectWidget = BlocksObjectWidget;

  config.registerUtility({
    name: 'headerActions',
    type: 'schema',
    method: headerActionsSchema,
  });

  config.registerUtility({
    name: 'footerLogos',
    type: 'schema',
    method: footerLogosSchema,
  });

  config.registerUtility({
    name: 'footerLinks',
    type: 'schema',
    method: footerLinksSchema,
  });

  return config;
}
