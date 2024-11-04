# Install

It is recommended that along `@kitconcept/volto-light-theme` package, you also install in your setup the aforementioned add-ons.

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

Alternatively, you can also declare it in your project's `volto.config.js`:

```js
const addons = [];
const theme = '@kitconcept/volto-light-theme';

module.exports = {
  addons,
  theme,
};
```

You can specify your project add-ons in `volto.config.js`, but sometimes is better to have them all in one place (in your policy add-on) for portability.
