# Volto Light Theme by kitconcept

[![NPM](https://img.shields.io/npm/v/@kitconcept/volto-light-theme.svg)](https://www.npmjs.com/package/@kitconcept/volto-light-theme)
[![Build Status](https://github.com/kitconcept/volto-light-theme/actions/workflows/code.yml/badge.svg)](https://github.com/kitconcept/volto-light-theme/actions)
[![Build Status](https://github.com/kitconcept/volto-light-theme/actions/workflows/unit.yml/badge.svg)](https://github.com/kitconcept/volto-light-theme/actions)
[![Build Status](https://github.com/kitconcept/volto-light-theme/actions/workflows/acceptance.yml/badge.svg)](https://github.com/kitconcept/volto-light-theme/actions)

![kitconcept GmbH](https://github.com/kitconcept/volto-blocks/raw/master/kitconcept.png)

## Vision

The main vision of the Volto Light Theme is to serve as a foundation for kitconcept's future projects, following the release of Plone 6.

It contains the feedback from the company's last years projects and the success stories in the UI/UX side.

It aims to be future proof, so it has to be aligned with the upcoming Volto vision in terms of theming strategy decided by the Plone community.

![Volto-Light-Theme](https://github.com/kitconcept/volto-light-theme/raw/main/volto-light-theme.png)

## Requirements and specs

### It should not use any SemanticUI component or styling

Volto will abandon SemanticUI as default design component system in the mid term, and we should be prepared for it.

We will achieve that by not using any SemanticUI component, nor any related styling (`.ui.XXX`) in our upcoming themes.

The Volto strategy is:

- Provide a very basic and structural Vanilla components to build upon theming and CMSUI as well (`@plone/components`)
- These components will be based in a headless component system [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html)
- Volto projects can be themed using `@plone/components` as baseline or use a complete different design or component system of the developer/integrator choice. The presence of Volto's component registry system could help for adapting, if required.

#### Volto components `customizations` use case

If possible, we will switch to SemanticUI-less components when `@plone/components` is ready.
Specially if the elements that we are customizing are clearly "theme" (eg. header/footer, etc).
In the case of other Volto customizations that are not clear part of the theme (eg. Search block), it's fine to stick using what the original is using (SemanticUI).
When Volto will make the switch in the future, we should then adapt all the customizations to match the one in the Volto core.
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

- One file per component/block
- Use the Volto theme facility using the SCSS scape hatch provided so other add-ons can hook to it.
- The styling is centralized in `main.scss`, the rest of the files are loaded from there.

## Why a headless component system?

https://medium.com/@nirbenyair/headless-components-in-react-and-why-i-stopped-using-ui-libraries-a8208197c268

## Vertical spacing block model

This theme has the concept of block "grouping" given two consecutive blocks with the same styling block wrapper property `backgroundColor`. You have to add this property to your blocks in your blocks code. This add-on customizes `RenderBlocks.jsx` component in order to do so.

The wrappers have the classnames `blocks-group-wrapper` and the name of the background color, eg. `grey`, defaulting to `transparent` if no `backgroundColor` property is set in the styling block wrapper in the block.

**Disclaimer**: This might change in the near future, since we are developing a new integral Block Model for VLT and Volto.

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

**Remember**: The margins in responsive are being taken care with container queries in `layout.scss`. So everything related to that, goes like it works in there, with container queries. See implementations for details in case you need it.

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

It is recommended that along `@kitconcept/volto-light-theme` package, you also install in your setup the aforementioned add-ons.
The theme package has them declared as `peerDependencies`.

### Project-based setups (`yarn`)

If your project relies on a boilerplate generated by `@plone/generator-volto`, then it's project-based.
In this case, it uses `yarn` as a package manager.
Because of how `yarn` works, it won't install these dependencies for you, as they are declared as `peerDependencies`.
This is because the theme won't have to force you to use any specific add-on version, and avoids package hoisting issues in `yarn` installations.
If this is your case, it is recommended that your project or policy add-on `package.json` include the aforementioned add-ons as `dependencies`.

```json
  "dependencies": {
    "@eeacms/volto-accordion-block": "^10.4.6",
    "@kitconcept/volto-button-block": "^2.3.1",
    "@kitconcept/volto-dsgvo-banner": "^2.3.2",
    "@kitconcept/volto-heading-block": "^2.4.0",
    "@kitconcept/volto-highlight-block": "^3.0.1",
    "@kitconcept/volto-introduction-block": "^1.0.0",
    "@kitconcept/volto-separator-block": "^4.1.1",
    "@kitconcept/volto-slider-block": "^6.3.1",
    "@kitconcept/volto-light-theme": "^3.3.2",
  }
```

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

If you don't want to install one or several of them, you can leave them out of the `addons` property.

Declare the theme in your project `package.json`:

```json
  "theme": "@kitconcept/volto-light-theme",
```

### Cookieplone-based setups (new `pnpm` based setups)

If you are using one of the new project-less setups based on Cookieplone, then it uses `pnpm`, and it will install the `peerDependencies` by default (recommended setup).
In this case, you won't have to install them; `pnpm` will do it for you, using the recommended versions used in `peerDependencies`.

In a project-less based setup, using Cookieplone, declare both the addons and the theme in `volto.config.js`:

```js
const addons = [
    "@eeacms/volto-accordion-block",
    "@kitconcept/volto-button-block",
    "@kitconcept/volto-heading-block",
    "@kitconcept/volto-introduction-block",
    "@kitconcept/volto-highlight-block",
    "@kitconcept/volto-separator-block",
    "@kitconcept/volto-light-theme",
    "your_policy_addon_here"
    ];

const theme = '@kitconcept/volto-light-theme';

module.exports = {
  addons,
  theme,
};
```

As an alternative, you can specify your project add-ons in your policy add-on for better portability, but at least your policy add-on should be in `volto.config.js`.

## Feature Flags

### Enable Fat Menu

Since 2.0.0, the light theme has a fat menu (below the main site sections) triggered clickin on one of them.
It's behind a feature flag, as opt-out:

```js
config.settings.enableFatMenu = true;
```

### Show Site Label

If you want to show a label on top of site you can pass label name to `siteLabel` property.

```js
config.settings.siteLabel = 'Plone Intranet';
```

If you wanted a translated label then you have to define a translation object in `defineMessages` function provided by react-intl.

Here is the code snippets you have to add in your addon index.js file.
If you don't have addon, you can also add in your config.js file in root of your frontend folder.

```js
import { defineMessages } from 'react-intl';

defineMessages({
  siteLabel: {
    id: 'siteLabel',
    defaultMessage: ' ',
  },
});

```
Then add the translation you want in your `locale` file.

### Show intranetHeader

We have totally different header for intranet sites. If you want that, you can enable it by passing `intranetHeader` property.

```js
config.settings.intranetHeader = true;
```
## Releases

The releases follow a semantic versioning model.

### Definition of breaking change

In general, the same rules as Volto releases applies.
However, in VLT we add an extra exception: The vertical spacing is carefully curated and considered an important feature of the theme and because of that, changes and improvements in the vertical spacing are **NOT** considered breaking changes.
They will be noted properly in the changelog.

## Upgrade Guide

See a detailed upgrade guide in: https://github.com/kitconcept/volto-light-theme/blob/main/UPGRADE-GUIDE.md

## Compatibility

| VLT version | Volto version |
|-------------|---------------|
|   3.x.x  |   >= Volto 17.0.0-alpha.16  |
|   4.x.x  |   < Volto 17.18.0  |
|   5.x.x  |   >= Volto 17.18.0 or >=Volto 18.0.0-alpha.36  |

Compatibility with Volto 16 might be achieved, but it has to be at customization level in the specific project add-on.
This is mainly due to the `RenderBlocks` customization that is based in the one in 17 because of the Grid block in core and the autogrouping feature.
See more information about the other dependencies in `peerDependencies` in `package.json`.

## Development

The development of this add-on is done in isolation using a new approach using pnpm workspaces and latest `mrs-developer` and other Volto core improvements.
For this reason, it only works with pnpm and Volto 18 (currently in alpha) but it does not mean that the add-on will only work in 18.

### Development requisites

- Volto 18 (2024-03-21: currently in alpha)
- pnpm as package manager

### Make convenience commands

Run `make help` to list the available commands.

```text
help                                  Show this help
install                               Installs the add-on in a development environment
start                                 Starts Volto, allowing reloading of the add-on during development
build                                 Build a production bundle for distribution of the project with the add-on
build-deps                            Build dependencies
i18n                                  Sync i18n
ci-i18n                               Check if i18n is not synced
format                                Format codebase
lint                                  Lint, or catch and remove problems, in code base
release                               Release the add-on on npmjs.org
release-dry-run                       Dry-run the release of the add-on on npmjs.org
test                                  Run unit tests
ci-test                               Run unit tests in CI
backend-docker-start                  Starts a Docker-based backend for development
storybook-start                       Start Storybook server on port 6006
storybook-build                       Build Storybook
acceptance-frontend-dev-start         Start acceptance frontend in development mode
acceptance-frontend-prod-start        Start acceptance frontend in production mode
acceptance-backend-start              Start backend acceptance server
ci-acceptance-backend-start           Start backend acceptance server in headless mode for CI
acceptance-test                       Start Cypress in interactive mode
ci-acceptance-test                    Run cypress tests in headless mode for CI
acceptance-a11y-frontend-prod-start   Start a11y acceptance frontend in prod mode
ci-acceptance-a11y-backend-start      Start acceptance a11y server in CI mode (no terminal attached)
acceptance-a11y-test                  Start a11y Cypress in interactive mode
ci-acceptance-a11y-test               Run a11y cypress tests in headless mode for CI
```

### Development Environment Setup

Install package requirements

```shell
pnpm i
make install
pnpm i
```

### Start developing

Run (in separate terminal sessions)

Start backend server

```shell
make start-backend-docker
```

Start frontend

```shell
pnpm start
```

### Linting

Run ESlint, Prettier and Stylelint

```shell
make lint
```

### Formatting

Run ESlint, Prettier and Stylelint in fix mode

```shell
make format
```

### i18n

Extract the i18n messages to locales

```shell
make i18n
```

### Unit tests

Run unit tests

```shell
make test
```

### Run Cypress tests

Run (in separate terminal sessions)

Start the frontend in dev mode

```shell
make start-test-acceptance-frontend-dev
```

Start the backend acceptance server

```shell
make start-test-acceptance-server
```

Start the Cypress interactive test runner

```shell
make test-acceptance
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
