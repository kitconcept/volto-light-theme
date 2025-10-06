context('Blocks Acceptance Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    cy.viewport('macbook-16');
    cy.createContent({
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Document',
    });
    cy.fixture('halfdome2022.jpg', 'base64').then((fileContent) => {
      cy.createContent({
        contentType: 'Image',
        contentId: 'my-image',
        contentTitle: 'My Image',
        bodyModifier(body) {
          body.image = {
            data: fileContent,
            encoding: 'base64',
            filename: 'image.png',
            'content-type': 'image/png',
          };
          return body;
        },
      });
    });
    cy.autologin();
    cy.visit('/');

    // GIVEN a Document with the title document and a Document to reference with the title Blue Orchids
    cy.createContent({
      contentType: 'Image',
      contentId: 'my-image',
      contentTitle: 'My Image',
      path: '/document',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'blue-orchids',
      contentTitle: 'Blue Orchids',
      contentDescription: 'are growing on the mountain tops',
      preview_image_link: {
        '@id': '/my-image',
      },
      path: '/document',
    });
    cy.wait('@content');
  });

  it('As editor I can add a simple side variant slider block', () => {
    cy.visit('/document/edit');
    cy.wait('@schema');

    // WHEN I create a Slider block
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .mostUsed .button.slider')
      .contains('Slider')
      .click({ force: true });
    cy.get('#field-variation').click().type('simple{enter}');
    cy.get(
      '.objectbrowser-field[aria-labelledby^="fieldset-default-field-label-href-0-"] button[aria-label="Open object browser"]',
    ).click();

    cy.get('[aria-label="Select Blue Orchids"]').dblclick();
    cy.get('[id^="field-head_title-1-"]').click().clear().type('Head title');
    cy.get('[id^="field-buttonText-5-"]').click().clear().type('Button text');
    // Select the checkbox
    cy.get('[id^="field-hideButton-6-"]')
      .check({ force: true })
      .should('be.checked');

    cy.get('[id^="field-hideButton-6-"]')
      .uncheck({ force: true })
      .should('not.be.checked');

    cy.get('.align-buttons button[aria-label="Right"]').click();
    cy.get('.align-buttons button[aria-label="Left"]').click();

    // add 2nd slider block Override Title, Description Image.
    cy.get('.add-item-button-wrapper button').click();

    cy.get(
      '.olw-item-wrapper .olw-item-title-bar[aria-label="Collapse item #2"]',
    )
      .parents('.olw-item-wrapper')
      .within(() => {
        cy.get(
          '.objectbrowser-field[aria-labelledby^="fieldset-default-field-label-href-0-"] button[aria-label="Open object browser"]',
        ).click();
      });

    cy.get('[aria-label="Select Blue Orchids"]').dblclick();
    cy.get(
      '.olw-item-wrapper .olw-item-title-bar[aria-label="Collapse item #2"]',
    )
      .parents('.olw-item-wrapper')
      .within(() => {
        cy.get('[id^="field-title-2-"]').click().clear().type('Override Title');
        cy.get('[id^="field-description-3-"]')
          .click()
          .clear()
          .type('Override Description');
        cy.get(
          '.objectbrowser-field[aria-labelledby^="fieldset-default-field-label-preview_image-4-"] button[aria-label="Open object browser"]',
        ).click();
      });
    cy.get('[aria-label="Select My Image"]').dblclick();

    cy.wait(500);

    cy.get('#toolbar-save').click();
    cy.get('.teaser-item .highlight-image-wrapper img')
      .should(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
        expect($img[0].naturalHeight).to.be.greaterThan(0);
      })
      .should('have.attr', 'src');

    cy.get('.title .supertitle').should('be.visible').contains('Head title');
    cy.get('.title h2').should('be.visible').contains('Blue Orchids');
    cy.get('p')
      .should('be.visible')
      .contains('are growing on the mountain tops');
    cy.get('button').should('be.visible').contains('Button text');

    cy.get('.slider-button.slider-button-next').click();
    cy.wait(1000); // because we have transition in slider. So we have to wait till the transition happened.

    //testing Override Title, Description Image.
    cy.get('.title h2').should('be.visible').contains('Override Title');
    cy.get('p').should('be.visible').contains('Override Description');
    cy.get('button').should('be.visible').contains('Continue reading');
    cy.get(
      '.slider-container .slider-slide:nth-child(2) .highlight-image-wrapper img',
    )
      .should('have.attr', 'src')
      .and('include', '/document/my-image/');
  });

  // Refresh source content button test
  it('As editor I can refresh the slider block content', () => {
    cy.visit('/document/edit');
    cy.wait('@schema');
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .mostUsed .button.slider')
      .contains('Slider')
      .click({ force: true });
    cy.get('#field-variation').click().type('simple{enter}');
    cy.get(
      '.objectbrowser-field[aria-labelledby^="fieldset-default-field-label-href-0-"] button[aria-label="Open object browser"]',
    ).click();

    cy.get('[aria-label="Select Blue Orchids"]').dblclick();
    cy.get('[id^="field-head_title-1-"]').click().clear().type('Head title');
    cy.get('[id^="field-buttonText-5-"]').click().clear().type('Button text');
    // Select the checkbox
    cy.get('[id^="field-hideButton-6-"]')
      .check({ force: true })
      .should('be.checked');

    cy.get('[id^="field-hideButton-6-"]')
      .uncheck({ force: true })
      .should('not.be.checked');

    cy.get('.align-buttons button[aria-label="Right"]').click();
    cy.get('.align-buttons button[aria-label="Left"]').click();

    // add 2nd slider block Override Title, Description Image.
    cy.get('.add-item-button-wrapper button').click();

    cy.get(
      '.olw-item-wrapper .olw-item-title-bar[aria-label="Collapse item #2"]',
    )
      .parents('.olw-item-wrapper')
      .within(() => {
        cy.get(
          '.objectbrowser-field[aria-labelledby^="fieldset-default-field-label-href-0-"] button[aria-label="Open object browser"]',
        ).click();
      });

    cy.get('[aria-label="Select Blue Orchids"]').dblclick();
    cy.get(
      '.olw-item-wrapper .olw-item-title-bar[aria-label="Collapse item #2"]',
    )
      .parents('.olw-item-wrapper')
      .within(() => {
        cy.get('[id^="field-title-2-"]').click().clear().type('Override Title');
        cy.get('[id^="field-description-3-"]')
          .click()
          .clear()
          .type('Override Description');
        cy.get(
          '.objectbrowser-field[aria-labelledby^="fieldset-default-field-label-preview_image-4-"] button[aria-label="Open object browser"]',
        ).click();
      });
    cy.get('[aria-label="Select My Image"]').dblclick();

    cy.wait(500);

    cy.get('.refresh.slider button').click();

    //testing Override Title, Description Image.
    cy.get('[id^="field-title-2-"]')
      .should('be.visible')
      .should('not.have.value', 'Override Title');

    cy.get('[id^="field-description-3-"]')
      .should('be.visible')
      .should('contain.value', 'are growing on the mountain tops');
    cy.get('#toolbar-save').click();
  });
});
