import describeWithResolutions from '../../support/describe-with-resolutions';
import describeWithPaths from '../../support/visual/describe-with-paths';
import rangeFilter from '../../support/visual/range-filter';
import hasItPassed from '../../support/visual/has-it-passed';
import { skipOn } from '@cypress/skip-test';
import path from 'path';

beforeEach(function () {
  skipOn(hasItPassed('cypress' + path.resolve(__filename), this.currentTest));
});

describe('Visual base', () =>
  describeWithResolutions(undefined, (setViewport, title) => {
    describe(`unauthenticated`, () => {
      beforeEach(() => {
        cy.visit('/');
        setViewport(cy);
      });

      it('home page', function () {
        // Workaround: interceptor would fail if we are
        // already on /
        // so we visit /news first and then back to /
        cy.intercept('GET', '/**/news?expand*').as('content');
        cy.visit('/news');
        cy.wait('@content');
        cy.intercept('GET', '/**/?expand*').as('content');
        cy.navigate('/');
        cy.wait('@content');
        cy.matchImage();
      });

      it('news page', () => {
        cy.intercept('GET', '/**/news?expand*').as('content');
        cy.navigate('/news');
        cy.wait('@content');
        cy.matchImage();
      });

      /* demonstrate testing a link list */
      const linkOptions = Cypress.env('linkOptions');
      if (typeof linkOptions === 'string') {
        // Cypress would silently swallow this,
        throw new Error(`linkOptions is not valid json [${linkOptions}]`);
      }

      const testPath = (path) => () => {
        setViewport(cy);
        cy.visit(path);
        cy.matchImage();
      };

      const filter = rangeFilter({
        ...linkOptions?.baseLinks,
        exclude: [].concat(linkOptions?.baseLinks?.exclude || []),
      });

      describeWithPaths(
        'basic link list',
        {
          urls: ['/', '/news'],
          filter: (index, url, path) => filter(index),
        },
        (path) => {
          it('visit', testPath(path));
        },
      );
    });

    describe(`authenticated`, () => {
      beforeEach(() => {
        cy.visit('/login');
        cy.get('#login-form-submit');
        cy.get('#login').type('admin');
        cy.get('#password').type('secret');
        cy.intercept('GET', '/**/?expand*').as('content');
        cy.get('#login-form-submit').click();
        cy.wait('@content');
        cy.get('body.has-toolbar');

        setViewport(cy);
      });

      it('home page', function () {
        // Workaround: interceptor would fail if we are
        // already on /
        // so we visit /news first and then back to /
        cy.visit('/news');
        cy.intercept('GET', '/**/?expand*').as('content');
        cy.navigate('/');
        cy.wait('@content');
        cy.matchImage();
      });

      it('news page', () => {
        cy.intercept('GET', '/**/news?expand*').as('content');
        cy.navigate('/news');
        cy.wait('@content');
        cy.matchImage();
      });

      /* demonstrate testing a link list */
      const linkOptions = Cypress.env('linkOptions');
      if (typeof linkOptions === 'string') {
        // Cypress would silently swallow this,
        throw new Error(`linkOptions is not valid json [${linkOptions}]`);
      }

      const testPath = (path) => () => {
        setViewport(cy);
        cy.visit(path);
        cy.matchImage();
      };

      const filter = rangeFilter({
        ...linkOptions?.baseLinks,
        exclude: [].concat(linkOptions?.baseLinks?.exclude || []),
      });

      describeWithPaths(
        'basic link list',
        {
          urls: ['/', '/news'],
          filter: (index, url, path) => filter(index),
        },
        (path) => {
          it('visit', testPath(path));
        },
      );
    });
  }));
