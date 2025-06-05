---
myst:
  html_meta:
    "description": "Volto Light Theme upgrade guide"
    "property=og:description": "Volto Light Theme upgrade guide"
    "property=og:title": "Upgrade guide"
    "keywords": "Volto Light Theme, upgrade guide"
---

# Upgrade guide

## volto-light-theme 7.0.0

### The card primitive has been applied to the Teaser block

```{versionadded} 7.0.0-alpha.0
```

The Teaser block now uses the new `Card` primitive.
It is a new component that provides a consistent way to display content in a card format.
It is used in the Teaser block, and it can be used in other blocks as well.
The card component has the feature of allowing the user to select the text inside the card.
From a developer's perspective, you can pass the elements (insets) inside the card as props.

If you have customized the Teaser block or any of its variants (left, right, top), you might need to adapt your customizations to use the new `Card` component.
The inner structure of the Teaser block has changed, and the CSS classes have been updated to use the new `Card` component.

Old structure:

```html
<div class="block teaser">
  <a>
    <div class="teaser-item default">
      <div class="image-wrapper">
        <img src="..." alt="..." />
      </div>
      <div class="content">
        <h2 class="title">...</h2>
        <p class="description">...</p>
      </div>
    </div>
  </a>
</div>
```

New structure:

```html
<div class="block teaser">
  <div class="card">
    <a>
      <div class="card-inner">
        <div class="image-wrapper">
          <img src="..." alt="..." />
        </div>
        <div class="card-summary">
          <h2 class="title">...</h2>
          <p class="description">...</p>
        </div>
      </div>
    </a>
  </div>
</div>
```

- `teaser-item default` class has been replaced by the `card-inner` class.
- `content` class has been replaced by the `card-summary` class.
The rest of the structure remains roughly the same.

### The Teaser `Body` component has been shadowed

```{versionadded} 7.0.0-alpha.4
```

The shadow does not include the placeholder in case that the teaser is empty.
This makes it easier to customize the Teaser block without having to override the entire component, including the placeholder.
This is an excerpt of the new shadowed Teaser `Body` component:

```tsx
<BlockWrapper
  {...props}
  className={cx(
    { [`${hasType?.toLowerCase()}-teaser`]: hasType },
    className,
  )}
>
  {isEmpty(data.href) && isEditMode ? (
    <div className="ui message">
      <div className="teaser-item placeholder">
        <img src={imageBlockSVG} alt="" />
        <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
      </div>
    </div>
  ) : (
    <BodyComponent {...props} />
  )}
</BlockWrapper>
```

If you have customized Teaser Body components, or registered components with `Teaser` depending on the content type, you will need to remove the `placeholder` from your them, as it is now handled by the `Body` component.

## volto-light-theme 6.0.0

This section describes how to upgrade to volto-light-theme 6.0.0 from 5.x.x.
See each major version to upgrade between major versions.

### New `kitconcept.voltolighttheme` backend package

VLT is now a package with both frontend and backend add-ons.
Although it is not strictly mandatory, it is recommended for a better experience that you install the new backend package `kitconcept.voltolighttheme` in your backend build.
Enable the site customization behaviors at least to your Plone site as shown in the {ref}`site-customization` documentation.

### New look and feel and features for the footer
```{versionadded} 6.0.0-alpha.22
```

The footer has been overhauled to be more modular and extensible without shadowing.
It has defined slots for the `preFooter`, `postFooter`, `footer`, `footerLinks`, and `followUs` areas.

It now also features the integration of `@plonegovbr/volto-social-media` so you can easily add social media links to your footer.
See the section {ref}`plonegovbr-volto-social-media-label` for more information.

If you have customized the footer in your site, you might need to adapt your customizations to use the new elements or remove the things that your design doesn't need.

```{image} /_static/footer6.png
:alt: Updated footer in VLT 6.0.0
```


(plonegovbr-volto-social-media-label)=

### `@plonegovbr/volto-social-media` integration
```{versionadded} 6.0.0-alpha.22
```

