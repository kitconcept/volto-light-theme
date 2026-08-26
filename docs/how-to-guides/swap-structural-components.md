---
myst:
  html_meta:
    "description": "Swap structural components in Volto Light Theme through the registry"
    "property=og:description": "Swap structural components in Volto Light Theme through the registry"
    "property=og:title": "Swap structural components"
    "keywords": "Volto Light Theme, registry, utility, header, navigation, footer, customization"
---

# Swap structural components

Volto Light Theme (VLT) renders its structural components — the header, navigation, footer, and a few more — through the component registry from `@plone/registry`.
This lets a project replace any of them with its own implementation by registering a utility and flipping a setting, instead of shadowing the component through {file}`customizations`.

Compared to shadowing, this approach is:

-   **Explicit.** The active component is named in configuration, not hidden in a file under {file}`customizations`.
-   **Composable.** Several implementations can coexist under different names; a project selects which one renders.
-   **Decoupled.** A project binds to a stable name, not to an internal module path.

## How it works

VLT registers its own implementation of each structural component as a utility under the name `vlt`, with a `type` that names the role.

```js
config.registerUtility({ name: 'vlt', type: 'navigation', method: Navigation });
```

A setting then selects which registered name renders for each role.

```js
config.settings.vlt = {
  components: {
    breadcrumbs: 'vlt',
    footer: 'vlt',
    header: 'vlt',
    languageSelector: 'vlt',
    logo: 'vlt',
    mobileNavigation: 'vlt',
    navigation: 'vlt',
    searchWidget: 'vlt',
    tags: 'vlt',
  },
};
```

These defaults reproduce the theme's standard behavior, so enabling nothing changes nothing.

## Available components

The following roles can be swapped. The value is the `type` you register against and the key you set under `config.settings.vlt.components`.

| Setting            | Role                                            |
| ------------------ | ----------------------------------------------- |
| `breadcrumbs`      | The breadcrumbs trail                           |
| `footer`           | The site footer                                 |
| `header`           | The site header                                 |
| `languageSelector` | The language selector in the header             |
| `logo`             | The site logo                                   |
| `mobileNavigation` | The mobile (hamburger) navigation               |
| `navigation`       | The main desktop navigation                     |
| `searchWidget`     | The header search widget                        |
| `tags`             | The tags shown on content                       |

## Swap the navigation

Suppose your project add-on `@acme/volto` ships its own navigation and you want the site to use it.

### 1. Register your component

In your add-on's configuration, register your navigation under your own name and the `navigation` type.

```js
import AcmeNavigation from './components/AcmeNavigation';

export default function applyConfig(config) {
  config.registerUtility({
    name: 'acme',
    type: 'navigation',
    method: AcmeNavigation,
  });

  return config;
}
```

Both implementations now live in the registry: the theme's `vlt` navigation and your `acme` one. Nothing renders differently yet.

### 2. Select it

Flip the one setting for the role you want to replace.

```js
config.settings.vlt.components.navigation = 'acme';
```

That is the whole change. The theme's header resolves the navigation through the registry at render time, so it now renders `AcmeNavigation`. Every other role keeps its `vlt` default.

```{note}
Make sure your add-on loads after `@kitconcept/volto-light-theme` so that `config.settings.vlt` already exists when you assign to it. Placing VLT before your add-on in your project's add-ons list is enough.
```

## Fallback behavior

If a setting names a component that is not registered, VLT falls back to its own `vlt` implementation rather than failing to render.

```js
// 'typo' is not registered, so the theme's own navigation renders.
config.settings.vlt.components.navigation = 'typo';
```

This makes a misconfiguration degrade to the default instead of producing a blank or broken region.

## Type safety

The component settings are typed through the `VLTSettings` interface, which augments Volto's `SettingsConfig`.
The keys of `config.settings.vlt.components` are a fixed set, so a typo in a role name is a compile-time error rather than a silent no-op at render.
