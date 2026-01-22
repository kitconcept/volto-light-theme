import type { ConfigType } from '@plone/registry';
import ColorSwatch from '../components/Widgets/ColorSwatch';
import ColorPicker from '../components/Widgets/ColorPicker';
import ThemeColorSwatch from '../components/Widgets/ThemeColorSwatch';
// import BlocksObject from '../components/Widgets/BlocksObject';
import ObjectList from '../components/Widgets/ObjectList';
import { headerActionsSchema } from '../components/Widgets/schema/headerActionsSchema';
import { footerLogosSchema } from '../components/Widgets/schema/footerLogosSchema';
import { footerLinksSchema } from '../components/Widgets/schema/footerLinksSchema';
import { iconLinkListSchema } from '../components/Widgets/schema/iconLinkListSchema';
import ModalJSONEditor from '../components/Widgets/ModalJSONEditor';
import SoftTextWidget from '../components/Widgets/SoftTextWidget';
import SoftTextareaWidget from '../components/Widgets/SoftTextareaWidget';

export default function install(config: ConfigType) {
  // Color picker widget override - use our own non-semanticUI widget
  // This is the widget that given an array of colors, you can choose one of them
  // `color_picker` is a terrible name for this widget, it should be `colorSwatch`
  // ToDo: Rename it in Volto 19
  config.widgets.widget.color_picker = ColorSwatch;
  config.widgets.widget.colorSwatch = ColorSwatch;

  // ObjectList widget override - use our own non-semanticUI widget
  // it uses also dnd-kit for drag and drop
  config.widgets.widget.object_list = ObjectList;

  // Force Preview image link widget to the image widget
  config.widgets.id.preview_image_link = config.widgets.widget.image;

  config.widgets.widget.colorPicker = ColorPicker;
  config.widgets.widget.themeColorSwatch = ThemeColorSwatch;
  config.widgets.widget.softTextWidget = SoftTextWidget;
  config.widgets.widget.softTextareaWidget = SoftTextareaWidget;

  config.widgets.widget.modalJSONEditor = ModalJSONEditor;

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
