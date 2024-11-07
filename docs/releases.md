# Releases

The releases follow a semantic versioning model.

## Definition of breaking change

In general, the same rules as Volto releases applies.
However, in VLT we add an extra exception: The vertical spacing is carefully curated and considered an important feature of the theme and because of that, changes and improvements in the vertical spacing are **NOT** considered breaking changes.
They will be noted properly in the changelog.

## Release process

Run

```shell
make release
```

For releasing a RC version

Run

```shell
make release-rc
```
