---
myst:
  html_meta:
    "description": "VLT Design System reference — tokens, composition and the block catalog"
    "property=og:description": "VLT Design System reference — tokens, composition and the block catalog"
    "property=og:title": "VLT Design System"
    "keywords": "Plone, Volto, Volto Light Theme, design system, blocks, tokens"
---

# Design System

A reference for building websites with the Volto Light Theme (VLT) design system:
the design tokens, the content-area composition rules, and a catalog of every
block. It is generated from, and kept in sync with, the Storybook stories in
`packages/volto-light-theme/src/stories`.

It doubles as machine-readable context for design tools (for example, feeding a
design assistant enough to build VLT-based pages using the real block markup,
classes and tokens).

```{toctree}
:maxdepth: 1
design-tokens
composition
blocks
```

## Visual block catalog

A **machine-extracted** catalog — every block and variant with its exact rendered
HTML and a screenshot, captured straight from Storybook — is published alongside
these pages:

```{raw} html
<p><a class="reference external" href="../../_static/design-catalog/catalog.html" target="_blank" rel="noopener">Open the visual block catalog →</a></p>
```

Regenerate it (and the screenshots) after changing blocks, from `frontend/`:

```shell
make storybook-start   # in one terminal
make design-catalog    # in another
```

The generator is `frontend/scripts/generate-design-catalog.mjs`; output is written
to `docs/_static/design-catalog/` and committed (Read the Docs cannot run
Storybook/Playwright).

## How to use this reference

- Treat {doc}`design-tokens` as the palette and scale — do not use colors, widths
  or spacing outside the token set.
- Wrap blocks in the content-area skeleton from {doc}`composition` so backgrounds
  band correctly and blocks center at their intended width.
- Reproduce the structure and class names from {doc}`blocks` (and the visual
  catalog) verbatim; VLT's stylesheet keys off these classes.
</content>
