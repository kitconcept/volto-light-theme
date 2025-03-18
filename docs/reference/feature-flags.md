---
myst:
  html_meta:
    "description": "Feature flags"
    "property=og:description": "Feature flags"
    "property=og:title": "Feature flags"
    "keywords": "Volto Light Theme, Feature Flags, fat menu, siteLabel, intranetHeader"
---

# Feature flags

Volto Light Theme has the following feature flags that you can enable or disable.


## Enable fat menu

```{versionadded} 2.0.0
```

Since 2.0.0, the light theme has a fat menu, located below the main site sections.
You can trigger it by clicking on one of the main site sections.
It's behind a feature flag, as configured as an opt-out by default.

```js
config.settings.enableFatMenu = true;
```


## Show `siteLabel`

To show a label on top of the site, you can pass a label name to the `siteLabel` property.

```js
config.settings.siteLabel = 'Plone Intranet';
```

If you want a translatable label, then you must define a translation object in the `defineMessages` function, provided by [`react-intl`](https://www.npmjs.com/package/react-intl).

You will need to add the following code snippets in your add-on's {file}`index.js` file.
If you don't have an add-on, then you can also add them in your {file}`config.js` file in root of your frontend folder.

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


## Show `intranetHeader`

We have a totally different header for intranet sites.
If you want that, you can enable it by passing the `intranetHeader` property.

```js
config.settings.intranetHeader = true;
```
