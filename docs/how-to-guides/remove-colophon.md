---
myst:
  html_meta:
    "description": "Remove the colophon from the Volto Light Theme"
    "property=og:description": "Remove the colophon from the Volto Light Theme"
    "property=og:title": "Remove colophon"
    "keywords": "Volto Light Theme, colophon, remove colophon"
---

# How to remove the default colophon slot
The colophon is a Volto Light Theme feature that allows you to add a colophon to your site.

To remove the colophon from your site, you can use the `unRegisterSlotComponent` method in your add-on's configuration file.

```ts
config.unRegisterSlotComponent('postFooter', 'Colophon', 0);
```

## Override Colophon slot
You also have the option to override the slot using component shadowing.
To do this, you create the shadow in the `customizations` folder of your add-on with this path:

`src/customizations/@kitconcept/volto-light-theme/components/Footer/slots/Colophon.tsx`
