# Upgrade Guide

## volto-light-theme 3.0.0

### Blocks background colors go full width

The background colors previously used to snap to 1440px.
From 3.0.0-alpha.0 this changed to be unconstrained by default, and expand to the end of the horizontal viewport.

### Upgraded support for volto-slider-block 6.0.0

VLT upgraded the dependency on `@kitconcept/volto-slider-block` to use `6.0.0`.

This is a drop-in replacement, so no action is required for the existing slider blocks you may have already in your sites.
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

For more information, please check the https://github.com/kitconcept/volto-slider-block/blob/main/README.md [#288](https://github.com/kitconcept/volto-light-theme/pull/288)

### Language switcher shows the two letters abbreviation of the languages

Volto default is to show the full name of the language in the language switcher.
VLT now shows only the two letters abbreviation of the language.
