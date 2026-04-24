---
myst:
  html_meta:
    "description": "Volto Light Theme release process and guidelines"
    "property=og:description": "Volto Light Theme release process and guidelines"
    "property=og:title": "How to release Volto Light Theme"
    "keywords": "Volto Light Theme, release"
---

# How to release Volto Light Theme

Volto Light Theme is released on both PyPI and npm. The repository uses `repoplone` so the backend and frontend packages are released together with the same version number.

## Versioning

The releases follow semantic versioning.

## Definition of breaking change

In general, the same definitions and rules of a breaking change in Volto releases apply to VLT.
However, VLT adds an extra exception.
The vertical spacing is carefully curated and considered an important feature of the theme.
Because of that, changes and improvements in the vertical spacing are _not_ considered breaking changes.
They should still be noted properly in the change log.

## Requisites

To start a release, you must fulfill the following requirements:

- Have permission to push to `main`
- Have permission in the [`@kitconcept` organization on npm](https://www.npmjs.com/org/kitconcept)
- Have an environment variable `GITHUB_TOKEN` with a GitHub personal access token with permissions to write releases on GitHub
- Install [`uv`](https://docs.astral.sh/uv/) in your system so `uvx` is available

To request these permissions, contact the maintainers of this repository.

## Permission to push to `main`

The release process involves pushing directly to the `main` branch, so the releaser must have permission to push to it.

## Permission to release to npm

The releaser must have permissions to publish in the [`@kitconcept` organization on npm](https://www.npmjs.com/org/kitconcept).

## GitHub personal token

The release tooling creates and publishes a GitHub Release for each version.
Export `GITHUB_TOKEN` in your shell session before starting the release:

```shell
export GITHUB_TOKEN="my_looooong_github_token"
```

See the [`release-it` documentation for GitHub releases](https://www.npmjs.com/package/release-it#github-releases) and the GitHub documentation on [About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases).

## Install `uv`

It is executed through `uvx`, which is provided by `uv`.
This lets you execute the required tooling without installing it globally in advance.

Install `uv` and ensure `uvx` is available on your `$PATH`.
Read the console output carefully for any additional setup instructions.

```shell
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Release process

The release command is:

```shell
uvx repoplone release
```

If you prefer the repository shortcut, you can also run:

```shell
make release
```

Follow the prompts to select the release type.
The tool handles version bumping, tagging, and publishing to PyPI and npm.
