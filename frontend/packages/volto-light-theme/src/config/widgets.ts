import type { ConfigType } from '@plone/registry';
import BlockWidth from '../components/Widgets/BlockWidth';
import BlockAlignment from '../components/Widgets/BlockAlignment';
import ColorSwatch from '../components/Widgets/ColorSwatch';
import Size from '../components/Widgets/Size';
import ColorPicker from '../components/Widgets/ColorPicker';
import ThemeColorSwatch from '../components/Widgets/ThemeColorSwatch';
import BlocksObject from '../components/Widgets/BlocksObject';
import ObjectList from '../components/Widgets/ObjectList';
import { headerActionsSchema } from '../components/Widgets/schema/headerActionsSchema';
import { footerLogosSchema } from '../components/Widgets/schema/footerLogosSchema';
import { footerLinksSchema } from '../components/Widgets/schema/footerLinksSchema';
import { iconLinkListSchema } from '../components/Widgets/schema/iconLinkListSchema';

declare module '@plone/types' {
  export interface WidgetsConfigById {
    preview_image_link: React.ComponentType;
  }

  export interface WidgetsConfigByWidget {
    themeColorSwatch: typeof ColorSwatch;
    blockWidth: typeof BlockWidth;
    blockAlignment: typeof BlockAlignment;
    size: typeof Size;
    colorPicker: typeof ColorPicker;
    blocksObject: typeof BlocksObject;
    image: React.ComponentType;
  }
}

export default function install(config: ConfigType) {
  // Color picker widget override - use our own non-semanticUI widget
  // This is the widget that given an array of colors, you can choose one of them
  // `color_picker` is a terrible name for this widget, it should be `colorSwatch`
  // ToDo: Rename it in Volto 19
  config.widgets.widget.color_picker = ColorSwatch;

  // ObjectList widget override - use our own non-semanticUI widget
  // it uses also dnd-kit for drag and drop
  config.widgets.widget.object_list = ObjectList;

  config.widgets.widget.blockWidth = BlockWidth;
  config.widgets.widget.blockAlignment = BlockAlignment;
  config.widgets.widget.colorPicker = ColorPicker;
  config.widgets.widget.size = Size;
  config.widgets.widget.themeColorSwatch = ThemeColorSwatch;

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

  config.registerUtility({
    name: 'iconLinkList',
    type: 'schema',
    method: iconLinkListSchema,
  });

  return config;
}
