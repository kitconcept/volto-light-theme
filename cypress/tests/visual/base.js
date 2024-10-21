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
    describe.only(`unauthenticated`, () => {
      beforeEach(() => {
        cy.intercept('GET', `/**/*?expand*`).as('content');
        cy.visit('/');
        cy.wait('@content');
        setViewport(cy);
      });

      // it('home page', function () {
      //   cy.matchImage();
      // });

      /* demonstrate testing a link list */
      const linkOptions = Cypress.env('linkOptions');
      if (typeof linkOptions === 'string') {
        // Cypress would silently swallow this,
        throw new Error(`linkOptions is not valid json [${linkOptions}]`);
      }

      const testPath = (path) => () => {
        setViewport(cy);
        cy.navigate(path);
        cy.wait('@content');
        cy.matchImage();
      };

      const filter = rangeFilter({
        ...linkOptions?.baseLinks,
        exclude: [].concat(linkOptions?.baseLinks?.exclude || []),
      });

      describeWithPaths(
        'basic link list',
        {
          urls: ['/', '/content-types/page'],
          filter: (index, url, path) => filter(index),
        },
        (path) => {
          it('visit', testPath(path));
        },
        setViewport,
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
        cy.navigate(path);
        cy.wait('@content');
        cy.matchImage();
      };

      const filter = rangeFilter({
        ...linkOptions?.baseLinks,
        exclude: [].concat(linkOptions?.baseLinks?.exclude || []),
      });

      describeWithPaths(
        'basic link list',
        {
          urls: ['/', '/content-types/page'],
          filter: (index, url, path) => filter(index),
        },
        (path) => {
          it('visit', testPath(path));
        },
      );
    });
  }));
