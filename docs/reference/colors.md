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

## Color mapping to site layout elements

VLT defines a semantic layer of custom properties — one pair per main layout section (header, footer, fat menu, breadcrumbs, and search bar) — that point to the main color pairs. The layout CSS reads these semantic properties rather than the main pairs directly. For the rationale behind this indirection, see {doc}`../conceptual-guides/color-system`.

The semantic properties and the main pairs they point to:

| Layout section | Background property | Foreground (text) property | Resolves to |
| --- | --- | --- | --- |
| Header | `--header-background` | `--header-foreground` | `--primary-color` / `--primary-foreground-color` |
| Footer (main) | `--footer-background` | `--footer-foreground` | `--secondary-color` / `--secondary-foreground-color` |
| Fat menu | `--fatmenu-background` | `--fatmenu-foreground` | `--accent-color` / `--accent-foreground-color` |
| Breadcrumbs | `--breadcrumbs-background` | `--breadcrumbs-foreground` | `--accent-color` / `--accent-foreground-color` |
| Search bar | `--search-background` | `--search-foreground` | `--accent-color` / `--accent-foreground-color` |

For example, the header and footer mappings effectively resolve to:

```scss
  // Header
  --header-background: var(--primary-color);
  // --header-foreground is not declared in :root; the navigation falls back to this value
  --header-foreground: var(--primary-foreground-color);

  // Footer (main)
  --footer-background: var(--secondary-color);
  --footer-foreground: var(--secondary-foreground-color);
```

```{note}
The background mappings (and the footer, fat menu, breadcrumbs, and search foregrounds) are declared in `:root`. `--header-foreground` is the exception: it is not declared by default. The navigation menu items read it with a fallback (`var(--header-foreground, var(--primary-foreground-color))`), so navigation text still resolves to `--primary-foreground-color` unless you set `--header-foreground` explicitly. Other header elements that consume `--header-foreground` (such as the header tools) read it without a fallback, so they only take a color from it when you set it explicitly.
```

The following sections describe where each semantic property is applied.

### Navigation text color

`--header-foreground`

Applied to the text of the top-level navigation menu items in the site header. The navigation reads `--header-foreground` with a fallback, so it resolves to `--primary-foreground-color` by default (see the note above). The header tools (such as the personal tools and language selector) also use `--header-foreground`, but without a fallback, so they are only colored by it when it is set explicitly. The matching header background is `--header-background` (`--primary-color`).

### Fat menu and breadcrumbs text color

`--fatmenu-foreground` and `--breadcrumbs-foreground` (both resolve to `--accent-foreground-color`)

Applied to the text inside the fat menu (the expanded mega-menu dropdown panel) and to the breadcrumbs.

### Fat menu background color

`--fatmenu-background` and `--breadcrumbs-background` (both resolve to `--accent-color`)

Applied to the background of the fat menu dropdown panel and of the breadcrumbs bar.

### Footer font color

`--footer-foreground`

Applied to the text of the footer. The footer can have up to three regions — an optional pre-footer, the **main footer**, and an optional post-footer — and each region sets `--footer-foreground` itself.

The main footer is always present and uses the secondary color pair, so there `--footer-foreground` resolves to `--secondary-foreground-color`. The pre-footer and post-footer are optional; when a site includes them, they use the primary color pair instead, so `--footer-foreground` resolves to `--primary-foreground-color` in those regions.

### Footer background color

`--footer-background`

Applied to the background of the footer. As with `--footer-foreground`, the value depends on the region: the always-present **main footer** resolves it to `--secondary-color`, while the optional pre-footer and post-footer, when a site includes them, resolve it to `--primary-color`.

## Block themes

For the Blocks the system considers a list of theme objects. Each theme bundles a set of `--theme-*` custom properties that style the block:

`--theme-color`
:   The block's background color.

`--theme-foreground-color`
:   The block's main foreground color, used for text and icons.

`--theme-high-contrast-color`
:   A contrasting background color, used for surfaces nested inside the block (such as insets and cards) that need to stand apart from `--theme-color`.

`--theme-low-contrast-foreground-color`
:   A muted foreground color, used for secondary or less prominent text within the block.

These themes are stored in `config.blocks.themes` and you can extend them from your project or add-ons. The list can then be used in a widget such as the `color_picker` widget.

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

## See also

- {doc}`../conceptual-guides/color-system` — how VLT's color system is organized, and when to use block colors versus layout colors.
- {doc}`../conceptual-guides/site-customization` — how editors customize the site theme's main colors through the site root.
- {doc}`widgets` — the `color_picker` widget used to expose block themes and color definitions to editors.