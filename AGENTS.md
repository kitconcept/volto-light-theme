# AGENTS.md

This file applies to the repository root and all subdirectories unless a deeper `AGENTS.md` overrides it.
When working inside `frontend/core`, always read the closer Volto `AGENTS.md` files there first.

## Repository Overview

This repository is the `volto-light-theme` (VLT) monorepo: a Volto theme add-on shipped with a supporting backend, frontend workspace, docs, and deployment support.
It is split into three main working areas plus project-wide tooling:

- `backend/` - Plone backend, policy/distribution package, Python toolchain, site creation/export helpers
- `frontend/` - Volto-based frontend workspace, including the `@kitconcept/volto-light-theme` add-on package and acceptance tests
- `docs/` - project documentation
- `devops/`, `docker-compose*.yml`, root `Makefile` - deployment, local stack, CI, and orchestration

## Monorepo Rules

- The product is the `@kitconcept/volto-light-theme` add-on (published standalone to npm); the `backend/` and the rest of `frontend/` are the development and testing harness around it. Treat backend/frontend as a coordinated setup for developing and testing the add-on, not as a separate distribution.
- Prefer the root `Makefile` for cross-stack tasks and the local `backend/` or `frontend/` Makefiles for area-specific work.
- Use `pnpm`; do not introduce `npm` or top-level `yarn` workflows.
- Keep changes scoped to the relevant area. Do not touch both backend and frontend unless the feature or bug actually spans both.
- Preserve existing generated/example content workflows in `backend/`; exported content can be intentional product data, not disposable fixtures.

## Frontend Model

- `frontend/` is a pnpm workspace with a local Volto development setup.
- The main project package is `frontend/packages/volto-light-theme`.
- Most project-specific frontend work lives under `frontend/packages/volto-light-theme/src`.
- `frontend/core` is a vendored Volto core workspace. Do not touch it for normal repo work; treat it as upstream core Volto code that is out of scope unless the user explicitly asks for a core Volto change.
- Customizations, block configuration, theme styles, slots, and acceptance coverage are all part of the frontend package surface and often need coordinated updates.

## Default Validation Commands

Run the narrowest command set that matches the area you changed.

Whole repo:

```sh
make format
make lint
make test
```

Frontend only:

```sh
make -C frontend format
make -C frontend lint
make -C frontend test
```

Backend only:

```sh
make -C backend format
make -C backend lint
make -C backend test
```

## Post-Edit Rule

- After any code edit, run the linting and formatting pass for the affected area before finishing.
- For frontend changes, that means at minimum:

```sh
make -C frontend format
make -C frontend lint
```

- For backend changes, run the backend equivalents.
- If a change spans both stacks, run the root `make format` and `make lint`.

## Acceptance Tests

Playwright runs all browser acceptance, accessibility, and visual regression tests.
All suites use `frontend/playwright.config.ts` with separate `acceptance`, `visual`, and `storybook` projects.
Acceptance and a11y tests live in `frontend/acceptance/tests/`; visual tests live in `frontend/acceptance/visual/main/` and `frontend/acceptance/visual/storybook/`.
The acceptance project uses one worker because tests share a backend that resets between tests.

Primary commands:

```sh
make acceptance-test                       # UI against already-running acceptance servers
make -C frontend ci-acceptance-test          # Headless against already-running acceptance servers
make ci-acceptance-test                      # Start containers, run headless, stop containers
make acceptance-a11y-test                    # Accessibility checks in UI mode
make acceptance-visual-test                  # Site visual regression tests in UI mode
make acceptance-visual-test-storybook        # Storybook visual regression tests in UI mode
```

Install Chromium with `make -C frontend install-playwright`.
The `acceptance-playwright-test` and `ci-acceptance-playwright-test` targets remain available as aliases for the same suite.
You can also run `pnpm test:acceptance`, `pnpm test:visual`, or `pnpm test:storybook` from `frontend/`.

Import acceptance fixtures from `frontend/acceptance/tests/test.ts` to reset the backend around each test.
The read-only a11y suite uses `a11y-test.ts` to import example content once per worker and reuse it across its checks.
Use the `expectNoAccessibilityViolations` helper for accessibility assertions and `fixturePath` for local fixture files.

## Editing Rules

- Read the nearest `AGENTS.md` before editing.
- Preserve the existing `Makefile`-driven workflows; do not replace them with ad hoc commands in docs or automation without a reason.
- Be careful with `mrs.developer.json`, local workspace overrides, and the vendored/frontend core relationship.
- When changing frontend behavior, consider whether the change belongs in `frontend/packages/volto-light-theme` or in the vendored Volto core area.
- When changing exported backend content or distribution setup, verify whether the change affects demo data, installation defaults, or test fixtures.

## Component Shadowing

Every shadowed Volto/add-on component committed under `frontend/packages/*/src/customizations/` MUST start with the mandatory OVERRIDE documentation header. This is enforced in CI by the `frontend-shadow-headers` job in `.github/workflows/main.yml` (defined in `.github/workflows/frontend-shadow-headers.yml`, script: `.github/scripts/check-shadow-headers.mjs`), which fails the build if the header or any required label is missing.

Required labels in the leading block comment: `OVERRIDE`, `REASON`, `FILE`, `FILE VERSION`, `DATE`. Optional: `PULL REQUEST`, `TICKET`, `CHANGELOG`, `DEVELOPER`.

Template:

```jsx
/**
 * OVERRIDE ComponentName.jsx
 * REASON: Short explanation of why this component is shadowed.
 * FILE: https://github.com/plone/volto/blob/<version>/packages/volto/src/.../ComponentName.jsx
 * FILE VERSION: Volto 19.3.0
 * DATE: 2026-09-10
 * DEVELOPER: @your-handle
 */
```

Run the check locally from `frontend/`: `pnpm check:shadow` (or `node ../.github/scripts/check-shadow-headers.mjs packages`). Asset files (`.svg`, images) cannot carry the header and are skipped automatically.

## Changelog Fragments

This repo checks for towncrier fragments in CI.

- Backend changes need a fragment under `backend/news/`
- Frontend add-on changes need a fragment under `frontend/packages/volto-light-theme/news/`
- Repo-level (not related to `backend` or `frontend`) changes may need a fragment under the root `news/`

## PR Guidance

- Create a PR only when you are told to
- After creating a PR, make sure that a Towncrier fragment is present for the change, and that it is in the correct location. Create it/them if needed following the Changelog Fragments guidance section.
