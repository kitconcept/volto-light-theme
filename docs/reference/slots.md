---
myst:
  html_meta:
    "description": "Volto Light Theme slots definitions"
    "property=og:description": "Volto Light Theme slots definitions"
    "property=og:title": "Slots"
    "keywords": "Volto Light Theme, Slots"
---

# Slots

Volto Light Theme provides a set of slots to customize the layout and structure of your pages.
Slots are predefined areas in the page where you can place components.
Learn more about slots in the Volto documentation chapter {doc}`plone:/volto/configuration/slots`.

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

`aboveHeader`
:   The `aboveHeader` slot adds content above the header of the page.

`belowHeader`
:   The `belowHeader` slot adds content below the header of the page.

`headerTools`
:   The `headerTools` slot adds content in the header tools at the top-most right area of the page.
    By default, it has the `Anontools` component, which provides the login, logout, and register links if they are enabled in the [`portal_actions`](https://6.docs.plone.org/backend/portal-actions.html) tool in your Plone site.

`preFooter`
:   The `preFooter` slot adds content before the footer of the page.

`postFooter`
:   The `postFooter` slot adds content after the footer of the page.

`footer`
:   The `footer` slot adds content in the main footer area of the page.

`followUs`
:   The `followUs` slot adds content in the footer "follow us" area of the page.

`footerLinks`
:   The `footerLinks` slot adds content in the footer "links" area of the page.
