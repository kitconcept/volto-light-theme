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

## `colorSwatch`

`colorSwatch` lets editors pick from a curated palette instead of entering free-form values.
It renders the {file}`/src/components/widgets/ColorSwatch` component and expects a `colors` prop with the available swatches.
Each entry follows the `StyleDefinition` type from `@plone/types`:

```ts
export type StyleDefinition =
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
```

Always provide a `default` option so the field has a predictable fallback.
Here is a schema snippet that wires the widget to a styling field:

```ts
export const ButtonStylingSchema = ({ schema, formData, intl }) => {
  const colors = [
    {
      style: {
        '--theme-color': '#fff',
        '--theme-high-contrast-color': '#ecebeb',
        '--theme-foreground-color': '#000',
        '--theme-low-contrast-foreground-color': '#555555',
      },
      name: 'default',
      label: 'Default',
    },
    {
      style: {
        '--theme-color': '#ecebeb',
        '--theme-high-contrast-color': '#fff',
        '--theme-foreground-color': '#000',
        '--theme-low-contrast-foreground-color': '#555555',
      },
      name: 'grey',
      label: 'Grey',
    },
  ];

  schema.properties.styles.schema.properties.myColorField = {
    title: 'Background color',
    description: 'Select the background color for the block',
    widget: 'colorSwatch',
    default: 'default',
    colors
  }

  return schema;
}
```

```{image} /_static/colorSwatch.png
:alt: colorSwatch widget
```

The widget stores the chosen color's `name` (token).
`StyleWrapper` adds that token as a CSS class on the block, so you can target it in stylesheets.
If you also want the corresponding CSS custom properties injected inline, register a `styleFieldDefinition` utility for the field name used in the schema:

```ts
  const colors = [
    {
      style: {
        '--theme-color': '#fff',
        '--theme-high-contrast-color': '#ecebeb',
        '--theme-foreground-color': '#000',
        '--theme-low-contrast-foreground-color': '#555555',
      },
      name: 'default',
      label: 'Default',
    },
    {
      style: {
        '--theme-color': '#ecebeb',
        '--theme-high-contrast-color': '#fff',
        '--theme-foreground-color': '#000',
        '--theme-low-contrast-foreground-color': '#555555',
      },
      name: 'grey',
      label: 'Grey',
    },
  ];

  config.registerUtility({
    name: 'myColorField',
    type: 'styleFieldDefinition',
    method: (props: { data: any; container: any }) => colors
  });
```

```{note}
This is the recommended way to use this widget, as it allows you to decouple the styles from the CSS and have a single source of truth for the color definitions.
```

## `themeColorSwatch`

The `themeColorSwatch` widget is used for choosing a configured theme color, which is stored in `config.blocks.themes`.
It uses the {file}`/src/components/widgets/ThemeColorSwatch` component which is a wrapper around the `ColorSwatch` component.

```{image} /_static/themeColorSwatch.png
:alt: themeColorSwatch
```

```{note}
This widget is a specialized version of the `colorSwatch` widget that automatically pulls the color definitions from the global theme configuration.
It is not supposed to be used in other contexts.
It can be useful for non-VLT-based projects that want to have a consistent set of theme colors across multiple blocks or components.
```

## `color_picker` (Volto widget override)

The `color_picker` widget is drop-in replacement, Semantic UI-free version that overrides Volto's `color_picker` widget.
Given an array of color definitions, it displays colors that editors can choose.
It uses the {file}`/src/components/widgets/ColorSwatch` component.

```{note}
This widget name is misleading, as it does not provide a color picker functionality, but rather a color swatch selection.
It might be renamed to `colorSwatch` in future versions of Volto.
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

```{versionremoved} VLT 8.0.0-alpha.5
These components have been moved to the Volto core package.
Use them instead of the ones provided by Volto Light Theme if you are using Volto 19.0.0-alpha.12 or later.
```

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

## `SoftTextWidget` and `SoftTextAreaWidget`

`SoftTextWidget` and `SoftTextAreaWidget` is a widget similar to text/textarea widget , it shows a yellow notice , giving real-time character counter feedback when the character limit exceeds the `SoftMaxLength`, but allows saving incase editors finds it necessary to exceed the limit. It uses `/src/components/Widgets/SoftTextWidget.tsx` and `/src/components/Widgets/SoftTextareaWidget.tsx` component.

```{image} /_static/seoWidgets.png
:alt: SEO widgets softTextWidget/SoftTextAreaWidget
```

To use these widgets , we can configure them in backend using `directives.widget` with `frontendOptions` and adding recommeded character limit to `SoftMaxLength` :

```python

 model.fieldset(
        "seo",
        label="SEO",
        fields=["seo_title", "seo_description"],
    )
    
    directives.widget(
        "seo_title",
        frontendOptions={
            "widget": "softTextWidget",
            "widgetProps": {"softMaxLength": "55"},
        },
    )
    seo_title = schema.TextLine(
        title="SEO Title",
        description=(
            "Override the meta title. When empty the default title will "
            "be used. Use maximum 55 characters."
        ),
        required=False,
    )
    directives.widget(
        "seo_description",
        frontendOptions={
            "widget": "softTextareaWidget",
            "widgetProps": {"softMaxLength": "155"},
        },
    )
    seo_description = schema.Text(
        title="SEO Description",
        description=(
            "Override the meta description. When empty the default "
            "description will be used. Use maximum 155 characters."
        ),
        required=False,
    )
```
