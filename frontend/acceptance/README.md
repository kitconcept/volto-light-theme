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
- `tests/*.test.ts` — the tests themselves.

## Configuration

The helpers read the following environment variables (with sensible defaults for
the acceptance backend):

- `BACKEND_HOST` (default `127.0.0.1`)
- `SITE_ID` (default `plone`)
- `API_PATH` (default `http://${BACKEND_HOST}:55001/${SITE_ID}`)
- `FRONTEND_URL` (default `http://localhost:3000`)

## Running locally

From the repository root, start the acceptance containers and run the suite:

```bash
make ci-acceptance-playwright-test
```

To iterate interactively (with the Playwright UI) against already-running
servers, start the acceptance backend and frontend, then:

```bash
make acceptance-playwright-test
```

The first time, install the browsers used by Playwright:

```bash
make -C frontend install-playwright
```
