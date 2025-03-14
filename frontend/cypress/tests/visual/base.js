import path from 'path';
import describeWithResolutions from '../../support/describe-with-resolutions';
import describeWithPaths from '../../support/visual/describe-with-paths';
import rangeFilter from '../../support/visual/range-filter';
import hasItPassed from '../../support/visual/has-it-passed';
import { skipOn } from '@cypress/skip-test';

beforeEach(function () {
  skipOn(hasItPassed('cypress' + path.resolve(__filename), this.currentTest));
});

export function visualTestBase(public_pages, private_pages) {
  describeWithResolutions(undefined, (setViewport, title, resolution) => {
    describe(`anonymous`, () => {
      beforeEach(() => {
        cy.intercept('GET', `/**/*?expand*`).as('content');
        cy.visit('/');
        cy.wait('@content');
        setViewport(cy);
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
        cy.wait(1000);
        cy.matchImage();
      };

      const filter = rangeFilter({
        ...linkOptions?.baseLinks,
        exclude: [].concat(linkOptions?.baseLinks?.exclude || []),
      });

      describeWithPaths(
        'Path->',
        {
          urls: public_pages,
          filter: (index, url, path) => filter(index),
        },
        (path) => {
          it('visit', testPath(path));
        },
        setViewport,
      );
    });

    describe(`authenticated`, () => {
      if (['ipad-2', 'iphone-8'].includes(resolution)) {
        // Skip the link list test for smaller resolutions
        return;
      }

      beforeEach(() => {
        cy.autologin('admin', 'admin');
        cy.intercept('GET', `/**/*?expand*`).as('content');
        cy.visit('/');
        cy.wait('@content');
        setViewport(cy);
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
        'Path->',
        {
          urls: private_pages,
          filter: (index, url, path) => filter(index),
        },
        (path) => {
          it('visit', testPath(path));
        },
        setViewport,
      );
    });
  });
}
