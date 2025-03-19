import 'cypress-axe';
import 'cypress-file-upload';
import './commands';
import './visual/commands';
import 'cypress-axe';
import { setup, teardown } from '@plone/volto/cypress/support/reset-fixture';

beforeEach(function () {
  cy.setCookie('confirm_cookies', '1');
  cy.setCookie('confirm_tracking', '1');
  cy.setCookie('confirm_facebook', '1');
  cy.setCookie('confirm_youtube', '1');
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
