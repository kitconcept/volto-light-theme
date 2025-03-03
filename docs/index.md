---
myst:
  html_meta:
    "description": "Volto Light Theme by kitconcept"
    "property=og:description": "Volto Light Theme by kitconcept"
    "property=og:title": "Volto Light Theme by kitconcept"
    "keywords": "Volto Light Theme, kitconcept, Volto, theme, React"
---

# Volto Light Theme by kitconcept

[![NPM](https://img.shields.io/npm/v/@kitconcept/volto-light-theme.svg)](https://www.npmjs.com/package/@kitconcept/volto-light-theme)
[![Build Status](https://github.com/kitconcept/volto-light-theme/actions/workflows/code.yml/badge.svg)](https://github.com/kitconcept/volto-light-theme/actions)
[![Build Status](https://github.com/kitconcept/volto-light-theme/actions/workflows/unit.yml/badge.svg)](https://github.com/kitconcept/volto-light-theme/actions)
[![Build Status](https://github.com/kitconcept/volto-light-theme/actions/workflows/acceptance.yml/badge.svg)](https://github.com/kitconcept/volto-light-theme/actions)

![kitconcept GmbH](https://raw.githubusercontent.com/kitconcept/volto-blocks/master/kitconcept.png)

## Vision

The main vision of the Volto Light Theme (VLT) is to serve as a foundation for kitconcept's future projects, following the release of Plone 6.
It incorporates feedback from the company's clients and Plone community from the last few years of projects and the success stories in the UI/UX side.
It aims to be future-proof, keeping it aligned with the upcoming Volto and Plone 7 vision in terms of theming strategy decided by the Plone community.

````{card}
```{image} /_static/volto-light-theme.png
:alt: Volto Light Theme screen shot
:target: /_static/volto-light-theme.png
```
+++
_Volto Light Theme_
````


## Requirements and specifications

Volto Light Theme sets the following requirements and specifications for its development.


### Do not use any Semantic UI component or styling

Semantic UI as a design component system is deprecated in Volto 18 and will be removed in Plone 7.
In preparation for this, VLT uses no Semantic UI component, nor any related styling (`.ui.XXX`).

The Plone 7 strategy includes the following principles.

-   Provide a very basic, structural, vanilla collection of components to build upon theming and the CMS UI, as implemented in [`@plone/components`](https://github.com/plone/volto/tree/main/packages/components).
-   These components will be based upon a headless component system [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html).
-   Volto projects can be themed using `@plone/components` as a base, or use a completely different design or component system of the developer's or integrator's choice.


### Volto components shadowing (`customizations`) use case and best practice

If possible, we will switch to Semantic UI-less components when `@plone/components` is ready, especially if the elements that we customize are clearly theme-related, such as the header, footer, and other theme elements.
When other Volto customizations are not clearly part of the theme, such as the Search block, it's fine to stick with what the original uses, even Semantic UI.
When Volto makes the switch in the future, we should adapt all the customizations to match the one in the Volto core.
VLT takes the approach of using a proxy to a component of the `components` folder.
This way it's easier to keep track of changes, and another add-on can customize further the VLT component, not the original Volto customization.


### It should use kitconcept's layout used in FZJ/DLR projects

Starting with FZJ/DLR projects, we've been trying a new concept in layout for Volto.
This new layout uses three widths for the content elements:

-   Narrow (text)
-   Default (blocks)
-   Layout (main screen elements such as Header, Footer)

The Layout sized elements snap to 1440px.
The breakpoints are also different from default Volto.
This new layout uses mixins and CSS that can be found in {file}`layout.less` in the {file}`src/theme` folder.
It leverages container queries for managing the layout styling.


### Organization of the files

We will start organizing the files in the root of the {file}`theme` folder, to differentiate them from a normal "Semantic UI" theme.
Take a look at the current state.
We will follow this convention:

-   One file per component or block.
-   Use the Volto theme facility using the provided SCSS escape hatch, so other add-ons can hook into it.
-   The styling is centralized in {file}`main.scss`, and the rest of the files are loaded from there.


## Why a headless component system?

https://medium.com/@nirbenyair/headless-components-in-react-and-why-i-stopped-using-ui-libraries-a8208197c268


## Vertical spacing block model (v2)

This theme has the concept of block "grouping", given two consecutive blocks with the same styling block wrapper property `backgroundColor`.
You have to add this property to your blocks in your blocks code.
This add-on customizes the {file}`RenderBlocks.jsx` component to do so.

The wrappers have the class names `blocks-group-wrapper`, and the name of the background color, such as `grey`, defaulting to `transparent` if no `backgroundColor` property is set in the styling block wrapper in the block.

**Disclaimer**: This might change in the near future, since we are developing a new integral Block Model for VLT and Volto.


### Vertical spacing rules

The following main rules specification applies to the theme.

-   On each change of color, a vertical padding (both `padding-bottom` and `padding-top`) of `80px` defined by the main variable `$color-block-change-vertical-spacing`.
-   The default bottom margin is defined with the main variable `$block-vertical-space` and set by default to `25px`.
-   [grid] Vertical spacing for grids should be `80px` for both top and bottom, even if the previous and next blocks are of the same color.
-   [grid+grid] When two grids happen side by side and are of the same color, it should be equal to the grid gap.
    Thus, it's set to `@gutterWidth`, and currently `1rem`.
    It has to be adjusted with a bit of negative margin to cancel the current inner padding in grid cells.
-   [grid+grid] Grids columns belonging to the same grid and same color in small mobile viewports.
    They should be closer to match the other adjacent ones, so they seem to belong to the same grid set.
-   [footer] The footer has a top vertical spacing of `80px`.
-   [teasers] The last teaser, except if the following is a button, does _not_ have a line at the bottom.
-   [listing] The last listing, except if the following is a button, does _not_ have a line at the bottom.
-   [listing] After two consecutive listings, the vertical spacing should be `200px`.
-   [text+button] If there's a text and a button, then the vertical spacing between them is `60px`.
-   [image+separator-block] If after an image comes a separator block, the vertical spacing between them is `40px`.


### Media queries vs. container queries

We use media queries when the styling is generic enough to apply only to the view.

We use container queries when we care explicitly about how the styles are applied in edit mode, and we want the content area to behave 1:1 with the view mode.

This is because the container queries allow us to abstract the width from the sidebar and toolbar in edit mode, showing the content area as it will be in that size, in view mode.

**Remember**: The margins in responsive layouts are handled with container queries in {file}`layout.scss`.
So everything related to that, goes like it works in there, with container queries.
See implementations for details in case you need it.


## Specification

`@kitconcept/volto-light-theme` works with the following Plone Blocks:

-   [Grid-Block](https://www.npmjs.com/package/@kitconcept/volto-blocks-grid)
-   [Teaser-Block](https://www.npmjs.com/package/@kitconcept/volto-blocks-grid)
-   [Slider-Block](https://www.npmjs.com/package/@kitconcept/volto-slider-block)
-   [Button-Block](https://www.npmjs.com/package/@kitconcept/volto-button-block)
-   [Separator-Block](https://www.npmjs.com/package/@kitconcept/volto-separator-block)
-   [Heading-Block](https://www.npmjs.com/package/@kitconcept/volto-heading-block)
-   [Introduction-Block](https://www.npmjs.com/package/@kitconcept/volto-introduction-block)
-   [Accordion-Block](https://www.npmjs.com/package/@eeacms/volto-accordion-block)

and the following add-ons:

-   [DSGVO-Banner](https://www.npmjs.com/package/@kitconcept/volto-dsgvo-banner)


## Block Model v3

We are working at the same time on a new spec for blocks: [The Block Model v3](./block-model-v3.md).


```{toctree}
:maxdepth: 1
:hidden: true

install
feature-flags
summary
contributing
upgrade-guide
block-model-v3
compatibility
releases
```
