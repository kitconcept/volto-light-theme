describe('Blocks Enter Key Tests - Special Cases', () => {
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

  it('Pressing Enter on a focused HTML block opens Slate editor or block chooser', () => {
    // Add HTML block
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .common .button.html')
      .contains('HTML')
      .click({ force: true });
    cy.wait(500);

    cy.focused().type('{enter}');
    // Now we can see two slate editor
    cy.get('.block-editor-slate').should('have.length', 2);
  });

  it('Pressing Enter on a focused Text block opens Slate editor or block chooser', () => {
    // Add Text block
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .title').contains('Text').click({ force: true });
    cy.get('.blocks-chooser .button.slate')
      .contains('Text')
      .click({ force: true });
    cy.wait(500);

    cy.focused().type('{enter}');
    // Now we can see three slate editor
    cy.get('.block-editor-slate').should('have.length', 3);
  });

  it('Pressing Enter on a focused Introduction block opens Slate editor or block chooser', () => {
    // Add Introduction block
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .mostUsed .button.introduction')
      .contains('Introduction')
      .click({ force: true });
    cy.wait(500);

    cy.focused().type('{enter}');
    // Now we can see two slate editor
    cy.get('.block-editor-slate').should('have.length', 2);
  });

  it('Pressing Enter on a focused Highlight block opens Slate editor or block chooser', () => {
    // Add Highlight block
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .mostUsed .button.highlight')
      .contains('Highlight')
      .click({ force: true });
    cy.wait(500);

    cy.focused().type('{enter}');
    // Now we can see two slate editor
    cy.get('.block-editor-slate').should('have.length', 2);
  });
});
