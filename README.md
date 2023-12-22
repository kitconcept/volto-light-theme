# Volto Light Theme by kitconcept

[![NPM](https://img.shields.io/npm/v/@kitconcept/volto-light-theme.svg)](https://www.npmjs.com/package/@kitconcept/volto-light-theme)
[![Build Status](https://github.com/kitconcept/volto-light-theme/actions/workflows/code.yml/badge.svg)](https://github.com/kitconcept/volto-light-theme/actions)
[![Build Status](https://github.com/kitconcept/volto-light-theme/actions/workflows/unit.yml/badge.svg)](https://github.com/kitconcept/volto-light-theme/actions)
[![Build Status](https://github.com/kitconcept/volto-light-theme/actions/workflows/acceptance.yml/badge.svg)](https://github.com/kitconcept/volto-light-theme/actions)

![kitconcept GmbH](https://github.com/kitconcept/volto-blocks/raw/master/kitconcept.png)

## Vision

The Volto Light Theme main vision is to provide kitconcept a theme to build upon the projects to come after the release of Plone 6.

It should contain all the feedback and success stories in UI/UX side that the company had during the last years projects.

It should also be future proof, so it has to be aligned with the upcoming Volto vision in terms of theming strategy decided by the Plone community.

![Volto-Light-Theme](https://github.com/kitconcept/volto-light-theme/raw/main/volto-light-theme.png)

## Requirements

### It should not use any SemanticUI component or styling

Volto will abandon SemanticUI as default design component system in the mid term, and we should be prepared for it.

We will achieve that not using any SemanticUI component, nor any related styling (`.ui.XXX`) in our upcoming themes.

The Volto strategy is:

- To provide a very basic and structural Vanilla components to build upon theming and CMSUI as well.
- These components will be based in a headless component system. The best positioned right now is [react-aria](https://react-spectrum.adobe.com/react-aria/).
- The theming could be done using these basic components or dropping in the component system of the developer/integrator choice. The presence of Volto's component registry system could help for adapting, if required.
- The CMSUI will be isolated from the theming because it will be extremely CSS specific, so leaks from theming-CMSUI won't happen.

#### Volto components `customizations` use case

If possible, we will switch to SemanticUI-less components in case of they exist. Specially if the elements that we are customizing are clearly "theme" (eg. header/footer, etc). In the case of other Volto customizations that are not clear part of the theme (eg. Search block), it's fine to stick using what the original is using (SemanticUI). When Volto will make the switch in the future, we should then adapt all the customizations to match the one in the Volto core.
The approach used is to use a proxy to a component of the `components` folder. This way it's easier to keep track of changes, and another add-on can customize again the light theme component, not the original Volto customization.

### It should use kitconcept's layout used in FZJ/DLR projects

Since FZJ/DLR projects we've been trying a new concept in layout for Volto. This new layout uses three widths for the content elements:

- Narrow (text)
- Default (blocks)
- Layout (main screen elements like Header, Footer)

The Layout sized elements snap to 1440px. The breakpoints are also different than default Volto.

This new layout uses mixin's and CSS that can be found in `layout.less` in the theme folder.

Since the new container queries spec is out, we will be introducing it to the current CSS in order to implement the complexities that the "inner container" (the one between the toolbar and the sidebar) width presents. Until now, we did complex calculations given into account if the size of the inner container depending if the toolbar, the sidebar, or both were presents. With container queries we can do that in a more sensible and easy way.

### Organization of the files

We will start organising the files in the root of `theme` folder, to differentiate from a normal "SemanticUI" theme. Take a look at the current state. We will follow this convention:

- One less file per component/block
- All less files loading are centralized in one main less file `custom.less` in this project, could be different in the future.
- Vanilla headless components are named under `atoms` folder.

## Why a headless component system?

https://medium.com/@nirbenyair/headless-components-in-react-and-why-i-stopped-using-ui-libraries-a8208197c268

## Vertical spacing block model

This theme has the concept of block "grouping" given two consecutive blocks with the same styling block wrapper property `backgroundColor`. You have to add this property to your blocks in your blocks code. This add-on customizes `RenderBlocks.jsx` component in order to do so.

The wrappers have the classnames `blocks-group-wrapper` and the name of the background color, eg. `grey`, defaulting to `transparent` if no `backgroundColor` property is set in the styling block wrapper in the block.

### Vertical spacing rules

These main rules spec applies to the theme:

- On each change of color, a vertical padding (both `padding-bottom` and `padding-top`) of `80px` defined with the main variable `$color-block-change-vertical-spacing`.
- The default bottom margin is defined with the main variable `$block-vertical-space` and set by default to `25px`.
- [grid] Vertical spacing for grids should be `80px` for both top and bottom, even if the previous and next blocks are of the same color.
- [grid+grid] When two grids happen side by side and are of the same color. It should be equal to the grid gap, so it's set to `@gutterWidth` and currently `1rem`. It has to be adjusted with a bit of negative margin to cancel the current inner padding in grid cells.
- [grid+grid] Grids columns belonging to the same grid and same color in small mobile viewports. They should be closer to match the other adjacent ones, so they seem to belong to the same grid set.
- [footer] The footer has a top vertical spacing of `80px`.
- [teasers] The last teaser, except if the following is a button, does NOT have a line at the bottom.
- [listing] The last listing, except if the following is a button, does NOT have a line at the bottom.
- [listing] After two consecutive listings, the vertical spacing should be `200px`.
- [text+button] If there's a text and a button, then the vertical spacing betweeen them is `60px`.
- [image+separator-block] If after image comes a separator block, the vertical spacing between them is `40px`.

### Media queries vs container queries

We use media queries when the styling it's generic enough to apply only to the View.

We use container queries when do care explicitly about how the styling is being applied in edit mode as well and we want the content area to behave 1:1 with the view mode.

Reason: The container queries allow us to abstract the width from the sidebar and toolbar in edit mode, showing the content area as it will be in that size, in view mode.

Remember: The margins in responsive are being taken care with container queries in `layout.scss`. So everything related to that, goes like it works in there, with container queries. See implementations for details in case you need it.

## Specification

`@kitconcept/volto-light-theme` works with the following Plone Blocks:

- Grid-Block (https://www.npmjs.com/package/@kitconcept/volto-blocks-grid)
- Teaser-Block (https://www.npmjs.com/package/@kitconcept/volto-blocks-grid)
- Slider-Block (https://www.npmjs.com/package/@kitconcept/volto-slider-block)
- Button-Block (https://www.npmjs.com/package/@kitconcept/volto-button-block)
- Separator-Block (https://www.npmjs.com/package/@kitconcept/volto-separator-block)
- Heading-Block (https://www.npmjs.com/package/@kitconcept/volto-heading-block)
- Introduction-Block (https://www.npmjs.com/package/@kitconcept/volto-introduction-block)
- Accordion-Block (https://www.npmjs.com/package/@eeacms/volto-accordion-block)

and the following add-ons:

- DSGVO-Banner (https://www.npmjs.com/package/@kitconcept/volto-dsgvo-banner)

## Installation

It is recommended that your project or policy add-on `package.json` include the aforementioned add-ons.

```json
  "dependencies": {
    "@eeacms/volto-accordion-block": "^10.4.0",
    "@kitconcept/volto-button-block": "^2.3.1",
    "@kitconcept/volto-dsgvo-banner": "^1.3.0",
    "@kitconcept/volto-heading-block": "^2.4.0",
    "@kitconcept/volto-highlight-block": "^3.0.0",
    "@kitconcept/volto-introduction-block": "^1.0.0",
    "@kitconcept/volto-separator-block": "^4.0.0",
    "@kitconcept/volto-slider-block": "^6.0.0",
    "@kitconcept/volto-light-theme": "^2.0.0",
  }
```

This theme won't install them for you, as they are declared as `peerDependencies`.
This is because the theme won't have to force you to use any specific add-on version, and avoids package hoisting issues.

In your project or policy add-on `package.json` you should declare all of them as Volto add-ons

```json
  "addons": [
    "@eeacms/volto-accordion-block",
    "@kitconcept/volto-button-block",
    "@kitconcept/volto-heading-block",
    "@kitconcept/volto-introduction-block",
    "@kitconcept/volto-highlight-block",
    "@kitconcept/volto-separator-block",
    "@kitconcept/volto-light-theme",
    "your_policy_addon_here"
  ],
```

Make sure your policy add-on is the last one, as you would want that its configuration has priority over all the others. Make sure also that `@kitconcept/volto-light-theme` is the one before your policy add-on.

Then, declare the theme in your project `package.json`:

```json
  "theme": "@kitconcept/volto-light-theme",
```

Alternativelly, you can also declare it in your project's `volto.config.js`:

```js
const addons = [];
const theme = '@kitconcept/volto-light-theme';

module.exports = {
  addons,
  theme,
};
```

You can specify your project add-ons in `volto.config.js`, but sometimes is better to have them all in one place (in your policy add-on) for portability.

## Feature flags

### Enable fat menu

Since 2.0.0, the light theme has a fat menu (below the main site sections) triggered clickin on one of them.
It's behind a feature flag, as opt-out:

```js
config.settings.enableFatMenu = true;
```

## Development Setup

This theme works under Volto 17 alpha 16 onwards.
Compatibility with Volto 16 might be achieved, but it has to be at customization level in the
specific project add-on.
This is mainly due to the `RenderBlocks` customization that is based in the one in 17 because of the Grid block in core and the autogrouping feature.
See more information about the other dependencies in `peerDependencies` in `package.json`.
It is possible to develop this add-on using docker containers and the provided convenience Makefile commands.
Run `make help` to list the available commands.

````text
    build-backend                       Build
    start-backend                       Starts Docker backend
    stop-backend                        Stop Docker backend
    build-live                          Build Addon live
    build-addon                         Build Addon dev
    start-dev                           Starts Dev container
    dev                                 Develop the addon
    help                                Show this help.
    i18n                                Sync i18n
    format                              Format codebase
    lint                                Lint Codebase
    test                                Run unit tests
    test-ci                             Run unit tests in CI
    install-acceptance                  Install Cypress, build acceptance containers
    start-test-acceptance-server        Start acceptance server (for use it in while developing)
    start-test-acceptance-server-prod   Start acceptance server in prod (used by CI)
    test-acceptance                     Start Cypress (for use it while developing)
    test-acceptance-headless            Run cypress tests in CI
    stop-test-acceptance-server         Stop acceptance server (for use it while finished developing)
    status-test-acceptance-server       Status of Acceptance Server (for use it while developing)
    debug-frontend                      Run bash in the Frontend container (for debug infrastructure purposes)
    pull-backend-image                  Pulls and updates the backend image (for use it while developing)
````

### Prerequisites

- Docker
- Node 18 (e.g. via nvm)

### Development environment Setup

Run once

```shell
make dev
```

which will build and launch the backend and frontend containers.
There's no need to build them again after doing it the first time unless something has changed from the container setup.

In order to make the local IDE play well with this setup, is it required to run once `yarn` to install locally the required packages (ESlint, Prettier, Stylelint).

Run

```shell
yarn
```

### Build the containers manually

Run

```shell
make build-backend
make build-addon
```

## Run the containers

Run

```shell
make start-dev
```

This will start both the frontend and backend containers.

### Stop Backend (Docker)

After developing, in order to stop the running backend, don't forget to run:

Run

```shell
make stop-backend
```

### Linting

Run

```shell
make lint
```

### Formatting

Run

```shell
make format
```

### i18n

Run

```shell
make i18n
```

### Unit tests

Run

```shell
make test
```

### Acceptance tests

Run once

```shell
make install-acceptance
```

For starting the servers

Run

```shell
make start-test-acceptance-server
```

The frontend is run in dev mode, so development while writing tests is possible.

Run

```shell
make test-acceptance
```

To run Cypress tests afterwards.

When finished, don't forget to shutdown the backend server.

```shell
make stop-test-acceptance-server
```

### Release

Run

```shell
make release
```

For releasing a RC version

Run

```shell
make release-rc
```
