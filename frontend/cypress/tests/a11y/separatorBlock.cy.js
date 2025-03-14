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

  // separator-block
  it('Separator-block (/block/separator-block)', () => {
    cy.navigate('/block/separator-block');
    cy.wait('@content');
    cy.injectAxe();
    cy.configureAxe({
      rules: [
        // there are copies of slate h3,
        // which have with the same id
        {
          id: 'duplicate-id-active',
          enabled: false,
        },
      ],
    });
    cy.checkAccessibility();
  });
});
