---
myst:
  html_meta:
    "description": "How to install Volto Light Theme"
    "property=og:description": "How to install Volto Light Theme"
    "property=og:title": "Install"
    "keywords": "Volto Light Theme, install"
---

# Install
`@kitconcept/volto-light-theme` is a Volto add-on.
It should be installed as any other add-on using the `dependencies` key in your project's add-on file {file}`packages/<name_of_your_project_addon>/package.json`.

You should also configure `@kitconcept/volto-light-theme` as a Volto add-on using the `addons` key in your project add-on file {file}`packages/<name_of_your_project_addon>/package.json`.

```json
"addons": [
  // other add-ons installed above the declaration of VLT
  // VLT _must_ be the last one declared
  // Your project add-on will still be the last applied
  // if it's defined in `volto.config.js`
  "@kitconcept/volto-light-theme",
],
```

Since `@kitconcept/volto-light-theme` is also a theme add-on, you should declare it in your project's {file}`volto.config.js`.

```js
const addons = ['<name_of_your_project_addon>'];
const theme = '@kitconcept/volto-light-theme';

module.exports = {
  addons,
  theme,
};
```

## VLT recommended add-ons

`@kitconcept/volto-light-theme` supports all core blocks and it also supports blocks from selected Volto add-ons.
VLT declares them as `peerDependencies`.
As such, the theme won't force you to use any specific add-on version, and avoids package hoisting issues.
`pnpm` installs all `peerDependencies` by default.
Cookieplone does this for you.

Along with the `@kitconcept/volto-light-theme` package, you should also declare your `peerDependencies` in your setup using the `addons` key in your project add-on {file}`packages/<name_of_your_project_addon>/package.json`.:

```json
  "addons": [
    // other add-ons installed
    "@eeacms/volto-accordion-block",
    "@kitconcept/volto-button-block",
    "@kitconcept/volto-dsgvo-banner",
    "@kitconcept/volto-heading-block",
    "@kitconcept/volto-introduction-block",
    "@kitconcept/volto-highlight-block",
    "@kitconcept/volto-separator-block",
    "@kitconcept/volto-slider-block",
    "@kitconcept/volto-light-theme",
  ],
```

Find the full list of the {doc}`../reference/recommended-addons`.

```{note}
If you don't want to use any of the recommended add-ons, then remove them and don't declare them as add-ons in your project, leaving only those that you want.
```

