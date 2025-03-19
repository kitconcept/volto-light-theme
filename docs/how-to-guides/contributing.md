---
myst:
  html_meta:
    "description": "How to contribute to Volto Light Theme"
    "property=og:description": "How to contribute to Volto Light Theme"
    "property=og:title": "Contributing"
    "keywords": "Volto Light Theme, Contributing, Makefile, make, lint, format, i18n, tests, unit, Cypress, acceptance"
---

# Contributing

This add-on is developed in isolation, using a Cookieplone based setup, the latest `mrs-developer`, and other Volto core improvements.
For this reason, developing `volto-light-theme` requires pnpm and Volto 18, yet the add-on might work with other versions.


## Development requirements

-   Volto 18
-   pnpm as package manager


## Make convenience commands

Run `make help` to list the available commands.

```text
help                                  Show this help
install                               Installs the add-on in a development environment
start                                 Starts Volto, allowing reloading of the add-on during development
build                                 Build a production bundle for distribution of the project with the add-on
build-deps                            Build dependencies
i18n                                  Sync i18n
ci-i18n                               Check if i18n is not synced
format                                Format codebase
lint                                  Lint, or catch and remove problems, in code base
release                               Release the add-on on npmjs.org
release-dry-run                       Dry-run the release of the add-on on npmjs.org
test                                  Run unit tests
ci-test                               Run unit tests in CI
backend-docker-start                  Starts a Docker-based backend for development
storybook-start                       Start Storybook server on port 6006
storybook-build                       Build Storybook
acceptance-frontend-dev-start         Start acceptance frontend in development mode
acceptance-frontend-prod-start        Start acceptance frontend in production mode
acceptance-backend-start              Start backend acceptance server
ci-acceptance-backend-start           Start backend acceptance server in headless mode for CI
acceptance-test                       Start Cypress in interactive mode
ci-acceptance-test                    Run cypress tests in headless mode for CI
acceptance-a11y-frontend-prod-start   Start a11y acceptance frontend in prod mode
ci-acceptance-a11y-backend-start      Start acceptance a11y server in CI mode (no terminal attached)
acceptance-a11y-test                  Start a11y Cypress in interactive mode
ci-acceptance-a11y-test               Run a11y cypress tests in headless mode for CI
```


## Development environment setup

Install package requirements with the following commands.

```shell
make install
```

### Start developing

In one terminal session, start the backend server.

```shell
make start-backend-docker
```

In a second terminal session, start the frontend server.

```shell
make start
```


## Lint

To lint the code—that is, to preview formatting suggestions of the code through ESlint, Prettier, and Stylelint—use the following command.

```shell
make lint
```


## Format

To format the code—that is, actually rewrite it through ESlint, Prettier, and Stylelint—use the following command.

```shell
make format
```


## i18n

Extract the i18n messages to locales.

```shell
make i18n
```


## Unit tests

Run unit tests.

```shell
make test
```


## Run Cypress tests


In one terminal session, start the frontend server in dev mode.

```shell
make acceptance-frontend-dev-start
```

In a second terminal session, start the backend acceptance server.

```shell
make acceptance-backend-start
```

In a third terminal session, start the Cypress interactive test runner.

```shell
make acceptance-test
```
