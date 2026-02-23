---
myst:
  html_meta:
    "description": "How to contribute to Volto Light Theme"
    "property=og:description": "How to contribute to Volto Light Theme"
    "property=og:title": "Contributing"
    "keywords": "Volto Light Theme, Contributing, Makefile, make, lint, format, i18n, tests, unit, Cypress, acceptance"
---

# How to develop add-ons

VLT has a recommended set of add-ons to provide additional functionality and features.
These add-ons are included in the Cookieplone-based development setup used for VLT development.
They are checked out using `mrs.developer` and declared as `pnpm` workspaces to allow for easy development and testing.

This setup allows to develop VLT along with all the set of recommended add-ons in a single development environment.
`mrs.developer.json` declares the version of each add-on in a `tag` or `branch` field, allowing to easily switch between different versions of the add-ons when needed.
By default, a specific tag is used for each add-on, this version has to be aligned with the ones declared in the {file}`recommendedAddons.json` file of VLT.
This serves as documentation and a reference for the versions of the add-ons that are known to work well together with VLT.
CI is configured to use the same versions of the add-ons as declared in `recommendedAddons.json`, ensuring consistency between development and CI environments.
If they are not aligned, tests might fail due to version mismatches.

## Developing an add-on

To develop an add-on for VLT, follow these steps:

1. Create a new branch of the add-on repository you want to develop.
1. Update the `mrs.developer.json` file in the VLT repository to point to your new branch for the add-on you are developing.
1. In the VLT development environment, run `make install` to install the add-on.
1. Develop the add-on as needed, making sure to test it within the VLT development environment.
1. Once development is complete, create a pull request in the add-on repository to merge your changes back into the main branch.
1. Release the add-on following its release process.
1. After the pull request is merged, update the `recommendedAddons.json` file in the VLT repository to point to the new version of the add-on.
1. Update the `mrs.developer.json` file in the VLT repository to point back to the main branch or the new tag of the add-on.
1. Run `make install` again in the VLT development environment to ensure the latest version of the add-on is installed.

```{note}
CI won't pass until the add-on changes are merged and released, and the `recommendedAddons.json` and `mrs.developer.json` files are updated accordingly.
```
