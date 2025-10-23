---
myst:
  html_meta:
    "description": "Volto Light Theme recommended add-ons"
    "property=og:description": "Volto Light Theme recommended add-ons"
    "property=og:title": "Recommended add-ons"
    "keywords": "Volto Light Theme, add-ons, recommended"
---

# Recommended add-ons

`@kitconcept/volto-light-theme` works with the core Plone Blocks and with the blocks provided by these add-ons:

-   [Banner Block](https://www.npmjs.com/package/@kitconcept/volto-banner-block)
-   [Button Block](https://www.npmjs.com/package/@kitconcept/volto-button-block)
-   [Carousel Block](https://www.npmjs.com/package/@kitconcept/volto-carousel-block)
-   [Heading Block](https://www.npmjs.com/package/@kitconcept/volto-heading-block)
-   [Highlight Block](https://www.npmjs.com/package/@kitconcept/volto-highlight-block)
-   [Introduction Block](https://www.npmjs.com/package/@kitconcept/volto-introduction-block)
-   [Logos Block](https://www.npmjs.com/package/@kitconcept/volto-logos-block)
-   [Separator Block](https://www.npmjs.com/package/@kitconcept/volto-separator-block)
-   [Slider Block](https://www.npmjs.com/package/@kitconcept/volto-slider-block)
-   [EEA Accordion Block](https://www.npmjs.com/package/@eeacms/volto-accordion-block)
-   [@plonegovbr Social Media Block](https://www.npmjs.com/package/@plonegovbr/volto-social-media)

It also works well with the following add-ons:

-   [DSGVO Banner](https://www.npmjs.com/package/@kitconcept/volto-dsgvo-banner)

# Known good set of versions

```{versionadded} 8.0.0-alpha.0
```

You can find the known good set of versions of the recommended add-ons in the `VLTRecommendedAddons` section of {file}`frontend/packages/volto-light-theme/package.json`.
Copy these versions to your project add-on {file}`packages/<name_of_addon>/package.json` to ensure full compatibility with `@kitconcept/volto-light-theme`.

```{deprecated} 8.0.0-alpha.0
```

Until VLT 7.x.x, the known good set of versions of the recommended add-ons were listed in the `peerDependencies` section of {file}`frontend/packages/volto-light-theme/package.json`, and installed by default when installing `@kitconcept/volto-light-theme`.
In version 8 and above, they are no longer included as `peerDependencies` and need to be installed manually as described above.
