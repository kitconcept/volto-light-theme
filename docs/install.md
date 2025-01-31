---
myst:
  html_meta:
    "description": "How to install Volto Light Theme"
    "property=og:description": "How to install Volto Light Theme"
    "property=og:title": "Install"
    "keywords": "Volto Light Theme, install"
---

# Install

Along with the `@kitconcept/volto-light-theme` package, you should also install in your setup the following add-ons.

```json
  "dependencies": {
    "@eeacms/volto-accordion-block": "^10.4.6",
    "@kitconcept/volto-button-block": "^3.0.2",
    "@kitconcept/volto-dsgvo-banner": "^2.3.2",
    "@kitconcept/volto-heading-block": "^2.4.0",
    "@kitconcept/volto-highlight-block": "^4.0.0",
    "@kitconcept/volto-introduction-block": "^1.0.0",
    "@kitconcept/volto-separator-block": "^4.1.2",
    "@kitconcept/volto-slider-block": "^6.3.1",
    "@kitconcept/volto-light-theme": "^5.0.1",
  }
```

```{note}
The version numbers of these add-ons are merely illustrative, but current as of 2024-11-04.
You should update the versions to their latest.
```

This theme won't install the add-ons for you, as they are declared as `peerDependencies`.
This is because the theme won't have to force you to use any specific add-on version, and avoids package hoisting issues.

In your project or policy add-on {file}`package.json` you should declare all of them as Volto add-ons

```json
"addons": [
  "@eeacms/volto-accordion-block",
  "@kitconcept/volto-button-block",
  "@kitconcept/volto-dsgvo-banner",
  "@kitconcept/volto-heading-block",
  "@kitconcept/volto-introduction-block",
  "@kitconcept/volto-highlight-block",
  "@kitconcept/volto-separator-block",
  "@kitconcept/volto-light-theme",
  "@kitconcept/volto-slider-block",
  "your_policy_addon_here"
],
```

Your policy add-on should be the last one, so that it overrides any previous ones.
`@kitconcept/volto-light-theme` should be the second-last, placed immediately before your policy add-on.

Then, declare the theme in your project {file}`package.json`.

```json
"theme": "@kitconcept/volto-light-theme",
```

Alternatively, you can declare it in your project's {file}`volto.config.js`.

```js
const addons = [];
const theme = '@kitconcept/volto-light-theme';

module.exports = {
  addons,
  theme,
};
```

Although you can specify your project add-ons in {file}`volto.config.js`, sometimes it is better to have them all in one place in your policy add-on for portability.
