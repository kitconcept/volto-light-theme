---
myst:
  html_meta:
    "description": "Social media integration in Volto Light Theme"
    "property=og:description": "Social media integration in Volto Light Theme""
    "property=og:title": "Social media"
    "keywords": "Volto Light Theme, social media"
---

(social-media)=

# Social media

```{versionadded} 6.0.0-alpha.22
```

VLT integrates with the add-on `@plonegovbr/volto-social-media` to provide behaviors for adding social media links and main configuration to your site.
You can use it to customize your site, as well as the behaviors in `kitconcept.voltolighttheme`, if they fit your needs.

It has two behaviors:
- `plonegovbr.socialmedia.links`
- `plonegovbr.socialmedia.settings`

You can add these behaviors to any content type, such as `Plone Site` or `Subsite`, to add the social media links and main configuration to your site.

It is recommended to add the behavior `plonegovbr.socialmedia.settings` to your Plone site, and the behavior `plonegovbr.socialmedia.links` to your site and subsites as well.

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
    <element value="plonegovbr.socialmedia.settings" />
    <element value="plonegovbr.socialmedia.links" />
  </property>
</object>
```
