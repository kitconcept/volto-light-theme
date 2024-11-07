---
myst:
  html_meta:
    "description": "Volto Light Theme upgrade guide"
    "property=og:description": "Volto Light Theme upgrade guide"
    "property=og:title": "Upgrade guide"
    "keywords": "Volto Light Theme, upgrade guide"
---

# Upgrade guide

## volto-light-theme 6.0.0

### Color definitions

The VLT has migrated to use the standardized color definitions in Volto.
These new definitions use CSS properties that are injected at runtime in the right places, so your CSS can adapt to use them in a generic way.
The resultant CSS is simpler, and there's no need to define class names for each color definition.
Read more about them in: https://6.docs.plone.org/volto/development/color-picker-widget.html?highlight=color#custom-css-properties-as-color-definitions

The new color definitions are no longer hardcoded, and now they are stored in `config.settings.backgroundColors`.

```ts
config.settings.backgroundColors = [
  {
    style: {
      '--background-color': 'transparent',
    },
    name: 'transparent',
    label: 'Transparent',
  },
  {
    style: {
      '--background-color': '#ecebeb',
    },
    name: 'grey',
    label: 'Grey',
  },
];
```

```css
.block.teaser {
  background-color: var(---background-color, #fff)
}
```

If you extended or modified the default background colors in VLT, you need to move the colors that you are using accordingly to the new definitions.
Once the new definitions are in place, there is a content reducer transform in place that will convert the blocks on the fly.
Whenever you save an object, the object will be saved using the new styling.
Make sure that you use the same `name` as before when you update your color definitions.


### Block widths

VLT has started to use the standard block width definition as well.
It's stored in `config.settings.blocksWidths`.
It uses a new widget component that would be ported to Volto core as soon as it's ready.
This component saves the value of the custom CSS property `--block-width` as a `StyleWrapper` value, so it can be used later when the `StyleWrapper` injects it in the block (or component) markup.


## volto-light-theme 5.0.0

The requirements for VLT have changed:

| VLT version | Volto version |
|-------------|---------------|
|   3.x.x  |   >= Volto 17.0.0-alpha.16  |
|   4.x.x  |   < Volto 17.18.0  |
|   5.x.x  |   >= Volto 17.18.0 or >=Volto 18.0.0-alpha.36  |


## volto-light-theme 4.0.0

The tabbing order in the top header was fixed for accessibility concerns.
It modifies the underlying HTML, moving from the top header to the bottom, and modifies the CSS to adjust.

The `MobileNavigation` component was updated to be more easily customizable.
The component can now handle infinite navigation depth instead of only three levels, if configured to do so.
The Burger Menu can now be easily customized by overriding the new {file}`MobileNavigationToggler.jsx` file.


## volto-light-theme 3.0.0

### Blocks background colors go full width

The background colors previously snapped to 1440px.
From 3.0.0-alpha.0 onward, this changed to be unconstrained by default, and expands to the end of the horizontal viewport.


### Upgraded support for volto-slider-block 6.0.0

VLT upgraded the dependency on `@kitconcept/volto-slider-block` to use `6.0.0`.

This is a drop-in replacement, so no action is required for the existing slider blocks you may already have in your sites.
However, the CSS classes of the structural slider block elements changed in this version.
The inner (visible objects) CSS classes remain unchanged.
If you have customized them in your project, you may have to update them, although the structural class names are rarely customized aside from vertical spacing properties.
They are mapped 1:1 with the previous ones, following this table correspondence:

| Old className   | New className    |
| --------------- | ---------------- |
| slick-slider    | slider-wrapper   |
| slick-list      | slider-viewport  |
| slick-track     | slider-container |
| slick-slide     | slider-slide     |
| slick-arrow     | slider-button    |
| slick-prev      | slider-button-prev |
| slick-next      | slider-slide-next  |
| slick-next      | slider-slide-next  |
| slick-dots      | slider-dots      |
| slick-dot       | slider-dot       |

For more information, check the https://github.com/kitconcept/volto-slider-block/blob/main/README.md and [#288](https://github.com/kitconcept/volto-light-theme/pull/288).


### Language switcher shows the two-letter language code

The default in Volto is to show the full name of the language in the language switcher.
VLT now shows only the two-letter language code.
