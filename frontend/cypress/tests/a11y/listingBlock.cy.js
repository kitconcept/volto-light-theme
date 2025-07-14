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

  // Listing-block
  it('Listing-block (/block/listing-block)', () => {
    cy.navigate('/block/listing-block');
    cy.wait('@content');
    cy.injectAxe();
    cy.configureAxe({
      // Disabling 'image-alt'
      // semantic-ui-react's Embed doesn't include an alt tag for the placeholder image
      rules: [
        {
          id: 'image-alt',
          enabled: false,
        },
        {
          id: 'nested-interactive',
          enabled: false,
        },
      ],
    });
    cy.checkAccessibility();
  });
});
