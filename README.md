# kitconcept.voltolighttheme

Example content for @kitconcept/volto-light-theme

## Features

### Content Types

- TBD

### Initial content

This package contains a simple volto configuration.

## Installation on an existing project

Install kitconcept.voltolighttheme with `pip`:

```shell
pip install kitconcept.voltolighttheme
```

## Contribute

### Develop this package

Clone this repository

```shell
git clone git@github.com:kitconcept/kitconcept.voltolighttheme.git
```

Install Plone, its dependencies and this package:

```shell
cd kitconcept.voltolighttheme
make install
```

Start an instance on port `8080`:

```shell
make start
```

To create a site using the Plone UI, point your browser to [http://localhost:8080](http://localhost:8080)

Or, create a site from the command line (first stop the instance):

```shell
make create-site
```
### Exporting the content

After editing the content on the running instance, point your browser to [http://localhost:8080/Plone/@@dist_export_all](http://localhost:8080/Plone/@@dist_export_all), select this distribution and export everything.

After that, you will have the content available (in the `collective.exportimport` format) at `src/kitconcept/voltolighttheme/distributions/voltolighttheme/content`.

### Resources

- [Issue Tracker](https://github.com/kitconcept/kitconcept.voltolighttheme/issues)
- [Source Code](https://github.com/kitconcept/kitconcept.voltolighttheme/)

## License

The project is licensed under GPLv2.
