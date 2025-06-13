---
myst:
  html_meta:
    "description": "Customization behavior in Volto Light Theme"
    "property=og:description": "Customization behavior in Volto Light Theme"
    "property=og:title": "Customization behavior in Volto Light Theme"
    "keywords": "Plone, customization, behavior, Volto Light Theme"
---

(site-customization)=

# Site customization

VLT supports site customization via the add-on `kitconcept.voltolighttheme`.
This add-on has behaviors that can be applied to any content type.
These behaviors provide fields that allow you to customize the properties and the look and feel of the site.

In Volto, content types also work as a directory in a file system tree where they can contain additional content types.
In VLT, through the use of the `@inherit` endpoint, children inherit the behaviors from `kitconcept.voltolighttheme` from the closest ancestor.

## Plone site root

Every Plone site has a site root.
Content types inherit the behaviors from this single parent.

## Subsites

Subsites are typically child content types within a Plone Site.
They usually implement {term}`INavigationRoot` behavior.
Language root folders (LRF), such as `/en` or `/ca`, are subsites.
You can create a content type that implements `INavigationRoot`, adding it anywhere in your site tree, and it will work as a subsite.

Subsites can be _nested_, so the settings that are applied are always the ones from the nearest site ancestor to the current content object.

For example, given this structure:

```console
Plone site (/)
└── LRF (/en)
    ├── Document (/en/document1)
    └── Subsite (/en/subsite)
        └── Document (/en/subsite/document2)
```

If `/en` has a custom logo, then `/en/document1` will inherit and show the logo from `/en` because it's `/en/document1`'s nearest site ancestor.

Similarly, if the subsite `/en/subsite` has set a different logo, then `/en/subsite/document2` will show the logo from `/en/subsite` instead of the one set in `/en`.

This lets you create several levels of customizations inside your Plone site.

## Add behaviors

The behaviors are named:

-   `voltolighttheme.header`
-   `voltolighttheme.theme`
-   `voltolighttheme.footer`

These behaviors enable fields for customizing the site in the assigned content type.
You should assign them to the content type that you want to customize.

To add them to a Plone site, add the following snippet to {file}`<your_backend_addon>/profiles/default/types/Plone_Site.xml`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<object xmlns:i18n="http://xml.zope.org/namespaces/i18n"
        meta_type="Dexterity FTI"
        name="Plone Site"
        i18n:domain="plone"
>
  <property name="behaviors"
            purge="false"
  >
    <element value="voltolighttheme.header" />
    <element value="voltolighttheme.theme" />
    <element value="voltolighttheme.footer" />
  </property>
</object>
```

In case you want to add them at the very top of your content type form, you will have to redefine all the current behaviors.

```xml
<?xml version="1.0" encoding="utf-8"?>
<object xmlns:i18n="http://xml.zope.org/namespaces/i18n"
        meta_type="Dexterity FTI"
        name="Plone Site"
        i18n:domain="plone"
>
  <property name="behaviors"
            purge="true"
  >
    <element value="voltolighttheme.header" />
    <element value="voltolighttheme.theme" />
    <element value="voltolighttheme.footer" />
    <element value="plone.dublincore" />
    <element value="plone.relateditems" />
    <element value="plone.locking" />
    <element value="plone.allowdiscussion" />
    <element value="plone.excludefromnavigation" />
    <element value="plone.tableofcontents" />
    <element value="volto.blocks" />
  </property>
</object>
```

```{note}
This is shown as a reference, and will remove any other behavior that you might have customized in your content type (Plone Site) due to the `purge="true"` directive.
You have the option of doing it either programmatically or via ZMI (`portal_types/Plone Site`) in case you want to reorder them manually.
```

## Header

You can customize the following aspects of the header in your site.

### Site logo

You can define the main site logo shown in the top left-most side of the header.

### Complementary logo

You can define a complementary logo in the header.
This is a second logo shown on the right-most side of the header.

### Fat menu

VLT has a fat menu, located below the main site sections.
You can trigger it by clicking on one of the main site sections.
You can disable it, as it's enabled by default.

### Intranet header

Your site can have a different header intended to use in intranet sites.
If enabled, the intranet header will show instead of the default one.

### Intranet flag

If you have enabled the intranet header, the intranet flag is the text in the grey pill at the top of the header.

(site-customization-actions)=

### Actions

You can define the actions located at the top right of the header.
These are links to other pages, each of which is defined by the fields for a title, a target URL, and a boolean for whether or not to open the link in a new tab.

The special actions `login`, `logout`, and `register` are shown if they are enabled in your Plone site as actions.
These can be defined in the {guilabel}`Actions` control panel in the Plone site or programmatically via Generic Setup.

## Theming

You can customize the following aspects of the theming of your site, such as colors for the look and feel of your site.

### Navigation text color

You can customize the navigation text color in this widget.

### Fat menu and breadcrumbs text color

The fat menu is the menu that unfolds when you click on any item in the site section navigation.
You can customize the fat menu text color in this widget.
It also applies to the breadcrumbs text color.

### Fat menu background color

You can customize the fat menu background color in this widget.

### Footer font color

You can customize the footer font color in this widget.

### Footer background color

You can customize the footer background color in this widget.


## Footer

You can customize the following aspects of the footer in your site.

### Footer links

The footer can contain additional links defined in this widget.
These are links to other pages, each of which is defined by the fields for a title, a target URL, and a boolean for whether or not to open the link in a new tab.

### Footer logos

The footer can contain a list of logos.
These are images defined in the site with links to other pages, each of which is defined by the fields for a title, a target URL, and a boolean for whether or not to open the link in a new tab.
Their appearance can be further customized by defining the size of the logos, as either `small` or `large`, and the width of the their container, either `default` or `layout`.

### Footer colophon text

The footer contains a colophon text by default.
It's the last line of the footer.
You can customize it to show any text you want using this option.
