# Widgets

VLT provides a set of widgets that provide structural features.

## `themeColorSwatch`

Used for choosing a configured theme color (stored in `config.blocks.themes`).
Uses the {file}`/src/components/widgets/ThemeColorSwatch` component.

## `color_picker` (Volto widget override)

SemanticUI-less version of the Volto widget `color_picker`.
Given an array of colors, allows you to choose one of them.
Uses the {file}`/src/components/widgets/ColorSwatch` component.

## `colorPicker`

A color picker with an RGB visual color chooser, and a `hex` color field.
Uses the {file}`/src/components/widgets/ColorPicker` component.

## `blocksObject`

The successor of Volto's `ObjectListWidget` (`config.widgets.widget.object_list`). It's using `@plone/components` and it's SemanticUI free.
Internally it stores data using the `blocks`/`blocks_layout` keys, so it uses the standard blocks serializer machinery.
Uses the {file}`/src/components/widgets/BlocksObject` component.

## Buttons component

A widget where other widgets build up its functionality.
It shows a configurable list of buttons, with a configurable list of actions that each button has assigned. You can configure the icons and the i18n message used for each button.

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

A widget to select a width from the defined `config.blocks.widths`.
Uses the {file}`/src/components/widgets/BlockWidth` component.

## `blockAlignment`

A widget to select the block alignment (`left`, `right`, `center`). Based on the {file}`/src/components/widgets/Buttons` component under the hood, so the actions and the styles to be applied are configurable.
Uses the {file}`/src/components/widgets/BlockAlignment` component.

## `size`

A widget to select the block size from a default list of values (`small`, `medium`, `large`). Based on the {file}`/src/components/widgets/Buttons` component under the hood, so the actions and the styles to be applied are configurable.
Uses the {file}`/src/components/widgets/Size` component.

## `DndSortableList`

Not a widget, but an utility to build widgets upon.
