describe('Blocks Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');

    // given a logged in editor and a page in edit mode
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

  it('Handles unknown blocks', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'test-doc',
      contentTitle: 'my test document',
      bodyModifier(body) {
        body.blocks['abc'] = { '@type': 'missing' };
        body.blocks_layout.items.push('abc');
        return body;
      },
    });
    cy.visit('/test-doc');
    cy.get('#page-document .blocks-group-wrapper div').should(
      'have.text',
      'Unknown Block missing',
    );
  });
});
