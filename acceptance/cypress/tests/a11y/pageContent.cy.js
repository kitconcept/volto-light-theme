describe('a11y tests', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/');
  });

  //Page
  it('Page (/content-types/page)', () => {
    cy.navigate('/content-types/page');
    cy.wait(2000);
    cy.injectAxe();
    cy.configureAxe({
      rules: [
        // there are two copies of slate h3,
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