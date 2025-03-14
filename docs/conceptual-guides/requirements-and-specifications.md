---
myst:
  html_meta:
    "description": "Requirements and specifications for Volto Light Theme"
    "property=og:description": "Requirements and specifications for Volto Light Theme"
    "property=og:title": "Requirements and specifications for Volto Light Theme"
    "keywords": "Plone, Volto Light Theme, requirements, specifications"
---

# Requirements and specifications

Volto Light Theme sets the following requirements and specifications for its development.


## Must not use any Semantic UI component or styling

Semantic UI as a design component system is deprecated in Volto 18 and will be removed in Plone 7.
In preparation for this, VLT uses no Semantic UI component, nor any related styling (`.ui.XXX` CSS classes).

The Plone 7 strategy includes the following principles.

-   Provide a very basic, structural, vanilla collection of components to build upon theming and the CMS UI, as implemented in [`@plone/components`](https://github.com/plone/volto/tree/main/packages/components).
-   These components will be based upon a headless component system [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html).
-   Volto projects can be themed using `@plone/components` as a base, or use a completely different design or component system of the developer's or integrator's choice.


## Volto components shadowing (`customizations`) use case and best practice

If possible, we will switch to Semantic UI-free components when `@plone/components` is ready, especially if the customized elements are clearly theme-related, such as the header, footer, and other theme elements.
When other Volto customizations are not clearly part of the theme, such as the Search block, it's fine to stick with what the original uses, even Semantic UI.
When Volto makes the switch in the future, we should adapt all the customizations to match the one in the Volto core.

```{important}
VLT takes the approach of using a proxy to a component of the {file}`components` folder.
This way it's easier to keep track of changes, and another add-on can customize further the VLT component, not the original Volto customization.
```

## Layout based in kitconcept's FZJ/DLR projects

Starting with FZJ/DLR projects, we've been trying a new concept in layout for Volto.
This layout uses three widths for the content elements:

-   Narrow (text)
-   Default (blocks)
-   Layout (main screen elements, such as Header or Footer)

The Layout sized elements snaps to 1440px.
The breakpoints are also different from Volto's defaults.
This layout uses mixins and CSS that can be found in {file}`layout.less` in the {file}`src/theme` folder.
It leverages container queries for managing the layout styling.


## Organization of the files

We will start organizing the files in the root of the {file}`theme` folder, to differentiate them from a normal Semantic UI theme.
Use the following organization conventions.

-   One file per component or block.
-   Use the Volto theme facility using the provided SCSS escape hatch, so other add-ons can hook into it.
-   The styling is centralized in {file}`main.scss`, and the rest of the files are loaded from there.
