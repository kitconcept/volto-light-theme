---
myst:
  html_meta:
    "description": "Volto Light Theme slots definitions"
    "property=og:description": "Volto Light Theme slots definitions"
    "property=og:title": "Slots"
    "keywords": "Volto Light Theme, Slots"
---

# Slots

Volto Light Theme provides a set of slots that can be used to customize the layout and structure of your pages.
Slots are predefined areas in the page where you can place components.
Learn more about slots in the [Volto documentation](https://6.docs.plone.org/volto/configuration/slots.html).

## Usage

You can add a component to a predefined slot by registering it in your add-on's configuration.

```ts
import FooterLogos from '@kitconcept/volto-light-theme/components/Footer/slots/FooterLogos';

config.registerSlotComponent({
  name: 'footerLogos',
  slot: 'preFooter',
  component: FooterLogos,
});
```

The `FooterLogos` component will be rendered in the `preFooter` slot of the page.

## `aboveHeader` slot
The `aboveHeader` slot is a slot that can be used to add content above the header of the page.

## `belowHeader` slot
The `belowHeader` slot is a slot that can be used to add content below the header of the page.

## `headerTools` slot
The `headerTools` slot is a slot that can be used to add content in the header tools (top-most right) area of the page.

## `preFooter` slot
The `preFooter` slot is a slot that can be used to add content before the footer of the page.

## `postFooter` slot
The `postFooter` slot is a slot that can be used to add content after the footer of the page.

## `footer` slot
The `footer` slot is a slot that can be used to add content in the main footer area of the page.

## `followUs` slot
The `followUs` slot is a slot that can be used to add content in the footer "followUs" area of the page.

## `footerLinks` slot
The `footerLinks` slot is a slot that can be used to add content in the footer "links" area of the page.
