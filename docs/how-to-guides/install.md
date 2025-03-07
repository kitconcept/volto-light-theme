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
It should be installed as any other add-on using the `dependencies` key in your project add-on {file}`packages/<name_of_your_project_addon>/package.json`.

You should also install `@kitconcept/volto-light-theme` as a Volto add-on using the `addons` key in your project add-on {file}`packages/<name_of_your_project_addon>/package.json`.

```json
"addons": [
  // other add-ons installed
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
This is because the theme won't have to force you to use any specific add-on version, and avoids package hoisting issues.
`pnpm` installs all `peerDependencies` by default, so this is done for you if you are using a Cookieplone based setup (recommended).

Along with the `@kitconcept/volto-light-theme` package, you should also declare them in your setup using the `addons` key in your project add-on {file}`packages/<name_of_your_project_addon>/package.json`.:

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

Please find here the full list of the {doc}`../reference/recommended-addons`.

```{note}
In case that you don't want to use any of them, don't declare them as add-ons in your project leaving the ones you do want.
```


