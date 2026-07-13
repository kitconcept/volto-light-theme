---
myst:
  html_meta:
    "description": "How to install Volto Light Theme"
    "property=og:description": "How to install Volto Light Theme"
    "property=og:title": "Install"
    "keywords": "Volto Light Theme, install"
---

# Install

## Frontend

`@kitconcept/volto-light-theme` is a Volto add-on.
It should be installed as any other add-on using the `dependencies` key in your project's add-on file {file}`packages/<name_of_your_project_addon>/package.json`.

```{code-block} json
:caption: {file}`packages/<name_of_addon>/package.json`
{
  "dependencies": {
    "@kitconcept/volto-light-theme": "^8.0.0-alpha.0",
    // other dependencies
  }
}
```

You should also configure `@kitconcept/volto-light-theme` as a Volto add-on using the `addons` key in your project add-on file {file}`packages/<name_of_your_project_addon>/package.json`.

```json
"addons": [
  // other add-ons installed above the declaration of VLT
  // VLT _must_ be the last one declared
  // Your project add-on will still be the last applied
  // if it's defined in `volto.config.js`
  "@kitconcept/volto-light-theme",
],
```

```{versionadded} 18.29.1
```
```{versionadded} 19.0.0-alpha.10
```

You can declare the `@kitconcept/volto-light-theme` as a theme add-on in the {file}`package.json` file of your add-on for either of the respective major version lines in Volto:

- 18.29.1 or later
- 19.0.0-alpha.10 or later

The following snippet shows example configuration.

```{code-block} json
:caption: {file}`packages/<name_of_addon>/package.json`
{
  "addons": [
    // other add-ons installed above the declaration of VLT
    // VLT _must_ be the last one declared
    "@kitconcept/volto-light-theme",
  ],
  "theme": "@kitconcept/volto-light-theme",
  //... other configuration ...
}
```

If you are in an older version of Volto, since `@kitconcept/volto-light-theme` is also a theme add-on, you should declare it in your project's {file}`volto.config.js` `theme` key.

```js
const addons = ['<name_of_your_project_addon>'];
const theme = '@kitconcept/volto-light-theme';

module.exports = {
  addons,
  theme,
};
```

### VLT recommended add-ons

`@kitconcept/volto-light-theme` supports all core blocks and it also supports blocks from selected Volto add-ons.
The recommended add-ons are listed in the {doc}`../reference/recommended-addons` section.

### Install add-ons as dependencies (VLT 8.0.0 and later)

```{versionremoved} 8.0.0-alpha.0
```

VLT 8.0.0 no longer includes the recommended add-ons as `peerDependencies` in {file}`package.json`.
This means that you will need to install them manually if you want to use them in your project.

You should install the recommended add-ons as dependencies in your project's add-on {file}`packages/<name_of_addon>/package.json`.
Nevertheless, you can choose to install only those you want to use.

```{code-block} json
:caption: {file}`packages/<name_of_addon>/package.json`
{
  "dependencies": {
  "@eeacms/volto-accordion-block": "^12.0.0",
  "@kitconcept/volto-banner-block": "^1.2.0",
  "@kitconcept/volto-bm3-compat": "^1.0.0-alpha.1",
  "@kitconcept/volto-button-block": "5.0.0-alpha.2",
  "@kitconcept/volto-calendar-block": "^1.0.0-alpha.9",
  "@kitconcept/volto-carousel-block": "^3.0.0-alpha.1",
  "@kitconcept/volto-dsgvo-banner": "^4.0.0-alpha.2",
  "@kitconcept/volto-heading-block": "^2.5.0",
  "@kitconcept/volto-highlight-block": "^5.0.0-alpha.2",
  "@kitconcept/volto-introduction-block": "^1.4.1",
  "@kitconcept/volto-logos-block": "^4.0.0-alpha.1",
  "@kitconcept/volto-separator-block": "^5.0.0-alpha.0",
  "@kitconcept/volto-slider-block": "^7.0.0-alpha.1",
  "@plonegovbr/volto-social-media": "^3.0.0-alpha.0"
    // other dependencies
  }
}
```

```{warning}
The above list might be outdated, please refer to that section for the full list of recommended add-ons and their known good versions.
```

### Declaring add-ons

Along with the `@kitconcept/volto-light-theme` package, you should also declare them in your setup using the `addons` key in your project add-on {file}`packages/<name_of_addon>/package.json`.:

```json
  "addons": [
    // other add-ons installed
    "@eeacms/volto-accordion-block",
    "@kitconcept/volto-banner-block",
    "@kitconcept/volto-bm3-compat",
    "@kitconcept/volto-button-block",
    "@kitconcept/volto-carousel-block",
    "@kitconcept/volto-dsgvo-banner",
    "@kitconcept/volto-heading-block",
    "@kitconcept/volto-highlight-block",
    "@kitconcept/volto-introduction-block",
    "@kitconcept/volto-logos-block",
    "@kitconcept/volto-separator-block",
    "@kitconcept/volto-slider-block",
    "@plonegovbr/volto-social-media",
    "@kitconcept/volto-light-theme",
  ],
```

Find the full list of the {doc}`../reference/recommended-addons`.

```{note}
If you don't want to use any of the recommended add-ons, then remove them and don't declare them as add-ons in your project, leaving only those that you want.
```

## Backend

VLT has a Plone backend add-on that is required to be installed in your Plone backend.
The backend add-on is called `kitconcept.voltolighttheme` you need to take these steps to install it:

1. Pull it as a dependency in your Plone backend add-on {file}`pyproject.toml`:

```toml
[project]
dependencies = [
    <!-- Other deps here -->
    "kitconcept.voltolighttheme = "^8.0.0"
]
```

2. Run `make install` in your Plone backend folder to install the dependency.

3a. Install it in your Plone backend site using the Add-ons control panel.

3b. or alternatively, if you have an existing site and do you want to install it programmatically using GenericSetup in `metadata.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<metadata>
  <version>20260714001</version>
  <dependencies>
    <dependency>profile-kitconcept.voltolighttheme:default</dependency>
  </dependencies>
</metadata>
```

then in `upgrades.zcml`:

```xml
<genericsetup:upgradeStep
    title="Install kitconcept.voltolighttheme dependency"
    description="Install the newly required kitconcept.voltolighttheme profile."
    source="1000"
    destination="20260714001"
    handler=".upgrades.install_kitconcept_voltolighttheme"
    profile="your.package:default"
/>
```

and in `upgrades.py`:

```python
from plone import api

def install_kitconcept_voltolighttheme(context):
    """Install the kitconcept.voltolighttheme profile."""
    setup_tool = api.portal.get_tool("portal_setup")
    setup_tool.runAllImportStepsFromProfile("profile-kitconcept.voltolighttheme:default")
```
