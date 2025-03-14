context('Site Action Acceptance Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');

    cy.autologin();
    cy.visit('/');
    cy.viewport('macbook-16');
    cy.visit('/');
  });

  it('As a editor I should see Site action title in header', function () {
    cy.wait('@content');
    cy.get('.tools').findByText('Contact').should('exist');
  });
});
