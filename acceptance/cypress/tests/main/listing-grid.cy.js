context('Listing Grid Acceptance Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');

    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Document',
    });
    cy.visit('/');
    cy.wait('@content');
  });

  it('As editor I can add a listing with Grid variation', () => {
    // Add page
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
      path: '/document',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page-1',
      contentTitle: 'My Page 1',
      path: '/document',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page-2',
      contentTitle: 'My Page 2',
      path: '/document',
    });

    cy.visit('/document/edit');
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .mostUsed  .button.listing').click({
      force: true,
    });
    cy.get('#field-variation').click();
    cy.get(' #field-variation').findByText('Grid').click();

    cy.get('.querystring-widget .fields').contains('Add criteria').click();
    cy.get(
      '.querystring-widget .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
    )
      .contains('Type')
      .click();

    //insert Page
    cy.get('.querystring-widget .fields:first-of-type > .field').click();
    cy.get(
      '.querystring-widget .fields:first-of-type > .field .react-select__menu .react-select__option',
    )
      .contains('Page')
      .click();

    //verify before save
    cy.get(`.block.listing .listing-item:first-of-type`).contains('My Page');

    //save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/document');

    //test after save
    cy.get('#page-document .listing-item:first-of-type').contains('My Page');
    cy.get('#page-document .listing-item:first-of-type a').should(
      'have.attr',
      'href',
      '/document/my-page',
    );
  });
});
