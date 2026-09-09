---
myst:
  html_meta:
    "description": "VLT block catalog — every block, its variants, data and rendered HTML"
    "property=og:description": "VLT block catalog — every block, its variants, data and rendered HTML"
    "property=og:title": "VLT Block Catalog"
    "keywords": "Plone, Volto, Volto Light Theme, blocks, catalog"
---

# Block Catalog

Every VLT block: what it is for, its variants, the data that drives it, and the
rendered HTML structure (real VLT class names). Each block has a Storybook story
under `Blocks/<Name>` — open it to inspect the live DOM. For screenshots of every
variant, see the visual block catalog linked from the {doc}`Design System overview <index>`.

All blocks render inside the content-area skeleton (see {doc}`composition`):
`#page-document > .blocks-group-wrapper.<theme> > .block.<type>`. The per-block
markup below is what goes **inside** the group wrapper.

Legend: 🎨 = supports `theme` (default/grey band) · ↔ = supports alignment · ⇔ =
supports width tokens.

---

## Teaser  🎨 ↔
A card linking to a content item: image + kicker + title + description.
**Variants:** align `left` / `right` / `center` (image left / right / on top);
document vs person source; `person-squared-images` (square portraits); grey.
**Data:** `href` (target with `image_scales`), `title`, `head_title`, `description`, `styles.align`.

```html
<div class="block teaser document-teaser has--align--left has--block-width--default">
  <div class="card">
    <div class="card-inner">
      <div class="image-wrapper"><img class="responsive" src="…" alt=""></div>
      <div class="card-summary">
        <span class="supertitle">Kicker</span>
        <h2 class="headline">Title</h2>
        <p class="description">Description…</p>
      </div>
    </div>
  </div>
</div>
```

## Grid Teaser (`gridBlock`)  🎨
A responsive row of 1–4 cards (teasers, images…). Full-width-ish (layout).
**Variants:** 1/2/3/4 columns; document or person cards; grey band ("inversed").
**Data:** `blocks` + `blocks_layout` (each nested block a teaser); `theme`.

```html
<div class="block gridBlock four has--block-width--default">
  <!-- one .block.teaser per column -->
  <div class="block teaser …">…</div>
</div>
```

## Listing  🎨
Renders a query result set via a **variation** template.
**Variants (variation):** `default` (List), `summary` (List with images),
`grid`, `eventCalendar`; person data; `person-squared-images`; grey.
**Data:** `items` (result items); `variation`.

```html
<div class="block listing">
  <!-- summary variation: -->
  <div class="listing-item"><div class="card">…</div></div>
</div>
```

## Slider  🎨
Full-bleed carousel of slides (Embla). Bounded to layout width.
**Variants:** `default` (full-bleed image slides) / `simple` (card with flag);
single slide; hidden button; grey (simple variation paints the card grey).
**Data:** `slides[]` (each: `href`, `title`, `head_title`, `description`,
`buttonText`), `variation`, `theme`.

```html
<div class="block slider default" style="--slider-container-width:…">
  <div class="slider-wrapper">
    <button class="slider-button slider-button-prev">…</button>
    <button class="slider-button slider-button-next">…</button>
    <div class="slider-viewport"><div class="slider-container">
      <div class="slider-slide">…teaser-item…</div>
    </div></div>
  </div>
  <div class="slider-dots"><button class="slider-dot slider-dot--selected"></button>…</div>
</div>
```
Note: dot color comes from the theme variables — the slider must sit in a
`.blocks-group-wrapper`.

## Separator  🎨 ↔ ⇔
A horizontal rule. **Variants:** full line vs `shortLine` (165px); align
left/center/right (short line only); width narrow/default; grey.
**Data:** `styles.shortLine`, `styles['align:noprefix']`, `styles['blockWidth:noprefix']`.

```html
<div class="block separator has--shortLine--true has--block-alignment--center">
  <div class="line"></div> <!-- the visible rule is .line::after -->
</div>
```

## Logos
A grid of logos, optionally linked. **Variants:** size `s` / `l`; container width
`default` / `layout`.
**Data:** `logos[]` (each `logo` image + `href`), `logos_size`, `logos_container_width`.

