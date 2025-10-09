# How to Run Acceptance Tests

Follow these steps to run the acceptance tests:

1. Start the backend for acceptance testing

   ```shell
   make acceptance-backend-dev-start
   ```

2. Start the frontend for acceptance testing

   ```shell
   make acceptance-frontend-dev-start
   ```

3. Open Cypress in the browser.
   Run the following command to open Cypress and execute the acceptance tests:

   ```shell
   make acceptance-test
   ```

---

## How to Run Accessibility (a11y) Tests

Follow these steps to run accessibility tests using Cypress:

1. Start the backend

   ```shell
   make backend-start
   ```

2. Start the frontend

   ```shell
   cd frontend
   make acceptance-frontend-prod-start
   ```

3. Run Cypress for accessibility testing

   ```shell
   cd frontend
   make acceptance-a11y-test
   ```
