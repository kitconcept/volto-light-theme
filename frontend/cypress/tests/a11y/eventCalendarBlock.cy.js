describe('a11y tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '**/@querystring').as('querystringRequest');
    cy.intercept('GET', '**/@querystring-search?*').as(
      'querystringSearchRequest',
    );
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/');
    cy.wait('@content');
  });

  //Button
  it('Event Calendar Block (/block/event-calendar)', () => {
    cy.navigate('/block/event-calendar');
    cy.wait('@content').its('response.statusCode').should('eq', 200);
    cy.wait('@querystringRequest').its('response.statusCode').should('eq', 200);
    cy.wait('@querystringSearchRequest')
      .its('response.statusCode')
      .should('eq', 200);
    cy.injectAxe();
    cy.configureAxe();
    cy.checkAccessibility();
  });
});
