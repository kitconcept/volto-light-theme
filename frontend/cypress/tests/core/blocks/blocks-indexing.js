describe('Block Indexing Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.wait('@content');
    cy.navigate('/my-page/edit');
    cy.wait('@schema');
  });

  it('Index Text Block', () => {
    // GIVEN: A page with a text block with the content 'Noam Avram Chomsky'
    cy.getSlateEditorAndType('Noam Avram Chomsky').contains(
      'Noam Avram Chomsky',
    );
    cy.get('#toolbar-save').click();

    // WHEN: I search for Avram
    cy.get('.navigation-desktop .search-button')
      .findByLabelText('Search')
      .filter('button')
      .click();
    cy.get('.navigation-desktop input[name="SearchableText"]')
      .should('not.be.disabled')
      .clear()
      .type('Avram{enter}');

    // THEN: The search results should contain the page 'Noam Avram Chomsky'
    cy.get('#content-core').contains('My Page');
  });
});
