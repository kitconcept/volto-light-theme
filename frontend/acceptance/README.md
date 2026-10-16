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
- `tests/contents.ts` — row-scoped selection, popup actions, rename and delete
  confirmations shared by the folder-management scenarios.
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

The `core/content` module preserves the three original Cypress specs and their
16 scenarios:

| Cypress spec | Playwright spec | Scenarios |
| --- | --- | --- |
| `core/content/createContent.js` | `tests/core/content/createContent.test.ts` | Create documents (including nested paths and custom IDs), news items, files, and images through the REST API |
| `core/content/content.js` | `tests/core/content/content.test.ts` | Add files, pages, text, related-item references, images, news items, events, and external/internal links through the editor |
| `core/content/delete.js` | `tests/core/content/delete.test.ts` | Delete a selected item from the contents view |

The first focused `core/basic` batch preserves nine scenarios:

| Cypress spec | Playwright spec | Scenarios |
| --- | --- | --- |
| `core/basic/login.js` | `tests/core/basic/login.test.ts` | Log in through the form and verify authenticated UI |
| `core/basic/logout.js` | `tests/core/basic/logout.test.ts` | Log out through personal tools, verify `auth_token` removal and loss of authenticated UI, including after reload |
| `core/basic/autologin.js` | `tests/core/basic/autologin.test.ts` | Authenticate through the API and open personal tools |
| `core/basic/navigation.js` | `tests/core/basic/navigation.test.ts` | Private navigation entry disappears after logout; hamburger navigation at iphone-xr (414 x 896) and ipad-mini (768 x 1024) viewport sizes |
| `core/basic/search.js` | `tests/core/basic/search.test.ts` | Search rank, alphabetic, and effective-date (newest first) ordering |

Search scenarios remain authenticated, matching the original setup despite its
anonymous-user test names. Each creates private documents, edits and saves their
text through the Slate editor, and checks the complete result order. The
effective-date scenario supplies the original effective/expiration dates through
the existing content helper. `tests/core/basic/auth.ts` shares form login and
toolbar logout interactions.

The second `core/basic` batch preserves all 12 folder-management scenarios:

| Cypress spec | Playwright spec | Scenarios |
| --- | --- | --- |
| `core/basic/actions.js` | `tests/core/basic/actions.test.ts` | Copy and cut via row popups (including paste back into the same folder); delete and rename selected content |
| `core/basic/folder-contents.js` | `tests/core/basic/folder-contents.test.ts` | Rename; copy in place; cut into another item; delete; recursively publish a parent and child; creation-date sorting; remember the Creator column across folders; paginated top/bottom reordering including filtered search |

Creation-date sorting uses explicit, year-separated fixture dates. Reordering
creates 56 uniquely identified fixture documents plus the initial document and
a UI-created page, and checks both pages of the 58-item listing. All actions
under test still use the UI; API calls only set up fixtures.
Other `core/basic` specs are not migrated yet.

Cypress originals and their CI modules remain enabled until the Playwright
replacements achieve CI parity. Unmigrated modules stay unchanged; the existing
Playwright CI job automatically discovers nested specs.

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

Run only a migrated module against already-running acceptance servers:

```bash
cd frontend
pnpm test:acceptance addons
pnpm test:acceptance core/content
pnpm test:acceptance core/basic
```

The container-based CI-mode alternative builds on the existing acceptance images:

```bash
make ci-acceptance-playwright-test
```

The first time, install the browsers used by Playwright:

```bash
make -C frontend install-playwright
```
