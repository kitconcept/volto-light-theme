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

  it('Home page (/)', () => {
    cy.injectAxe();
    cy.configureAxe({
      rules: [
        // the example home page intentionally omits the h1
        {
          id: 'page-has-heading-one',
          enabled: false,
        },
      ],
    });
    cy.checkAccessibility();
  });
});
