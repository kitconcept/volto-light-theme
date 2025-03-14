describe('a11y tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/');
    cy.wait('@content');
  });

  // grid Teaser block
  it('Grid-Block Teaser (/block/grid-block/teaser)', () => {
    cy.navigate('/block/grid-block/teaser');
    cy.wait('@content');
    cy.injectAxe();
    cy.configureAxe();
    cy.checkAccessibility();
  });
});
