---
myst:
  html_meta:
    "description": "Volto Light Theme provides a set of widgets that provide structural features."
    "property=og:description": "Volto Light Theme provides a set of widgets that provide structural features."
    "property=og:title": "Volto Light Theme widgets"
    "keywords": "Plone, Volto Light Theme, widgets"
---

# Widgets

Volto Light Theme provides a set of widgets that provide structural features.

## `themeColorSwatch`

The `themeColorSwatch` widget is used for choosing a configured theme color, which is stored in `config.blocks.themes`.
It uses the {file}`/src/components/widgets/ThemeColorSwatch` component.

```{image} /_static/themeColorSwatch.png
:alt: themeColorSwatch
```

## `color_picker` (Volto widget override)

The `color_picker` widget is a Semantic UI-free version that overrides the Volto `color_picker` widget.
Given an array of color definitions, it displays colors that editors can choose.
It uses the {file}`/src/components/widgets/ColorSwatch` component.

```{image} /_static/color_picker.png
:alt: color_picker
```

## `colorPicker`

The `colorPicker` widget is a color picker with an RGB visual color chooser, and a `hex` color field.
It uses the {file}`/src/components/widgets/ColorPicker` component.

```{image} /_static/colorPicker.png
:alt: colorPicker
```

## `ColorContrastChecker` component

The `ColorContrastChecker` is a component that helps ensure text accessibility by calculating the contrast ratio between two colors. It is based on WCAG (Web Content Accessibility Guidelines) accessibility standards. It can be added in a widget following a color input field to let the user know in real-time of insufficient contrast. It can be found at {file}`/src/components/widgets/ColorContrastChecker`. 


```{image} /_static/colorContrastChecker.png
:alt: colorContrastChecker
```

### Usage

Import the component into your widget:

```tsx
import ContrastChecker from './ContrastChecker';

const MyColorWidget = (props: { id: string; value: string; }) => {
  return (
    <>
      <FormFieldWrapper {...props} />
      <ContrastChecker {...props} />
    </>
  );
}

export default MyColorWidget;
```

#### Color Input

