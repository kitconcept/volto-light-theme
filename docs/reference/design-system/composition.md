---
myst:
  html_meta:
    "description": "How a VLT page is assembled from blocks — the content-area structure, background bands and block widths"
    "property=og:description": "How a VLT page is assembled from blocks — the content-area structure, background bands and block widths"
    "property=og:title": "VLT Content-Area Composition"
    "keywords": "Plone, Volto, Volto Light Theme, blocks, composition, layout"
---

# Content-Area Composition

How a VLT page is assembled from blocks. Reproduce this skeleton so backgrounds
band correctly and blocks sit at their intended width.

## The three-layer skeleton

```html
<div class="q container">            <!-- size container (container-type: inline-size), full width -->
  <div id="page-document">           <!-- the page canvas, full width -->

    <!-- one group per run of consecutive blocks that share a background -->
    <div class="blocks-group-wrapper grey"
         style="--theme-color:#ecebeb; --theme-high-contrast-color:#fff; --theme-foreground-color:#000; --theme-low-contrast-foreground-color:#555555;">
      <div class="block teaser ...">…</div>   <!-- blocks: full-width band, each centered to its own width -->
      <div class="block heading ...">…</div>
    </div>

    <div class="blocks-group-wrapper default"
         style="--theme-color:#fff; --theme-high-contrast-color:#ecebeb; --theme-foreground-color:#000; --theme-low-contrast-foreground-color:#555555;">
      <div class="block image ...">…</div>
    </div>

  </div>
</div>
```

### Key rules

1. **The band paints the background, not the block.** `.blocks-group-wrapper`
   spans full width and paints `var(--theme-color)`. The theme CSS variables are
   set **inline on the group wrapper** (copy the exact set from the token table).
2. **Consecutive same-theme blocks share one group wrapper.** A change of theme
   starts a new `.blocks-group-wrapper`. This is what produces full-width color
   bands with centered content.
3. **Width lives on the block layer.** Never constrain the band. Each block
   centers itself (`margin: auto`) at its width:
   - `#page-document .blocks-group-wrapper > *` → layout width (`1440px`) by default;
   - per-block rules narrow it (text, teaser, heading, separator, TOC → default
     `940px`; some elements → narrow `620px`);
   - `has--block-width--full` → edge to edge.
4. **`#page-document` is required** for most block styling — many rules are scoped
   under it (spacing, widths, separator/short-line, introduction spacing, etc.).
5. **`container-type: inline-size`** on the outer container drives the
   container-query reflows (teasers stacking, carousel column counts, etc.).

## Block state classes (added automatically)

Blocks carry helper classes that VLT uses for spacing/among-siblings logic. When
reproducing, the important, meaningful ones are:

- `has--block-width--{narrow|default|layout|full}` — the block's width.
- `has--block-alignment--{left|center|right}` — horizontal alignment token.
- `has--background-color--{default|grey}` — the block's theme.
- `is--first--of--block-type`, `is--last--of--block-type`,
  `previous--has--same--backgroundColor`, `next--has--different--backgroundColor`
  — sibling/band-adjacency flags (drive margins between bands). Reproduce them
  only if you need exact spacing; they don't change the look of a single block.

## Styles vs. top-level data

Alignment/width/size are stored under `data.styles` with **`:noprefix`** keys and
surface as CSS classes and variables:

| `data.styles` key | class produced | variable |
|---|---|---|
| `align:noprefix: center` | `has--block-alignment--center` | `--block-alignment: var(--align-center)` |
| `blockWidth:noprefix: narrow` | `has--block-width--narrow` | `--block-width: var(--narrow-container-width)` |
| `size:noprefix: l` | (image size) | image scale |

The theme is stored at the **top level** as `data.theme` (`default` | `grey`),
not under `styles` — it drives the group wrapper.

## Minimal page recipe

1. Choose a width per block (most text-like blocks: default 940px; hero/media:
   layout 1440px or full).
2. Group blocks into bands by background (`default` / `grey`), alternating for
   rhythm.
3. Emit `#page-document` → one `.blocks-group-wrapper` per band (with inline theme
   vars) → the blocks, each with its `has--block-width--*` class.
</content>
