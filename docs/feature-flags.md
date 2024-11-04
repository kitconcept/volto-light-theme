# Feature Flags

## Enable Fat Menu

Since 2.0.0, the light theme has a fat menu (below the main site sections) triggered clickin on one of them.
It's behind a feature flag, as opt-out:

```js
config.settings.enableFatMenu = true;
```

## Show Site Label

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

## Show intranetHeader

We have totally different header for intranet sites. If you want that, you can enable it by passing `intranetHeader` property.

```js
config.settings.intranetHeader = true;
```
