import path from 'path';
import describeWithResolutions from '../../support/describe-with-resolutions';
import describeWithPaths from '../../support/visual/describe-with-paths';
import rangeFilter from '../../support/visual/range-filter';
import hasItPassed from '../../support/visual/has-it-passed';
import { skipOn } from '@cypress/skip-test';

beforeEach(function () {
  skipOn(hasItPassed('cypress' + path.resolve(__filename), this.currentTest));
});

describe('Homepage', () =>
  describeWithResolutions(undefined, (setViewport, title) => {
    describe(`anonymous`, () => {
      beforeEach(() => {
        cy.intercept('GET', `/**/*?expand*`).as('content');
        cy.visit('/');
        cy.wait('@content');
        setViewport(cy);
      });

      it('home page', function () {
        cy.matchImage();
      });
    });
    describe(`authenticated`, () => {
      beforeEach(() => {
        cy.autologin('admin', 'admin');
        cy.intercept('GET', `/**/*?expand*`).as('content');
        cy.visit('/');
        cy.wait('@content');
        setViewport(cy);
      });

      it('home page', function () {
        cy.matchImage();
      });
    });
  }));