```html
<div class="block logos">
  <div class="q container default">
    <ul class="logos-container s">
      <li class="item"><a class="logo-link"><img class="logo-image" src="…"></a></li>
    </ul>
  </div>
</div>
```

## Introduction  🎨
A large, light lead paragraph (Slate rich text). **Variants:** grey.
**Data:** `value` (Slate nodes); `theme`.

```html
<div class="block introduction">
  <div class="block-container">
    <p>Lead paragraph text with <strong>bold</strong> and <em>italic</em>…</p>
  </div>
</div>
```
Lead text = size `l` (24px), weight light (300), constrained to default width.

## Highlight  🎨
Image + a colored description panel (kicker/title/rich text/button).
**Variants:** description color (7 named colors — see tokens); with/without
button; grey band.
**Data:** `url`+`image_scales`, `headtitle`, `title`, `value` (Slate desc),
`button`/`buttonText`/`buttonLink`, `styles.descriptionColor`.

```html
<div class="block highlight" style="--descriptionColor:#306F7E; --descriptionColor-foreground:#fff;">
  <div class="teaser-item top block-inner-container">
    <div class="highlight-image-wrapper"><img src="…" alt=""></div>
    <div class="highlight-description"><div class="teaser-description-title">
      <div class="headtitle"><div>Kicker</div></div>
      <div class="title"><h2>Title</h2></div>
      <div class="description">…</div>
      <a class="button">Continue reading</a>
    </div></div>
  </div>
</div>
```

## Heading  🎨
A section heading (`h2` in VLT). **Variants:** grey.
**Data:** `heading`, `tag` (h2), `theme`.

```html
<div class="block heading">
  <div class="heading-wrapper"><h2 class="heading">This is a section heading</h2></div>
</div>
```

## Carousel  🎨
A horizontally scrolling row of teaser cards. **Variants:** `items_to_show` 2 or 4
(→ `.two`/`.four`); arrows+dots when items exceed items_to_show; headline;
hide description; grey.
**Data:** `columns[]` (teaser items), `items_to_show`, `headline`, `hide_description`.

```html
<div class="block carousel">
  <h2 class="headline">…</h2>
  <div class="carousel-wrapper four">
    <button class="…prev"></button><button class="…next"></button>
    <div class="carousel-viewport"><div class="carousel-container">
      <div class="block teaser">…</div>
    </div></div>
  </div>
  <div class="carousel-dots"><button class="carousel-dot carousel-dot--selected"></button>…</div>
</div>
```

## Event Calendar (`eventCalendar`)  🎨
A search-driven list of Event content as calendar cards (date inset + summary),
with a date-range picker + search input.
**Variants:** with/without headline. **Data (results):** event items with
`start`, `end`, `title`, `head_title`, `description`.

```html
<div class="block eventsearch eventCalendar">
  <div class="search-block-event searchBlock-facets">
    <div class="first-row">…date range picker + search…</div>
    <div class="event-calendar items">
      <div class="card-listing"><div class="card event-card">
        <div class="date-inset"><div class="day">15</div><div class="month">Sep 2026</div></div>
        <div class="card-summary">…</div>
      </div></div>
    </div>
  </div>
</div>
```

## Search  🎨
Site search: search input + optional facets + results listing.
**Variants:** with/without headline; facets. **Data (results):** content items;
`facetsTopSide` variation supplies the chrome.

```html
<div class="block search facetsTopSide">
  <div class="searchBlock-container">
    <div class="searchBlock-facets">…SearchInput…</div>
    <!-- results via the default listing variation -->
  </div>
</div>
```

## Button (`__button`)  🎨 ↔ ⇔
A single call-to-action button (bordered link). **Variants:** align
left/center/right; width narrow/default; with link (`<a>`) vs without
(`<button class="noLink">`); grey.
**Data:** `title`, `href`, `styles['align:noprefix']`, `styles['blockWidth:noprefix']`.

```html
<div class="block __button">
  <div class="button container"><div class="align">
    <a class="button" href="…">Read more</a>
  </div></div>
</div>
```

