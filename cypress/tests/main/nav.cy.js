context('Navigation Acceptance Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');

    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.visit('/');
    cy.viewport('macbook-16');

    cy.createContent({
      contentType: 'Document',
      contentId: 'level-1',
      contentTitle: 'Level 1',
      path: '/',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'level-2',
      contentTitle: 'Level 2',
      path: '/level-1',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'level-3',
      contentTitle: 'Level 3',
      path: '/level-1/level-2',
    });

    cy.visit('/');
    cy.viewport('macbook-16');
  });

  it('includes 3rd level', function () {
    cy.wait('@content');
    cy.get('ul.desktop-menu button').contains('Level 1').click();
    cy.get('#navigation').contains('Level 2');
    cy.get('#navigation').contains('Level 3');
  });

  it('Open 2nd level', function () {
    cy.wait('@content');
    cy.get('ul.desktop-menu button').contains('Level 1').click();
    cy.get('.subitem-wrapper').findByText('Level 2').click();
    cy.get('.documentFirstHeading').should('have.text', 'Level 2');
  });

  it('Open 3rd level', function () {
    cy.wait('@content');
    cy.get('ul.desktop-menu button').contains('Level 1').click();
    cy.get('.subsubitem-wrapper').findByText('Level 3').click();
    cy.get('.documentFirstHeading').should('have.text', 'Level 3');
  });
});
