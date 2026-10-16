# Run acceptance tests

Run acceptance and accessibility tests against the same Plone acceptance backend and Volto frontend.

1. Install Chromium.

   ```shell
   make -C frontend install-playwright
   ```

2. Start the acceptance backend in one terminal.

   ```shell
   make acceptance-backend-dev-start
   ```

3. Start the frontend in another terminal.

   ```shell
   make acceptance-frontend-dev-start
   ```

4. Open the Playwright interactive runner.

   ```shell
   make acceptance-test
   ```

To run headlessly against those servers, use `make -C frontend ci-acceptance-test`.
To start acceptance containers, run the suite, and stop the containers, use `make ci-acceptance-test` from the repository root.

## Run accessibility tests

Start the same acceptance servers, then open the accessibility suite:

```shell
make acceptance-a11y-test
```

To run it headlessly, run these commands from the repository root:

```shell
cd frontend
pnpm test:acceptance acceptance/tests/a11y.test.ts
```

The accessibility fixture imports the example content once per worker and reuses it across the read-only checks.
You do not need a separate backend image or persistent demo site.

## Run visual regression tests

Use the separate `visual` and `storybook` Playwright projects for screenshot comparisons.
See {doc}`visual-regression-tests` for their server setup and baseline workflows.
