# Colors

% TODO empty heading needs content

## Theme colors

% TODO empty heading needs content

## Color definition syntax

The VLT has migrated to use the standardized color definitions in Volto.
These definitions use CSS properties that are injected at runtime in the right places, so your CSS can adapt to use them in a generic way.
The resultant CSS is simpler, and there's no need to define class names for each color definition.
Read more about them in the official Plone documentation, [Custom CSS properties as color definitions](https://6.docs.plone.org/volto/development/color-picker-widget.html#custom-css-properties-as-color-definitions).

The color definitions are stored in `config.blocks.themes`, and you can extend them from your project or add-ons.

```ts
  config.blocks.themes = [
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
```
