context('Block Acceptance Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport('macbook-16');
    cy.createContent({
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Document',
      path: '/',
    });
    cy.autologin();
  });

  it('As editor I can add a Button block', () => {
    cy.visit('/document/edit');
    cy.getSlate().click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .mostUsed').findByText('Button').click();
    cy.get('#toolbar-save').click();
  });
});
