// Note: The fixture is not using this file.
// In order to use it, you need to setup the supportFile in cypress.config.js:
// e2e: {
//   ...
//   supportFile: 'cypress/support/e2e.js',
// },

import 'cypress-axe';
import 'cypress-file-upload';
import './commands';
import 'cypress-axe';
import { setup, teardown } from '@plone/volto/cypress/support/reset-fixture';

beforeEach(function () {
  cy.setCookie('confirm_cookies', '1', { sameSite: 'lax' });
  cy.setCookie('confirm_tracking', '1', { sameSite: 'lax' });
  cy.setCookie('confirm_facebook', '1', { sameSite: 'lax' });
  cy.setCookie('confirm_youtube', '1', { sameSite: 'lax' });
  cy.log('Setting up API fixture');
  if (!Cypress.env('a11y')) {
    setup();
  }
});

afterEach(function () {
  cy.log('Tearing down API fixture');
  if (!Cypress.env('a11y')) {
    teardown();
  }
});
