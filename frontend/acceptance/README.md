# Playwright tests

This directory contains all browser acceptance, accessibility, and visual regression tests.
Select a project through the package scripts, Makefile targets, or `pnpm exec playwright test --project=<name>`.
Run one project at a time because acceptance and site visual tests require different backend fixtures.

| Project | Tests | Runtime |
| --- | --- | --- |
| `acceptance` | `tests/` | Plone acceptance backend with RobotRemote and Volto |
| `visual` | `visual/main/` | Demo backend and Volto |
| `storybook` | `visual/storybook/` | Storybook on port 6006 |

All projects use `../playwright.config.ts`.
The acceptance project runs with one worker and retries failures in CI.
The visual projects retain separate screenshot assertions and share the baseline checkout in `__screenshots__/`.
Generated artifacts live in `results/acceptance/` and `results/visual/`.

## Run acceptance tests

Install the browser from the repository root:

```sh
make -C frontend install-playwright
```

Start the servers in separate terminals from the repository root:

```sh
make acceptance-backend-dev-start
```

```sh
make acceptance-frontend-dev-start
```

Open the interactive runner:

```sh
make acceptance-test
```

Run headlessly against those servers:

```sh
make -C frontend ci-acceptance-test
```

Alternatively, start the acceptance containers, run the suite, and stop the containers:

```sh
make ci-acceptance-test
```

Filter tests from `frontend/`:

```sh
pnpm test:acceptance core/blocks-listing
pnpm test:acceptance core/basic
pnpm test:acceptance acceptance/tests/a11y.test.ts
```

Use `make acceptance-a11y-test` to open just the accessibility suite in UI mode.

## Run a CI shard

CI splits the acceptance project across four jobs with Playwright's file-based sharding.
Each job starts its own Plone and Volto containers and runs one worker, so backend resets cannot affect another shard.
Files stay together, including the accessibility checks that share one example-content import per worker.
All shards finish even if another shard fails.

Run one shard against your local acceptance servers:

```sh
make -C frontend ci-acceptance-test PLAYWRIGHT_ARGS="--shard=1/4"
```

Use the same `PLAYWRIGHT_ARGS` value with the root `ci-acceptance-test` target to start and stop containers around a shard.
Omit it to run the full suite.
You need separate server pairs to run multiple shards concurrently on one machine.

CI uploads a blob report and failure traces for each shard, then merges the blob reports into the `playwright-acceptance-report` HTML artifact.
The merge job runs after failed tests as well, so you can review results from all completed shards in one report.
The `PLAYWRIGHT_REPORTER` Make variable defaults to `list,html`; CI sets it to `list,github,blob` for failure annotations and report merging.
CI retries a failed test once and limits each shard's test run to ten minutes.
Playwright's global timeout ends the run gracefully so reporters can write partial results and traces.
The test step has a twelve-minute fallback, and the job has a twenty-minute limit.
Failed shards also upload backend logs, frontend logs, and container state with their test artifacts.
The live reporter counts retry attempts, so its counter can exceed the number of distinct tests in a shard.

## Run visual regression tests

Start the demo backend and frontend, then run `make acceptance-visual-test` from the repository root.
For Storybook, start its server and run `make acceptance-visual-test-storybook`.
Both targets synchronize the external baseline repository before opening Playwright.
The headless frontend commands are `pnpm test:visual` and `pnpm test:storybook`.
See the visual regression guide in `docs/how-to-guides/visual-regression-tests.md` for baseline updates and CI workflows.

## Write acceptance tests

Import `test` and `expect` from `tests/test.ts` so each test resets the backend through RobotRemote.
Use accessible locators, web-first assertions, and response waits rather than fixed delays.
Keep UI operations under test in the browser; use `createContent` for fixture setup.
Resolve uploads, mocked media, and other local files with `fixturePath` from `tests/fixtures.ts` so tests also work from editors and the repository root.

The a11y suite imports `test` from `tests/a11y-test.ts` instead.
Its worker-scoped fixture resets the backend, installs the VLT demo profile once, and reuses the example content across all 29 read-only checks.
Do not use that fixture for tests that modify the demo content.

Shared helpers cover login, content creation, block insertion and saving, object-browser selection, folder actions, and accessibility assertions.
The complete [migration inventory](MIGRATION.md) records all 57 original specs and their 221 scenario replacements.
Together with the 29 accessibility checks and two initial Playwright checks, the acceptance project contains 252 tests.

## Configure the helpers

The helpers read these environment variables:

- `BACKEND_HOST` (default `127.0.0.1`)
- `SITE_ID` (default `plone`)
- `API_PATH` (default `http://${BACKEND_HOST}:55001/${SITE_ID}`)
- `FRONTEND_URL` (default `http://localhost:3000`)
