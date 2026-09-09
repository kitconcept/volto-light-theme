---
myst:
  html_meta:
    "description": "VLT design tokens — themes, colors, container widths, spacing and typography"
    "property=og:description": "VLT design tokens — themes, colors, container widths, spacing and typography"
    "property=og:title": "VLT Design Tokens"
    "keywords": "Plone, Volto, Volto Light Theme, design tokens, colors, typography"
---

# Design Tokens

The foundation of the design system. Use these values only — do not invent
colors, widths or spacing outside this set.

## Themes (background bands)

A block group is painted by a `.blocks-group-wrapper` whose theme sets these CSS
custom properties inline; they cascade into the blocks. Two themes exist.

| Theme | `--theme-color` (band bg) | `--theme-high-contrast-color` (cards) | `--theme-foreground-color` (text) | `--theme-low-contrast-foreground-color` |
|---|---|---|---|---|
| `default` | `#fff` | `#ecebeb` | `#000` | `#555555` |
| `grey` | `#ecebeb` | `#fff` | `#000` | `#555555` |

`.blocks-group-wrapper { background: var(--theme-color); color: var(--theme-foreground-color); }`
Cards inside a band use `--theme-high-contrast-color` so they stand out from the
band (white cards on grey, light-grey cards on white).

## Base colors

| Token | Value |
|---|---|
| Black (text/borders) | `#000` |
| White | `#fff` |
| Grey band / card | `#ecebeb` |
| Low-contrast text | `#555555` |

### Highlight block description colors

The highlight block has its own palette (`--descriptionColor` /
`--descriptionColor-foreground`):

| Name | Background | Foreground |
|---|---|---|
| `highlight-custom-color-1` (Grey) | `#ECEBEB` | `#000` |
| `highlight-custom-color-2` (Teal) | `#306F7E` | `#fff` |
| `highlight-custom-color-3` (Sky Blue) | `#91C9FA` | `#000` |
| `highlight-custom-color-4` (Indigo) | `#4B4BB8` | `#fff` |
| `highlight-custom-color-5` (Peach) | `#F5C1A9` | `#000` |
| `highlight-custom-color-6` (Yellow) | `#EEE38D` | `#000` |
| `highlight-custom-color-7` (Black) | `#000` | `#fff` |

## Container widths

Blocks center at one of these widths (`margin: auto`), inside the full-width band.

| Token | CSS variable | Value |
|---|---|---|
| narrow | `--narrow-container-width` | `620px` |
| default | `--default-container-width` | `940px` |
| layout | `--layout-container-width` | `1440px` |
| full | — | edge to edge (100%) |

A block's width is set by its `has--block-width--<name>` class and/or the
`#page-document .blocks-group-wrapper > *` rule (defaults to layout width, then
per-block rules narrow it — e.g. text/teaser → default).

## Spacing scale

| Token | Value |
|---|---|
| small | `20px` |
| medium | `40px` |
| large | `60px` |
| xlarge | `80px` |

- Vertical space between color bands: `80px` (`xlarge`).
- Horizontal gutter on small screens: `20px`.

## Typography

- **Font family:** `Inter`, with a system-ui fallback stack.
- **Base:** `18px` / `24px` line-height.

Font-size scale:

| Name | Size | Line-height |
|---|---|---|
| 2xs | 12px | 16px |
| xs | 14px | 18px |
| s | 18px | 18px |
| m | 21px | 24px |
| l | 24px | 30px |
| xl | 30px | 33px |
| 2xl | 33px | 36px |
| 3xl | 36px | 42px |
| 4xl | 42px | 48px |
| 5xl | 48px | 56px |

Font weights: thin 100, extra-light 200, **light 300**, regular 400, medium 500,
semi-bold 600, **bold 700**, extra-bold 800, bolder 900.

Notable roles:
- **Introduction / lead text:** size `l` (24px), weight `light` (300).
- **Body:** base 18px.
- **Headings:** the heading block renders `h2` from the `xl`–`3xl` range.

## Breakpoints (reference)

- Largest mobile screen and computer/large-monitor breakpoints drive the
  container-query switches (e.g. teasers stack, carousels reduce columns). Design
  desktop-first at the layout width, then let content reflow.
</content>
