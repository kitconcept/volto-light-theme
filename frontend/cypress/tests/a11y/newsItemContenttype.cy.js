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

  //news-item
  it('news-item (/content-types/news-item)', () => {
    cy.navigate('/content-types/news-item');
    cy.wait('@content');
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
