import type { ConfigType } from '@plone/registry';
import BackgroundColorWidget from '../components/Widgets/BackgroundColorWidget';
import BlockWidthWidget from '../components/Widgets/BlockWidthWidget';
import BlockAlignmentWidget from '../components/Widgets/BlockAlignmentWidget';
import ColorPickerWidget from '../components/Widgets/ColorPickerWidget';
import FooterLogosWidget from '../components/Widgets/FooterLogosWidget';
import FooterLinksWidget from '../components/Widgets/FooterLinksWidget';
import SizeWidget from '../components/Widgets/SizeWidget';
import ThemeColorPicker from '../components/Widgets/ThemeColorPicker';
import { JSONSchemaField } from '../components/Widgets/FooterLinksWidget';

declare module '@plone/types' {
  export interface WidgetsConfigByWidget {
    BackgroundColorWidget: React.ComponentType<any>;
    blockWidth: React.ComponentType<any>;
    blockAlignment: React.ComponentType<any>;
    themeColorPicker: typeof ThemeColorPicker;
    footerLogos: typeof FooterLogosWidget;
    footerLinks: typeof FooterLinksWidget;
    sizeWidget: React.ComponentType<any>;
  }
}

export default function install(config: ConfigType) {
  config.widgets.widget.BackgroundColorWidget = BackgroundColorWidget;
  config.widgets.widget.blockWidth = BlockWidthWidget;
  config.widgets.widget.blockAlignment = BlockAlignmentWidget;
  config.widgets.widget.color_picker = ColorPickerWidget;
  config.widgets.widget.themeColorPicker = ThemeColorPicker;
  config.widgets.widget.footerLogos = FooterLogosWidget;
  config.widgets.widget.footerLinks = FooterLinksWidget;
  config.widgets.widget.sizeWidget = SizeWidget;

  config.registerUtility({
    name: 'footer_links',
    type: 'schema',
    dependencies: { fieldName: 'footer_links' },
    method: JSONSchemaField,
  });

  return config;
}
