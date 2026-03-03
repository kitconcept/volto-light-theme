---
myst:
  html_meta:
    "description": "Layout concepts in Volto Light Theme"
    "property=og:description": "Layout concepts in Volto Light Theme"
    "property=og:title": "Layout concepts in Volto Light Theme"
    "keywords": "Plone, layout, concepts, Volto Light Theme, container, queries, media"
---

# Layout

This chapter describes the layout concepts used in Volto Light Theme.
It covers container widths, block widths, breakpoints, and media queries.

## Containers

VLT uses three types of container widths:

-   Narrow (text)
-   Default (most blocks)
-   Layout (main screen elements, such as Header or Footer)

The values of these containers are controlled by SCSS variables in {file}`_variables.scss` and have the following default values.

```scss
$layout-container-width: 1440px !default;
$default-container-width: 940px !default;
$narrow-container-width: 620px !default;
```

These values are also exposed as CSS custom properties in {file}`_layout.scss`:

```scss
--layout-container-width: 1440px;
--default-container-width: 940px;
--narrow-container-width: 620px;
```

CSS custom properties are the recommended way to work with container widths, as they can be overridden at runtime.
You can also customize the SCSS variables by overriding them in your add-on {file}`_variables.scss` as shown below.

```scss
$narrow-container-width: 720px;
```

The Layout sized elements snap to a maximum width of 1440px.


## Container mixins

VLT provides reusable SCSS mixins in {file}`_layout.scss` that you can use in your projects and add-ons:

-   `narrow-container-width()`
-   `default-container-width()`
-   `layout-container-width()`
-   `variable-container-width()` uses the `--block-width` CSS custom property for dynamic widths

Each mixin sets the corresponding `max-width` and centers the element with auto margins.


## Block width

Each block can have a width selected by the editor through the block width widget (see the {doc}`/reference/widgets` reference for details on the `blockWidth` widget).
The available widths are narrow, default, layout, and full.

When a width is selected, VLT applies the `--block-width` CSS custom property to the block as an inline style:

| Selection | CSS custom property value                  |
|-----------|--------------------------------------------|
| Narrow    | `var(--narrow-container-width)` (620px)    |
| Default   | `var(--default-container-width)` (940px)   |
| Layout    | `var(--layout-container-width)` (1440px)   |
| Full      | `unset` (no max-width constraint)          |

If no explicit width is set, the block defaults to the **default** width (940px).

VLT also injects convenience CSS class names (such as `has--block-width--narrow`, `has--block-width--default`, and `has--block-width--layout`) for styling purposes.


## Default width assignments by block type

Different types of blocks are assigned an initial container width based on their nature.
These defaults are defined in {file}`_layout.scss`, and some usage examples are as follows:

narrow (620px)
:   Text-oriented content: paragraphs, slate headings, also available for images, videos, and separator lines.

default (940px)
:   The page title (rendered by the Title block), standard size images, listing blocks, search blocks, teasers, tables, heading blocks, table of contents, grid and accordion blocks.

layout (1440px)
:   Full-width elements: full-width images, videos, and maps.


## Breakpoints

VLT defines the following breakpoints in {file}`_variables.scss`.

| Breakpoint variable          | Value    | Description                         |
|------------------------------|----------|-------------------------------------|
| `$largest-mobile-screen`     | `768px`  | Mobile / Tablet portrait threshold  |
| `$tablet-breakpoint`         | `769px`  | Tablet landscape start              |
| `$computer-width`            | `940px`  | Small desktop content width         |
| `$computer-breakpoint`       | `941px`  | Large desktop threshold             |
| `$large-monitor-width`       | `1440px` | Large monitor width                 |
| `$large-monitor-breakpoint`  | `1441px` | Extra large monitor threshold       |

## Media queries vs. container queries

The layout uses container queries when both the styles are applied in edit mode and the content area should behave exactly as the view mode.

This is because the container queries abstract the width from the sidebar and toolbar in edit mode, showing the content area as it will be in that size, in view mode.
Containers are set to `container-type: inline-size` (in {file}`_container.scss`), so container queries measure the actual content area width rather than the viewport.
This is especially useful in edit mode, where the sidebar and toolbar reduce the available space.