The component accepts hex color codes (e.g., #FF0000) and compares the field's value against its paired color from the global form data. These color pairings, and default values, are defined in the configuration registry under `config.settings.colorMap`:

```jsx
  config.settings.colorMap = {
    primary_color: {
      colorPair: 'primary_foreground_color',
      default: '#ffffff',
    },
    primary_foreground_color: {
      colorPair: 'primary_color',
      default: '#000000',
    },
    secondary_color: {
      colorPair: 'secondary_foreground_color',
      default: '#ecebeb',
    },
    secondary_foreground_color: {
      colorPair: 'secondary_color',
      default: '#000000',
    },
    accent_color: { 
      colorPair: 'accent_foreground_color', 
      default: '#ecebeb' 
    },
    accent_foreground_color: { 
      colorPair: 'accent_color', 
      default: '#ffffff' 
    },
  };
```

#### Contrast Calculation

The component calculates contrast using the following steps:

1. **Convert Hex to RGB** with `hexToRgb(hex)`.

2. **Calculate Relative Luminance** using the WCAG formula with `getLuminance(r, g, b)`.

3. **Determine Contrast Ratio** using `getContrastRatio(l1, l2)`.

#### Additional resources

- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Contrast for Better Readability](https://www.w3.org/WAI/tips/designing/#provide-sufficient-contrast-between-foreground-and-background)

## `object_list` (Volto widget override)

The `object_list` widget overrides the Volto `object_list` widget.
The widget is a drop-in replacement in functionality to Volto's `ObjectListWidget`.
It allows to introduce a list of ordered objects with the same shape.
It allows to reorder them using drag and drop.
It uses `@plone/components`.

```{image} /_static/blocksObject.png
:alt: blocksObject
```

This widget saves its contents in Volto's standard blocks format, using the `blocks_layout` and `blocks` keys.
This allows the standard serializers and deserializers to work with the object schema fields.
The shape of the objects it contains is defined by either the `schema` or `schemaName` props.

If `schemaName` is provided, you should register a schema as a utility in the following form.

```ts
  config.registerUtility({
    name: 'footerLogos',
    type: 'schema',
    method: footerLogosSchema,
  });
```

`footerLogosSchema` is a schema generation function or a plain `JSONSchema` object that has the following signature.

```ts
export type BlocksObjectWidgetSchema =
  | (JSONSchema & { addMessage: string })
  | ((props: BlocksObjectWidgetProps) => JSONSchema & { addMessage: string });
```

Alternatively, you can provide the schema generation function or the plain `JSONSchema` using the `schema` prop and wrapping it around a custom widget.

Internally it stores data using the `blocks` and `blocks_layout` keys, so it uses the standard blocks serializer machinery.
It uses the {file}`/src/components/widgets/BlocksObject` component.

The following snippet shows the shape of the types of the component.

```ts
export type BlocksObjectWidgetProps = {
  /**
   * The ID of the widget.
   */
  id: string;
  /**
   * The ID of the block this widget belongs to.
   */
  block: string;
  /**
   * The fieldset this widget belongs to.
   */
  fieldSet: string;
  /**
   * The title of the widget.
   */
  title: string;
  /**
   * The current value of the widget, which is BlocksData.
   */
  value?: BlocksData;
  /**
   * The default value for the widget. Can be a string or an object.
   */
  default?: string | object;
  /**
   * Whether the widget is required.
   */
  required?: boolean;
  /**
   * The value to use when the widget is missing a value.
   */
  missing_value?: unknown;
  /**
   * The CSS class name for the widget.
   */
  className?: string;
  /**
   * A callback function that is called when the value of the widget changes.
   * @param id The ID of the widget.
   * @param value The new value of the widget.
   */
  onChange: (id: string, value: any) => void;
  /**
   * The index of the currently active object.
   */
  activeObject: number;
  /**
   * A callback function that is called to set the active object.
   * @param index The index of the object to set as active.
   */
  setActiveObject: (index: number) => void;
  /**
   * The schema for the BlocksObjectWidget.
   */
  schema: BlocksObjectWidgetSchema;
  /**
   * The name of the schema.
   */
  schemaName: string;
  /**
   * An optional function to enhance the schema.
   * @param args An object containing the schema, form data, intl, navRoot, and contentType.
   */
  schemaEnhancer?: (args: {
    schema: JSONSchema & { addMessage: string };
    formData: BlockConfigBase;
    intl: IntlShape;
    navRoot: Content;
    contentType: string;
  }) => JSONSchema;
};
```

It's worth mentioning that the `activeObject` and `setActiveObject` props allow you to set and synchronize the active and uncollapsed object of the widget from the outside.

## Buttons component

This component is a helper for building widgets that have a list of buttons that can be toggled in order to select a single value.
It is not a widget on itself, but it allows other widgets to build up using its base functionality.
You can pass as props a configurable list of buttons, with a configurable list of actions that each button has assigned.
You can configure the icons and the i18n message used for each button as well.

```ts
type Actions =
  | {
      name: string;
      label: string;
      style: Record<`--${string}`, string>;
    }
  | {
      name: string;
      label: string;
      style: undefined;
    };

/**
 * A tuple that has an icon in the first element and a i18n string in the second.
 */
type ActionInfo = [React.ReactElement<any>, string];

export type ButtonsWidgetProps = {
  /**
   * Unique identifier for the widget.
   */
  id: string;

  /**
   * Callback function to handle changes.
   */
  onChange: Function;

  /**
   * List of actions available for the widget.
   */
  actions: Actions[];

  /**
   * Map containing additional the information (icon and i18n string) for each action.
   */
  actionsInfoMap: Record<string, ActionInfo>;

  /**
   * List of actions to be filtered out. In case that we don't want the default ones
   * we can filter them out.
   */
  filterActions: string[];

  /**
   * Current value of the widget.
   */
  value: string;

  /**
   * Default value of the widget.
   */
  default: string;

  /**
   * Indicates if the widget is disabled.
   */
  disabled: boolean;

  /**
   * Indicates if the widget is disabled (alternative flag for compatibility reasons).
   */
  isDisabled: boolean;
};
```
## `blockWidth`

`blockWidth` is a widget to select a width from the defined `config.blocks.widths`.
It uses the {file}`/src/components/widgets/BlockWidth` component.

```{image} /_static/blockWidth.png
:alt: blockWidth
```

## `blockAlignment`

`blockAlignment` is a widget to select the block alignment, one of either `left`, `right`, or `center`.
It's based on the {file}`/src/components/widgets/Buttons` component under the hood, so the actions and the styles to be applied are configurable.
It uses the {file}`/src/components/widgets/BlockAlignment` component.

```{image} /_static/blockAlignment.png
:alt: BlockAlignment
```

## `size`

`size` is a widget to select the block size from a default list of values, one of either `small`, `medium`, or `large`.
It's based on the {file}`/src/components/widgets/Buttons` component under the hood, so the actions and the styles to be applied are configurable.
It uses the {file}`/src/components/widgets/Size` component.

```{image} /_static/size.png
:alt: size
```
