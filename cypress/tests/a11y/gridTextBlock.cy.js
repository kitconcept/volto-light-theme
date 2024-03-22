describe('a11y tests', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/');
  });

  // grid tex block
  it('Grid-Block text (/block/grid-block/text)', () => {
    cy.navigate('/block/grid-block/text');
    cy.wait(2000);
    cy.injectAxe();
    cy.configureAxe({
      rules: [
        // there are copies of slate h2,
        // which have with the same id
        {
          id: 'duplicate-id-active',
          enabled: false,
        },
        // there are missing heading of grid-block
        // because we are using multiple grid block
        {
          id: 'empty-heading',
          enabled: false,
        },
      ],
    });
    cy.checkAccessibility();
  });
});