## Accordion  🎨
A container of collapsible panels; each panel holds nested blocks.
**Variants:** collapsed vs first-open; headline; right-side arrows; grey;
filtering.
**Data:** `data.data` (panels: `{ title, blocks, blocks_layout }`), `title_size`,
`collapsed`, `right_arrows`.

```html
<div class="accordion-block">
  <div class="accordion" >
    <h3 class="title accordion-title align-arrow-left" role="button">
      <span>Panel title</span>
    </h3>
    <div class="content active">…nested blocks…</div>
  </div>
</div>
```

## Follow Us (`followUsBlock`)  ↔
A row of social-network icon links. **Variants:** with/without title; animated
icons; align.
**Data:** `title`, `animate`, `allowedNetworks`; networks come from
`config.settings.socialNetworks` (each `{ id, title, href }`).

```html
<div class="block follow_us">
  <div class="follow_us title">Follow us</div>
  <ul class="social-networks">
    <li class="item"><a class="social-network item facebook"><svg></svg></a></li>
  </ul>
</div>
```

## Banner  🎨 ⇔
Full-width image banner with 1–2 lines of overlaid text (gradient overlay).
**Variants:** width `layout` / `full`; single vs two lines; grey.
**Data:** `url` (image), `alt`, `text`, `additionalText`, `styles['blockWidth:noprefix']`.

```html
<div class="block banner has--block-width--full">
  <div class="banner container">
    <img class="image" src="…/@@images/image" alt="…">
    <div class="banner-inner-container"><div class="text">
      <p>Line 1</p><p>Line 2</p>
    </div></div>
  </div>
</div>
```

## Text (Slate) (`slate`)  🎨
Rich text: headings, paragraphs (with **bold** / *italic* / links), lists.
**Variants:** grey.
**Data:** `value` (Slate nodes). Marks are inline **element** nodes
(`{type:'strong',children:[…]}`), not leaf props.

```html
<div class="block slate">
  <h2>A section title</h2>
  <p>Text with <strong>bold</strong> and <em>italic</em>.</p>
  <ul><li>Item</li></ul>
</div>
```

## Image  🎨 ↔ ⇔
A standalone image with optional caption and link. **Variants:** size `l`/`m`/`s`;
align left/center/right; with caption; grey.
**Data:** `url`+`image_scales`, `alt`, `title`/`description`/`copyright_and_sources`
(caption), `styles['size:noprefix']`, `styles['align:noprefix']`.

```html
<div class="block image">
  <figure>
    <img class="responsive" src="…" alt="…">
    <figcaption class="figure-caption">…title / description / credit…</figcaption>
  </figure>
</div>
```

## Video  🎨 ↔
An embedded video (YouTube/Vimeo/mp4) shown as poster + play button until
clicked. **Variants:** align left/right/center/`full`; grey.
**Data:** `url` (video URL), `align`, optional `preview_image`.

```html
<div class="block video align center">
  <div class="video-inner"><div class="ui embed video-embed 16:9">
    <img class="placeholder" src="https://img.youtube.com/vi/<id>/sddefault.jpg">
    <button class="video-play"></button>
  </div></div>
</div>
```

## Table of Contents (`toc`)  🎨
Auto-generated list of links to the page's headings. **Variants:** grey.
**Data:** `title`, `levels`; scans page `properties` for heading blocks.

```html
<div class="block toc">
  <div class="toc"><h2>Table of contents</h2>
    <ul><li><a href="#introduction">Introduction</a></li>…</ul>
  </div>
</div>
```

## Event Metadata (`eventMetadata`)
A fixed block on Event content types: start/end/location/website/contact + ICS
download. **Variants:** timed vs whole-day; open-ended.
**Data:** reads the Event content via `properties` (`start`, `end`, `whole_day`,
`open_end`, `location`, `event_url`, `contact_*`).

```html
<div class="block eventMetadata">
  <div class="details-container"><div class="content-container">
    <div class="event-details">
      <div class="event-title"><span class="event-heading">Start</span>
        <div class="event-detail">October 8, 2026 at 9:00 AM</div></div>
      …End / Location / Website / Contact…
    </div>
  </div>
  <div class="event-button"><a class="ics-download"><button class="event-btn">ICS Download</button></a></div>
  </div>
</div>
```
</content>
