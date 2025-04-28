---
myst:
  html_meta:
    "description": "Customization behavior for kitconcept distributions in Volto Light Theme"
    "property=og:description": "Customization behavior for kitconcept distributions in Volto Light Theme"
    "property=og:title": "Customization behavior for kitconcept distributions in Volto Light Theme"
    "keywords": "Plone, customization, behavior, distributions, Volto Light Theme"
---

(site-customization)=

# Customization behavior for kitconcept distributions

VLT supports site customization via the add-on `kitconcept.voltolighttheme`.
This add-on has behaviors that can be applied to any content type.
These behaviors provide fields that allow you to customize the properties and the look and feel of the site.

In Volto, content types also work as a directory in a file system tree where they can contain additional content types.
In VLT, through the use of the `@inherit` endpoint, children inherit the behaviors from `kitconcept.voltolighttheme` from the closest ancestor.

In the module {file}`distributions.py`, you can find the behaviors that are used to customize the site.
They are used to customize sites created from kitconcept's distributions.
You can use them to customize your site as well if they fit your needs.

## `kitconcept.distributions.footer` behavior

It adds further customizations the footer of the site, adding a core central footer with four columns.
