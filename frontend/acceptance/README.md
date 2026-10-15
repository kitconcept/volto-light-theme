# Playwright acceptance tests

End-to-end acceptance tests driven by [Playwright](https://playwright.dev/),
running against a Plone **acceptance** backend (with `RobotRemote` enabled, so
the backend can be reset between tests) and a running Volto frontend.

These are separate from the visual regression tests (`../playwright`), which use
their own `playwright.config.ts`. Acceptance tests use
`../playwright-acceptance.config.ts` and live in `tests/`.

## Layout

- `tests/reset-fixture.ts` — `setup`/`teardown` helpers that call `RobotRemote`
  to reset the backend ZODB to a known state.
- `tests/test.ts` — the extended `test`/`expect`. Provides an auto `resetBackend`
  fixture that tears down and sets up the backend around every test.
- `tests/login.ts` — `login(page)`, authenticates via `@login` and sets the
  `auth_token` cookie (equivalent to Cypress' `cy.autologin`).
- `tests/content.ts` — `createContent(...)`, creates content through the REST
  API (equivalent to `cy.createContent`).
- `tests/accessibility.ts` — `expectNoAccessibilityViolations(page, ...)`, an
  axe-core based accessibility assertion.
- `tests/blocks.ts` — block chooser/slash-menu interactions and saving edited
  content, waiting for a successful PATCH and navigation to view mode.
- `tests/object-browser.ts` — selecting internal links through the object browser.
- `tests/**/*.test.ts` — the tests themselves. Migrated modules mirror the
  folder structure under `../cypress/tests/`.
- `fixtures/` — files used by acceptance tests, independent of Cypress.

## Cypress migration

Migrate one module at a time, adding shared helpers only as scenarios need them.
Import `test` and `expect` from `tests/test.ts` so every test resets the backend.
Prefer accessible locators and web-first assertions; do not translate Cypress
fixed waits into Playwright sleeps.

The first module is `addons`, with all five existing Cypress scenarios ported:

| Cypress spec | Playwright spec | Scenarios |
| --- | --- | --- |
| `addons/button-block.cy.ts` | `tests/addons/button-block.test.ts` | Add and save a button through the block chooser |
| `addons/separator-block.cy.ts` | `tests/addons/separator-block.test.ts` | Add and save a separator through the block chooser |
| `addons/slider-block.cy.ts` | `tests/addons/slider-block.test.ts` | Add a slider through the slash menu; configure two slides linked to content with a preview image; check accessibility |

The replacements also reload saved pages to verify persistence. The slider tests
assert both slide titles, the slide count, and that the preview image loads.
The accessibility scenario checks the whole page without disabling axe rules,
matching the original Cypress scenario.

Cypress originals and their CI module remain enabled during the pilot. Retire
them after the Playwright replacements also pass in CI. Unmigrated modules stay
unchanged; the existing Playwright CI job automatically discovers nested specs.

## Configuration

The helpers read the following environment variables (with sensible defaults for
the acceptance backend):

- `BACKEND_HOST` (default `127.0.0.1`)
- `SITE_ID` (default `plone`)
- `API_PATH` (default `http://${BACKEND_HOST}:55001/${SITE_ID}`)
- `FRONTEND_URL` (default `http://localhost:3000`)

## Running locally

For development, start the frontend and backend in separate terminals from the
repository root:

```bash
make acceptance-frontend-dev-start
make -C backend acceptance-backend-start
```

Once both servers are ready, run the suite headlessly:

```bash
cd frontend
pnpm test:acceptance
```

To iterate interactively (with the Playwright UI) against these servers:

```bash
make acceptance-playwright-test
```

Run only the add-ons module against already-running acceptance servers:

```bash
cd frontend
pnpm test:acceptance addons
```

The container-based CI-mode alternative builds on the existing acceptance images:

```bash
make ci-acceptance-playwright-test
```

The first time, install the browsers used by Playwright:

```bash
make -C frontend install-playwright
```
