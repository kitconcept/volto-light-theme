---
myst:
  html_meta:
    "description": "Volto Light Theme compatibility"
    "property=og:description": "Volto Light Theme compatibility"
    "property=og:title": "Compatibility"
    "keywords": "Volto Light Theme, Compatibility"
---

# Compatibility

| VLT version | Volto version | Plone RESTAPI version |
|-------------|---------------|-----------------------|
| 3.x.x       |   >= Volto 17.0.0-alpha.16  | >= Plone 6.0.x |
| 4.x.x       |   < Volto 17.18.0  | >= Plone 6.0.x |
| 5.x.x       |   >= Volto 17.18.0 | >= Plone 6.0.x |
| 6.x.x       |   >=Volto 18.19.0  | >=9.13.2 |

Achieving compatibility with Volto 17 beyond 5.x.x series might be possible but it will require backporting the utilities registry along with the client transforms for Redux reducers and the `styleWrapperStyleObjectEnhancer` feature.

For 6 series, it is recommended to use always latests versions both Plone, Plone RESTAPI and Volto.

See more information about the other dependencies in `peerDependencies` in {file}`package.json`.
