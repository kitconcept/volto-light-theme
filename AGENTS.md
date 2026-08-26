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

There are two acceptance-test paths in this repo:

- Cypress: the established, comprehensive acceptance and a11y suite (run by the `acceptance` matrix in CI)
- Playwright: a newer path, added for future acceptance coverage

Prefer Playwright for new acceptance coverage. Cypress remains the primary suite today and is still fully supported; keep existing Cypress specs working and extend them when a scenario is not yet covered by the Playwright setup.

Primary Playwright commands:

```sh
make ci-acceptance-playwright-test          # CI mode: start acceptance containers, run headless, stop
make -C frontend acceptance-playwright-test # interactive (UI) mode against already-running servers
```

You can also run the Playwright CLI directly from `frontend/`:

```sh
pnpm test:acceptance      # headless
pnpm test:acceptance:ui   # interactive UI
```

Playwright tests live under `frontend/acceptance/tests`.
They run through `frontend/playwright-acceptance.config.ts` (kept separate from the visual-regression `frontend/playwright.config.ts`) and are configured serially (`workers: 1`) because tests can conflict while creating and deleting content.
Accessibility assertions are built into the Playwright tests via the `expectNoAccessibilityViolations` helper (`frontend/acceptance/tests/accessibility.ts`); there is no separate Playwright a11y command.

Cypress commands:

```sh
make -C frontend acceptance-test
make -C frontend ci-acceptance-test
make -C frontend acceptance-a11y-test
make -C frontend ci-acceptance-a11y-test
```

Cypress specs live under `frontend/cypress/tests`.

## Editing Rules

- Read the nearest `AGENTS.md` before editing.
- Preserve the existing `Makefile`-driven workflows; do not replace them with ad hoc commands in docs or automation without a reason.
- Be careful with `mrs.developer.json`, local workspace overrides, and the vendored/frontend core relationship.
- When changing frontend behavior, consider whether the change belongs in `frontend/packages/volto-light-theme` or in the vendored Volto core area.
- When changing exported backend content or distribution setup, verify whether the change affects demo data, installation defaults, or test fixtures.

## Changelog Fragments

This repo checks for towncrier fragments in CI.

- Backend changes need a fragment under `backend/news/`
- Frontend add-on changes need a fragment under `frontend/packages/volto-light-theme/news/`
- Repo-level (not related to `backend` or `frontend`) changes may need a fragment under the root `news/`

## PR Guidance

- Create a PR only when you are told to
- After creating a PR, make sure that a Towncrier fragment is present for the change, and that it is in the correct location. Create it/them if needed following the Changelog Fragments guidance section.
