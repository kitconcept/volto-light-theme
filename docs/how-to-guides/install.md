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

```{versionadded} 18.29.1
```
```{versionadded} 19.0.0-alpha.10
```

You can declare the `@kitconcept/volto-light-theme` add-on in the {file}`package.json` file of your add-on for either of the respective major version lines in Volto:

- 18.29.1 or later
- 19.0.0-alpha.10 or later

The following snippet shows example configuration.

```{code-block} json
:caption: {file}`packages/<name_of_addon>/package.json`
{
  "addons": [
    // other add-ons installed above the declaration of VLT
    // VLT _must_ be the last one declared
    "@kitconcept/volto-light-theme",
  ],
  "theme": "@kitconcept/volto-light-theme",
  //... other configuration ...
}
```

## VLT recommended add-ons

`@kitconcept/volto-light-theme` supports all core blocks and it also supports blocks from selected Volto add-ons.
The recommended add-ons are listed in the {doc}`../reference/recommended-addons` section.

### Install add-ons as dependencies (VLT 8.0.0 and later)

```{versionremoved} 8.0.0-alpha.0
```

VLT 8.0.0 no longer includes the recommended add-ons as `peerDependencies` in {file}`package.json`.
This means that you will need to install them manually if you want to use them in your project.

You should install the recommended add-ons as dependencies in your project's add-on {file}`packages/<name_of_addon>/package.json`.
Nevertheless, you can choose to install only those you want to use.

```{code-block} json
:caption: {file}`packages/<name_of_addon>/package.json`
{
  "dependencies": {
    "@eeacms/volto-accordion-block": "^10.4.6",
    "@kitconcept/volto-banner-block": "^1.1.0",
    "@kitconcept/volto-bm3-compat": "^1.0.0-alpha.1",
    "@kitconcept/volto-button-block": "^4.0.0-alpha.0",
    "@kitconcept/volto-carousel-block": "^2.0.0-alpha.3",
    "@kitconcept/volto-dsgvo-banner": "^2.5.1",
    "@kitconcept/volto-heading-block": "^2.5.0",
    "@kitconcept/volto-highlight-block": "^4.4.0",
    "@kitconcept/volto-introduction-block": "^1.1.0",
    "@kitconcept/volto-logos-block": "^3.0.0-alpha.1",
    "@kitconcept/volto-separator-block": "^4.2.1",
    "@kitconcept/volto-slider-block": "^6.4.0",
    "@plonegovbr/volto-social-media": "^2.0.0-alpha.10"
    // other dependencies
  }
}
```

```{warning}
The above list might be outdated, please refer to that section for the full list of recommended add-ons and their known good versions.
```

### Declaring add-ons

Along with the `@kitconcept/volto-light-theme` package, you should also declare them in your setup using the `addons` key in your project add-on {file}`packages/<name_of_addon>/package.json`.:

```json
  "addons": [
    // other add-ons installed
    "@eeacms/volto-accordion-block",
    "@kitconcept/volto-banner-block",
    "@kitconcept/volto-bm3-compat",
    "@kitconcept/volto-button-block",
    "@kitconcept/volto-carousel-block",
    "@kitconcept/volto-dsgvo-banner",
    "@kitconcept/volto-heading-block",
    "@kitconcept/volto-highlight-block",
    "@kitconcept/volto-introduction-block",
    "@kitconcept/volto-logos-block",
    "@kitconcept/volto-separator-block",
    "@kitconcept/volto-slider-block",
    "@plonegovbr/volto-social-media",
    "@kitconcept/volto-light-theme",
  ],
```

Find the full list of the {doc}`../reference/recommended-addons`.

```{note}
If you don't want to use any of the recommended add-ons, then remove them and don't declare them as add-ons in your project, leaving only those that you want.
```
