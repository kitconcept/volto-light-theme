---
myst:
  html_meta:
    "description": "How the Volto Light Theme color system is organized"
    "property=og:description": "How the Volto Light Theme color system is organized"
    "property=og:title": "Color system"
    "keywords": "Volto Light Theme, colors, theming, CSS custom properties"
---

# Color system

The Volto Light Theme (VLT) organizes color into two families with distinct, non-overlapping responsibilities: one for content blocks and one for the site's main layout.

Knowing which family owns which part of the page is what keeps a site's theming consistent and predictable. This guide explains the model. For the exact list of tokens and where each one is applied, see {doc}`../reference/colors`.

## Two color families

VLT deliberately separates the colors that style content blocks from the colors that style the surrounding layout.

### Block colors: the `--theme-*` family

The custom properties prefixed with `--theme-` (`--theme-color`, `--theme-foreground-color`, `--theme-high-contrast-color`, `--theme-low-contrast-foreground-color`) style blocks.

They are driven by the block theme an editor selects through the `color_picker` widget, and they are scoped to the block they apply to. A block therefore adapts to whichever theme is assigned to it.

When you author a custom block or override block styles, read colors from the `--theme-*` properties so the block respects the editor's choice:

```scss
.block.myCustomBlock {
  background-color: var(--theme-color);
  color: var(--theme-foreground-color);
}
```

### Layout colors: the main color pairs

The main color pairs style the site's main layout elements: the header, footer, navigation, fat menu, breadcrumbs, and search bar. To see why there are exactly three of them, it helps to build a page up from nothing.

Picture the simplest possible page: a header, a main content area, and a footer. At its plainest, that page needs only two colors — one for the background and one for the foreground (text, icons) that sits on it. That is the **primary** pair, `--primary-color` and `--primary-foreground-color`, typically a white background with a black foreground. On a minimal site, every layout section could be painted with this single pair.

Now suppose you want the footer to stand apart from the rest of the page. You can't simply pick a new background color on its own: a background is only usable once it has a foreground color that stays legible on top of it. A distinct section therefore calls for a distinct pair. That is the **secondary** pair, `--secondary-color` and `--secondary-foreground-color`, which VLT applies to the main footer.

Finally, you may want an element that adds a branding hint — a touch of flavor that goes beyond plain background and text. That is the **accent** pair, `--accent-color` and `--accent-foreground-color`. VLT uses it for the fat menu, the breadcrumbs, and the search bar.

The three pairs are intentionally a small, fixed budget. Each one is a self-contained background-and-foreground combination that is guaranteed to be legible, and keeping the set small gives a layout visual structure without turning every section into a separate styling decision. The pairs do not map one-to-one to sections: a single pair can dress several sections — the accent pair, for instance, is shared by the fat menu, the breadcrumbs, and the search bar.

These pairs are site-wide and not tied to any individual block. An editor's block theme choice does not, and should not, affect them.

### Choosing the right family

Because the two families answer to different things, using the wrong one produces surprising results. A block styled with the layout colors ignores the editor's theme choice:

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
There could be deliberate exceptions. If you want a fixed, site-wide color that stays the same in a block across every block theme — for example a brand accent — you could use `--accent-color` (and `--accent-foreground-color`) inside a block. Be aware of the trade-off: because this color is not part of the block theme, it will **not** change when an editor switches the block theme with the `color_picker` widget.
```

## The semantic layer

The main color pairs are not consumed directly by the layout CSS. On top of them, VLT defines an intermediate, semantic layer of custom properties — one pair per main layout section (header, footer, fat menu, breadcrumbs, and search bar). The layout CSS reads these semantic properties, and the semantic properties point to the main pairs.

This indirection is what creates the cohesive final design. It also means a project or add-on can recolor a single section by overriding just that section's semantic property — for example `--header-background` — without affecting the other sections or the main pairs.

The {doc}`../reference/colors` reference lists every semantic property, the main pair it resolves to, and where it is applied.

## Further reading

- {doc}`../reference/colors` — the full list of color tokens, the semantic-layer mapping table, and block themes.
- {doc}`site-customization` — how editors customize the site theme's main colors through the site root.
