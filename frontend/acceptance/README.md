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

The third `core/basic` batch preserves all 23 link-integrity scenarios:

| Cypress spec | Playwright spec | Scenarios |
| --- | --- | --- |
| `core/basic/linkIntegrityView.js` | `tests/core/basic/linkIntegrityView.test.ts` | Toolbar access; richtext references to Document, News Item, Event, File, Image and Link; teaser target, UI-selected teaser image override, image source, image link and nested-grid teaser (12) |
| `core/basic/deleteItemModal.js` | `tests/core/basic/deleteItemModal.test.ts` | Deletion warnings for the same six richtext content types and five block forms (11) |

`tests/relations.ts` shares typed relation fixtures and the teaser image override
interaction, reusing the content, object-browser and save helpers. The override
links view checks the image relation; the override deletion scenario still
selects the referenced document, matching the original behavior despite its
image-oriented name. Before choosing the override, the same document is
reselected through the object browser so API-created absolute backend URLs are
normalized to the editor's link format and the relation survives the UI save.
Assertions identify both the target and referring document;
the nested-grid relation checks the complete fixture title.

The fourth `core/basic` batch preserves all nine workflow and editing scenarios:

| Cypress spec | Playwright spec | Scenarios |
| --- | --- | --- |
| `core/basic/workflow.js` | `tests/core/basic/workflow.test.ts` | Change the selected page's workflow state to Published (1) |
| `core/basic/sharing.js` | `tests/core/basic/sharing.test.ts` | Access sharing; grant another user view permission and log in as that user; persist disabled permission inheritance (3) |
| `core/basic/history.js` | `tests/core/basic/history.test.ts` | Create a page through the editor and access its history (1) |
| `core/basic/metadata.js` | `tests/core/basic/metadata.test.ts` | Persist effective date/time; switch to Page metadata on validation errors; type into Slate after removing a creator widget value (3) |
| `core/basic/form-undo.js` | `tests/core/basic/form-undo.test.ts` | Undo and redo individual typed characters, then save the resulting text (1) |

`tests/core/basic/page.ts` shares the UI page creation and active-navigation
assertions used by history and sharing. The workflow scenario retains the
original selection/state dialog interaction; recursive parent/child publishing
is covered in `folder-contents.test.ts`. Fixed Cypress waits are replaced by
editor readiness and web-first assertions.

The final `core/basic` batch ports the six remaining specs and all 16 source
scenarios (including the five previously skipped recurrence scenarios):

| Cypress spec | Playwright spec | Scenarios |
| --- | --- | --- |
| `core/basic/FileWidget.js` | `tests/core/basic/FileWidget.test.ts` | Upload an image through the news-item file widget and verify its preview (1) |
| `core/basic/aliasesContext.js` | `tests/core/basic/aliasesContext.test.ts` | Add an alternative URL through the aliases form and verify persistence (1) |
| `core/basic/locking.js` | `tests/core/basic/locking.test.ts` | Lock as the first editor, show the lock notice to another editor, expose Unlock, then unlock and save as the second editor (3) |
| `core/basic/objectBrowser.js` | `tests/core/basic/objectBrowser.test.ts` | Relative and full API URL searches; focus on opening search; image-only text search excluding documents, then select and save the image (4) |
| `core/basic/recurrence-widget.js` | `tests/core/basic/recurrence-widget.test.ts` | Daily, Monday/Friday, weekday, weekly, monthly and yearly recurrence: intervals, end dates/counts, day/month choices, exclude/re-include, additional dates and saved occurrence lists (6) |
| `core/basic/set-registry.js` | `tests/core/basic/set-registry.test.ts` | Set the site-title registry fixture and verify its value in the site control panel (1) |

All `core/basic` Cypress specs now have Playwright replacements. Lock acquisition
waits for the successful `@lock` response instead of a fixed delay. The second
editor opens the page through navigation after the app has mounted, so lock
notifications are observed with the toast container already ready. Users and
registry settings are API fixtures reset by the shared backend fixture; unlocking,
editing, aliases, uploads, object selection and recurrence configuration use the
UI. Recurrence dates are entered through the event form, not preseeded through
the API. This spec uses UTC and fixes the browser date to May 1, 2020 so the
source's exact weekday assertions and no-past-dates picker remain deterministic.
Timers still run normally. The skipped daily source's ambiguous `.modal input`
selector is replaced by the explicit add-date input. The monthly source's saved
count is corrected from six to seven: six regular occurrences plus the explicitly
added October 8 date.

The first `main` batch preserves all nine active source scenarios (no generated
or skipped cases):

| Cypress spec | Playwright spec | Scenarios |
| --- | --- | --- |
| `main/basic.cy.js` | `tests/main/basic.test.ts` | Add a page with text; select text and insert an external link through the Slate toolbar (2) |
| `main/nav.cy.js` | `tests/main/nav.test.ts` | Show the third navigation level; open second- and third-level pages (3) |
| `main/site-action.cy.js` | `tests/main/site-action.test.ts` | Show configured Github and Sitemap header actions (1) |
| `main/listing-grid.cy.js` | `tests/main/listing-grid.test.ts` | Select Grid variation and Page criteria; check first result before and after saving, including its link (1) |
| `main/Grid/image.cy.js` | `tests/main/Grid/image.test.ts` | Select images in both grid columns; configure Page listings in both columns and verify saved content (2) |

`tests/main/listing.ts` shares child-page fixtures and the UI Type/Page criterion
selection. Grid blocks are inserted through the slash menu and their children
through the chooser, matching the original interactions.
The text-link scenario advances Playwright's browser clock through Slate's
200ms saved-selection debounce after selecting the word, without a wall-clock
sleep or access to private editor state. Slate ignores `selectionchange`
while syncing its own DOM selection after typing, so the test reapplies the
same selection until Slate's `.highlight-selection` decoration acknowledges it.

The second `main` batch preserves all 18 active source scenarios (no generated
or skipped source cases):

| Cypress spec | Playwright spec | Scenarios |
| --- | --- | --- |
| `main/blocks-calendar.cy.js` | `tests/main/blocks-calendar.test.ts` | Search; date range; review-state facets; query criteria; limits and pagination; combined date/facet/search and reset; short-name criterion; single/multi-day date display; folder order and reversed order (9) |
| `main/blocks-map.cy.js` | `tests/main/blocks-map.test.ts` | Enter Google Maps and OpenStreetMap iframe embeds through the block toolbar and verify the saved source (2) |
| `main/blocks-table.cy.js` | `tests/main/blocks-table.test.ts` | Enter four cell values, insert columns/rows, save, reopen, delete inserted columns/rows and verify retained values (1) |
| `main/blocks-teaser-types.js` | `tests/main/blocks-teaser-types.test.ts` | Select Document, Event, News Item and File targets through the object browser; center alignment, title, applicable description/image/date checks (4) |
| `main/blocks-slider-variant.js` | `tests/main/blocks-slider-variant.test.ts` | Simple side variation with kicker, button visibility/text, alignment and second-slide title/description/image overrides; refresh source content (2) |

`tests/main/teaser.ts` shares the teaser/slider image fixture and loaded-image
assertion. Calendar event dates follow the current UTC month. All filtering,
sorting, pagination, block configuration and refresh actions use the UI; API calls
only create fixtures (including their workflow state). Map iframe requests are
fulfilled with empty local HTML: the original scenarios assert iframe source
configuration, not rendering or availability of third-party map providers.
Both provider URLs are checked in edit mode, after saving and after reloading.

The complete migrated suite contains 119 scenarios. Accessibility-module migration
is deferred pending discussion of programmatic canned content; it must not assume
a separate example-content server.

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