`@plonegovbr/volto-social-media` is a new feature that adds social media links and icons to your Plone site or subsite footer.
It requires a new behavior `plonegovbr.socialmedia.links` to be installed in your Plone site or subsite.
See the {ref}`social-media` section for more information.


### All feature flags have been removed
```{deprecated} 6.0.0-alpha.20
```

VLT used to have feature flags in the Volto configuration to enable or disable some theme features:

- `config.settings.intranetHeader`
- `config.settings.enableFatMenu`
- `config.settings.siteLabel`

These have been removed as feature flags, and moved to site customization settings.
They are provided by the `voltolighttheme.header` behavior in the `kitconcept.voltolighttheme` add-on.

### Plone portal actions in headers are no longer supported
```{deprecated} 6.0.0-alpha.20
```

VLT no longer shows the Plone "portal actions" in the theme headers.
They have been replaced by the add-on {ref}`site-customization-actions` feature.
It is controlled by the `headers_actions` field, provided by the `voltolighttheme.header` behavior in the `kitconcept.voltolighttheme` add-on.

### Updated data structure for `footer_links` and `footer_logos`.

```{versionadded} 6.0.0-alpha.17
```

The data structure used to hold the fields `footer_links` and `footer_logos` have changed.
It used to have a blocks data structure (with `blocks` and `blocks_data`), but has been updated to use a bare array with the objects inside using the `object_list` widget.
For the record, these are the shapes of the new objects:

```ts
type hrefType = {
  '@id': string;
  title: string;
} & Partial<Brain>;

type footerLink = {
  '@id': string;
  title: string;
  href: Array<hrefType>;
};

type footerLogo = {
  '@id': string;
  title: string;
  logo: Image;
  href: Array<hrefType>;
};

type footerLinks = Array<footerLink>
type footerLogos = Array<footerLogo>
```

```{versionadded} 6.0.0-alpha.18
```

An automatic upgrade step is provided with this version that updates the data structure in your Plone site root when the `kitconcept.voltolighttheme` behaviors are applied there.

If you've applied these behaviors to other content types, you'll need to create a custom upgrade step based on this one to update those content objects accordingly.
The [provided upgrade step](backend/src/kitconcept/voltolighttheme/upgrades/v20250321001.py) serves as a helpful reference implementation.

### `Anontools` component removed from headers
```{deprecated} 6.0.0-alpha.22
```

The `Anontools` component was included alongside the site actions.
If you want to restore it, you can add it as a header action by adding it to the `headers_actions` field, provided by the `voltolighttheme.header` behavior in the `kitconcept.voltolighttheme` add-on.

### Color definitions

The VLT has migrated to use the standardized color definitions in Volto.
These new definitions use CSS properties that are injected at runtime in the right places, so your CSS can adapt to use them in a generic way.
The resultant CSS is simpler, and there's no need to define class names for each color definition.
Read more about them in: https://6.docs.plone.org/volto/development/color-picker-widget.html?highlight=color#custom-css-properties-as-color-definitions

The new color definitions are no longer hardcoded, and now they are stored in `config.blocks.themes` for extensibility from your add-ons.

```ts
  config.blocks.themes = [
    {
      style: {
        '--theme-color': '#fff',
        '--theme-high-contrast-color': '#ecebeb',
        '--theme-foreground-color': '#000',
        '--theme-low-contrast-foreground-color': '#555555',
      },
      name: 'default',
      label: 'Default',
    },
    {
      style: {
        '--theme-color': '#ecebeb',
        '--theme-high-contrast-color': '#fff',
        '--theme-foreground-color': '#000',
        '--theme-low-contrast-foreground-color': '#555555',
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

### Block widths

VLT has started to use the standard block width definition as well.
It's stored in `config.settings.blocksWidths`.
It uses a new widget component that would be ported to Volto core as soon as it's ready.
This component saves the value of the custom CSS property `--block-width` as a StyleWrapper value, so it can be used later when the StyleWrapper injects it in the block (or component) markup.

### Removed `AlignWidget` from {file}`src/components/Widgets`

This component is removed because it was obsolete.
Use the `blockAlignment` or `blockWidth` widgets instead.

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
