import path from 'path';
import describeWithResolutions from '../../support/describe-with-resolutions';
import describeWithPaths from '../../support/visual/describe-with-paths';
import rangeFilter from '../../support/visual/range-filter';
import hasItPassed from '../../support/visual/has-it-passed';
import { skipOn } from '@cypress/skip-test';

beforeEach(function () {
  skipOn(hasItPassed('cypress' + path.resolve(__filename), this.currentTest));
});

describe('Blocks-Listings-Search', () =>
  describeWithResolutions(undefined, (setViewport, title, resolution) => {
    describe(`anonymous`, () => {
      beforeEach(() => {
        cy.intercept('GET', `/**/*?expand*`).as('content');
        cy.visit('/');
        cy.wait('@content');
        setViewport(cy);
      });

      // it('Listing Block', function () {
      //   cy.intercept('GET', `/**/@querystring-search*`).as(
      //     'querystring-search',
      //   );
      //   cy.navigate('/block/listing-block');
      //   cy.wait([
      //     '@querystring-search',
      //     '@querystring-search',
      //     '@querystring-search',
      //     '@querystring-search',
      //   ]);
      //   cy.matchImage();
      // });

      it('Search Block', function () {
        cy.intercept('GET', `/**/@querystring-search*`).as(
          'querystring-search',
        );
        cy.navigate('/block/search-block');
        cy.wait(['@querystring-search', '@querystring-search']);
        cy.matchImage();
      });

      it('Grid - Listing Block', function () {
        cy.intercept('GET', `/**/@querystring-search*`).as(
          'querystring-search',
        );
        cy.navigate('/block/grid-block/listing');
        cy.wait(['@querystring-search', '@querystring-search']);
        cy.matchImage();
      });

      it('Vertical Spacing - Listing and Listing', function () {
        cy.intercept('GET', `/**/@querystring-search*`).as(
          'querystring-search',
        );
        cy.navigate('/vertical-spacing/listing-and-listing');
        cy.wait([
          '@querystring-search',
          '@querystring-search',
          '@querystring-search',
          '@querystring-search',
          '@querystring-search',
          '@querystring-search',
        ]);
        cy.matchImage();
      });

      it('Vertical Spacing - Listing and text', function () {
        cy.intercept('GET', `/**/@querystring-search*`).as(
          'querystring-search',
        );
        cy.navigate('/vertical-spacing/listing-and-text');
        cy.wait([
          '@querystring-search',
          '@querystring-search',
          '@querystring-search',
          '@querystring-search',
          '@querystring-search',
          '@querystring-search',
        ]);
        cy.matchImage();
      });
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
    });
  }));
