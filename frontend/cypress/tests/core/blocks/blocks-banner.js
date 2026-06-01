context('Blocks Acceptance Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    cy.viewport('macbook-16');
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.autologin();
    cy.visit('/my-page');
    cy.wait('@content');
  });

  it('As editor I can add a (Layout width) Banner block', () => {
    cy.visit('/my-page/edit');
    cy.wait('@schema');

    // WHEN I create a Banner block
    cy.addNewBlock('banner');
    cy.get('input[type="file"]').attachFile('halfdome2022.jpg', {
      subjectType: 'input',
      encoding: 'base64',
    });

    cy.wait(500);
    cy.get('.field-wrapper-text #field-text').type('Blue Orchids');
    cy.get('.field-wrapper-additionalText #field-additionalText').type(
      'are growing on the mountain tops',
    );
    cy.get('.buttons-widget-option input[aria-label="Layout"]').click({
      force: true,
    });
    cy.get('#toolbar-save').click();

    // THEN I can see the Banner block
    cy.visit('/my-page');
    cy.get('.block.banner').should('have.class', 'has--block-width--layout');

    cy.get('.block.banner .banner-inner-container .text p')
      .eq(0)
      .contains('Blue Orchids');
    cy.get('.block.banner .banner-inner-container .text p')
      .eq(1)
      .contains('are growing on the mountain tops');
  });

  it('As editor I can add a (Full width) Banner block', () => {
    cy.visit('/my-page/edit');
    cy.wait('@schema');

    // WHEN I create a Banner block
    cy.addNewBlock('banner');
    cy.get('input[type="file"]').attachFile('halfdome2022.jpg', {
      subjectType: 'input',
      encoding: 'base64',
    });

    cy.wait(500);
    cy.get('.field-wrapper-text #field-text').type('Blue Orchids');
    cy.get('.field-wrapper-additionalText #field-additionalText').type(
      'are growing on the mountain tops',
    );
    cy.get('.buttons-widget-option input[aria-label="Full"]').click({
      force: true,
    });
    cy.get('#toolbar-save').click();

    // THEN I can see the Banner block
    cy.visit('/my-page');
    cy.get('.block.banner').should('have.class', 'has--block-width--full');

    cy.get('.block.banner .banner-inner-container .text p')
      .eq(0)
      .contains('Blue Orchids');
    cy.get('.block.banner .banner-inner-container .text p')
      .eq(1)
      .contains('are growing on the mountain tops');
  });
});
