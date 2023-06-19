# volto-light-theme

## Vision

The Volto Light Theme main vision is to provide kitconcept a theme to build upon the projects to come after the release of Plone 6.

It should contain all the feedback and success stories in UI/UX side that the company had during the last years projects.

It should also be future proof, so it has to be aligned with the upcoming Volto vision in terms of theming strategy decided by the Plone community.

## Requirements

### Figma mockup

https://www.figma.com/file/eYUCbivnNrnjXjBDUizSVX/Plone-6?t=kSfnRbG3X8LmHfge-7

### It should not use any SemanticUI component or styling

Volto will abandon SemanticUI as default design component system in the mid term, and we should be prepared for it.

We will achieve that not using any SemanticUI component, nor any related styling (`.ui.XXX`) in our upcoming themes.

The Volto strategy is:

- To provide a very basic and structural Vanilla components to build upon theming and CMSUI as well.
- These components will be based in a headless component system. The best positioned right now is [react-aria](https://react-spectrum.adobe.com/react-aria/).
- The theming could be done using these basic components or dropping in the component system of the developer/integrator choice. The presence of Volto's component registry system could help for adapting, if required.
- The CMSUI will be isolated from the theming because it will be extremely CSS specific, so leaks from theming-CMSUI won't happen.

#### Volto components `customizations` use case

If possible, we will switch to SemanticUI-less (`Atom`) components in case of they exist. Specially if the elements that we are customizing are clearly "theme" (eg. header/footer, etc). In the case of other Volto customizations that are not clear part of the theme (eg. Search block), it's fine to stick using what the original is using (SemanticUI). When Volto will make the switch in the future, we should then adapt all the customizations to match the one in the Volto core.

### It should use kitconcept's layout used in FZJ/DLR

Since FZJ/DLR projects we've been trying a new concept in layout for Volto. This new layout uses three widths for the content elements:

- Narrow (text)
- Default (blocks)
- Layout (main screen elements like Header, Footer)

The Layout sized elements snap to 1440px. The breakpoints are also different than default Volto.

This new layout uses mixin's and CSS that can be found in `layout.less` in the theme folder.

Since the new container queries spec is out, we will be introducing it to the current CSS in order to implement the complexities that the "inner container" (the one between the toolbar and the sidebar) width presents. Until now, we did complex calculations given into account if the size of the inner container depending if the toolbar, the sidebar, or both were presents. With container queries we can do that in a more sensible and easy way.

### Organization of the files

We will start organising de files in the root of `theme` folder, to differentiate from a normal "SemanticUI" theme. Take a look at the current state. We will follow this convention:

- One less file per component/block
- All less files loading are centralized in one main less file `custom.less` in this project, could be different in the future.
- Vanilla headless components are named under `atoms` folder.


## Why a headless component system?

https://medium.com/@nirbenyair/headless-components-in-react-and-why-i-stopped-using-ui-libraries-a8208197c268


## Development Setup

## Prerequisits

- Docker
- Node 16 (e.g. via nvm)
- yo (run "npm install -g yo")
- @plone/generator-volto (run "npm install -g @plone/generator-volto")
- Build project by running "make"

### Build a project

Run

````
make project
````

### Start Backend (Docker)

Run:

````
make start-backend-docker
````

### Start Frontend (Volto)

````
cd project
yarn start
````

## Vertical spacing block model

This theme has the concept of block "grouping" given two consecutive blocks with the same styling block wrapper property `backgroundColor`. You have to add this property to your blocks in your blocks code. This add-on customizes `RenderBlocks.jsx` component in order to do so.

The wrappers have the classnames `blocks-group-wrapper` and the name of the background color, eg. `grey`, defaulting to `transparent` if no `backgroundColor` property is set in the styling block wrapper in the block.

## Specification

volto-light-theme works with the following Plone Blocks:

- Grid-Block (https://www.npmjs.com/package/@kitconcept/volto-blocks-grid)
- Teaser-Block (https://www.npmjs.com/package/@kitconcept/volto-blocks-grid)
- Slider-Block (https://www.npmjs.com/package/@kitconcept/volto-slider-block)
- Button-Block (https://www.npmjs.com/package/@kitconcept/volto-button-block)
- Separator-Block (https://www.npmjs.com/package/@kitconcept/volto-separator-block)
- Heading-Block (https://www.npmjs.com/package/@kitconcept/volto-heading-block)
- Introduction-Block (not open source yet)

and the following add-ons:

- DSGVO-Banner (https://www.npmjs.com/package/@kitconcept/volto-dsgvo-banner)
