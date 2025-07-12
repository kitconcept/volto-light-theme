context('Grid Acceptance Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    cy.intercept('PATCH', '/**/document').as('edit');
    cy.intercept('GET', '**/@querystring-search**').as('querySearch');

    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Document',
    });
    // Adding Image for Grid Image
    cy.createContent({
      contentType: 'Image',
      contentId: 'my-image',
      contentTitle: 'My Image',
      path: '/document',
    });

    cy.visit('/');
    cy.wait('@content');
    cy.navigate('/document');
    cy.wait('@content');
    cy.navigate('/document/edit');
    cy.wait('@schema');
  });

  it('As editor I can add a image block in Grid', () => {
    cy.getSlate().click();
    cy.addNewBlock('grid');
    cy.findByText('2 columns').click();
    cy.get('button[aria-label="Add block in position 0"]').click();
    cy.get('.blocks-chooser .mostUsed .button.image').click();
    cy.get('.block.image .toolbar-inner .buttons:first-child').click();
    cy.get('[aria-label="Select My Image"]').dblclick();
    cy.findByText('my-image');

    cy.get('button[aria-label="Add block in position 1"]').click();
    cy.get('.blocks-chooser .mostUsed .button.image').click();
    cy.get('.block.image .toolbar-inner .buttons:first-child').click();
    cy.get('[aria-label="Select My Image"]').dblclick();
    cy.findByText('my-image');
    cy.get('#toolbar-save').click();
    cy.wait('@edit');
    cy.wait('@content');

    cy.get('.two.column.grid .column:first-child').should(
      'contain',
      'My Image',
    );
    cy.get('.two.column.grid .column:nth-child(2)').should(
      'contain',
      'My Image',
    );
  });

  it('As editor I can add a listing in Grid block', () => {
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
    cy.getSlate().click();
    cy.addNewBlock('grid');
    cy.findByText('2 columns').click();
    cy.get('button[aria-label="Add block in position 0"]').click();
    cy.get('.blocks-chooser .mostUsed .button.listing').click();
    cy.configureListingWith('Page');
    cy.get('button[aria-label="Add block in position 1"]').click();
    cy.get('.blocks-chooser .mostUsed .button.listing').click();
    cy.configureListingWith('Page');
    cy.get('#toolbar-save').click();
    cy.wait('@edit');
    cy.wait('@content');
    cy.wait('@querySearch');
    cy.get('.two.column.grid .column:first-child').should('contain', 'My Page');
    cy.get('.two.column.grid .column:nth-child(2)').should(
      'contain',
      'My Page 1',
    );
  });
});
