---
myst:
  html_meta:
    "description": "Volto Light Theme releases"
    "property=og:description": "Volto Light Theme releases"
    "property=og:title": "Releases"
    "keywords": "Volto Light Theme, Releases"
---

# Releases

The releases follow a semantic versioning model.

## Definition of breaking change

In general, the same definitions and rules of a breaking change in Volto releases apply to VLT.
However, in VLT we add an extra exception.
The vertical spacing is carefully curated and considered an important feature of the theme.
Because of that, changes and improvements in the vertical spacing are _not_ considered breaking changes.
They will be noted properly in the change log.


## Release process

To release a full version, run the following command.

```shell
make release
```

To release a release candidate (rc) version, run the following command.

```shell
make release-rc
```
