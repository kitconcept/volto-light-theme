---
myst:
  html_meta:
    "description": "Volto Light Theme colors definitions"
    "property=og:description": "Volto Light Theme colors definitions"
    "property=og:title": "Colors"
    "keywords": "Volto Light Theme, Colors"
---

# Colors

The VLT has migrated to use the standardized color definitions in Volto.
These definitions use CSS properties that are injected at runtime in the right places, so your CSS can adapt to use them in a generic way.
The resulting CSS is simpler, and there's no need to define class names for each color definition.
Read more about them in the official Plone documentation, [Custom CSS properties as color definitions](https://6.docs.plone.org/volto/development/color-picker-widget.html#custom-css-properties-as-color-definitions).

In most cases it is helpful to consider them as color pairs, since often their application is either as foreground (e.g., text, icons) or background color. The following handful of essential color tokens serves as the foundation for the site.

## Site theme main colors

The site theme considers three main color pairs:

```scss
--primary-color;
--primary-foreground-color;

--secondary-color;
--secondary-foreground-color;

--accent-color;
--accent-foreground-color;
```

### Color mapping to site layout elements

As an additional layer on top of this, some semantic custom properties for the basic layout sections have been set in place in a way we feel helps create a cohesive final design.

#### Navigation text color:
`--primary-foreground-color`

#### Fat menu and breadcrumbs text color
`--accent-foreground-color`

#### Fat menu background color
`--accent-color`

#### Footer font color
`--secondary-foreground-color`

#### Footer background color
`--secondary-color`

For example, in the case of the site's Header and Footer:

```scss
  // Header
  --header-background: var(--primary-color);
  --header-foreground: var(--primary-foreground-color);

  // Footer
  --footer-background: var(--secondary-color);
  --footer-foreground: var(--secondary-foreground-color);
```

## Block themes

For the Blocks the system considers a list of theme objects. These themes and color definitions are stored in `config.blocks.themes` and you can extend them from your project or add-ons. The list can be then used in a widget such as the `color_picker` widget.

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

## Recommended usage

VLT splits its color tokens into two families with distinct, non-overlapping responsibilities. Picking the right family for a given element keeps the site's theming consistent and predictable.

### Use `--theme-*` properties to style blocks

The custom properties prefixed with `--theme-` (`--theme-color`, `--theme-foreground-color`, `--theme-high-contrast-color`, `--theme-low-contrast-foreground-color`) are meant to style blocks.
They are driven by the block theme selected through the `color_picker` widget and are scoped to the block they apply to, so a block adapts to whichever theme an editor assigns to it.

When you author a custom block or override block styles, read colors from the `--theme-*` properties so the block respects the editor's theme choice:

```scss
.block.myCustomBlock {
  background-color: var(--theme-color);
  color: var(--theme-foreground-color);
}
```

### Use `--primary-*`, `--secondary-*`, and `--accent-*` for the main layout

The main color pairs (`--primary-color` / `--primary-foreground-color`, `--secondary-color` / `--secondary-foreground-color`, and `--accent-color` / `--accent-foreground-color`) are meant for the site's main layout elements, such as the header, footer, navigation, fat menu, and breadcrumbs.
They are site-wide and not tied to any individual block.

```scss
// ❌ Avoid this — main colors do not follow the block's theme
.block.myCustomBlock {
  background-color: var(--primary-color);
  color: var(--primary-foreground-color);
}

// ✅ Do this instead — block colors follow the editor's theme choice
.block.myCustomBlock {
  background-color: var(--theme-color);
  color: var(--theme-foreground-color);
}
```

Conversely, do not use `--theme-*` properties for layout elements — they are only defined in the scope of a block and carry no meaningful value at the layout level.

```{note}
There could be deliberate exceptions. If you want a fixed, site-wide color that stays the same in a block across every block theme, for example a brand accent, you could use `--accent-color` (and `--accent-foreground-color`) inside a block. Be aware of the trade-off: because this color is not part of the block theme, it will **not** change when an editor switches the block theme with the `color_picker` widget.
```

## See also

- {doc}`../conceptual-guides/site-customization` — how editors customize the site theme's main colors through the site root.
- {doc}`widgets` — the `color_picker` widget used to expose block themes and color definitions to editors.