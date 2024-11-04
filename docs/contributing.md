# Contributing

The development of this add-on is done in isolation using a new approach using pnpm workspaces and latest `mrs-developer` and other Volto core improvements.
For this reason, it only works with pnpm and Volto 18 (currently in alpha) but it does not mean that the add-on will only work in 18.

## Development requisites

- Volto 18
- pnpm as package manager

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

## Development Environment Setup

Install package requirements

```shell
pnpm i
make install
pnpm i
```

### Start developing

Run (in separate terminal sessions)

Start backend server

```shell
make start-backend-docker
```

Start frontend

```shell
pnpm start
```

## Linting

Run ESlint, Prettier and Stylelint

```shell
make lint
```

## Formatting

Run ESlint, Prettier and Stylelint in fix mode

```shell
make format
```

## i18n

Extract the i18n messages to locales

```shell
make i18n
```

## Unit tests

Run unit tests

```shell
make test
```

## Run Cypress tests

Run (in separate terminal sessions)

Start the frontend in dev mode

```shell
make start-test-acceptance-frontend-dev
```

Start the backend acceptance server

```shell
make start-test-acceptance-server
```

Start the Cypress interactive test runner

```shell
make test-acceptance
```
