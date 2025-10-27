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
    cy.createContent({
      contentType: 'Document',
      contentId: 'page',
      contentTitle: 'My Page',
      path: '/',
      preview_image_link: {
        '@id': '/my-image',
      },
    });
    cy.autologin();
  });

  it('As editor I can add a Slider block', () => {
    cy.visit('/document/edit');
    cy.addNewBlock('slider');
    cy.get('#toolbar-save').click();
  });

  it('As editor I can add a Slider block and teaser another content', () => {
    cy.intercept('PATCH', '/**').as('save');
    cy.intercept('GET', `/**/*?expand*`).as('content');

    cy.visit('/document/edit');
    cy.addNewBlock('slider');

    // First slide
    cy.get(
      '.objectbrowser-field[aria-labelledby^="fieldset-default-field-label-href-0-"] button[aria-label="Open object browser"]',
    ).click();
    cy.get('aside .breadcrumbs svg.home-icon').click();
    cy.findByLabelText('Select My Page').dblclick();

    // Second slide
    cy.findByText('Add item').click();
    // cy.findByLabelText('Show item #2').click();
    cy.get(
      '.olw-item-content.active .objectbrowser-field[aria-labelledby^="fieldset-default-field-label-href-0-"] button[aria-label="Open object browser"]',
    ).should('be.visible');
    cy.get(
      '.olw-item-content.active .objectbrowser-field[aria-labelledby^="fieldset-default-field-label-href-0-"] button[aria-label="Open object browser"]',
    ).click();
    cy.wait(1000);
    cy.get('aside .breadcrumbs svg.home-icon').click();
    cy.findByLabelText('Select My Page').dblclick();

    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');
    cy.get('.highlight-image-wrapper img')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
      });

    cy.get('.teaser-item-title').should('be.visible').contains('My Page');
  });

  it('a11y', () => {
    cy.intercept('PATCH', '/**').as('save');
    cy.intercept('GET', `/**/*?expand*`).as('content');

    cy.visit('/document/edit');
    cy.addNewBlock('slider');

    // First slide
    cy.get(
      '.objectbrowser-field[aria-labelledby^="fieldset-default-field-label-href-0-"] button[aria-label="Open object browser"]',
    ).click();
    cy.get('aside .breadcrumbs svg.home-icon').click();
    cy.findByLabelText('Select My Page').dblclick();

    // Second slide
    cy.findByText('Add item').click();
    // cy.findByLabelText('Show item #2').click();
    cy.get(
      '.olw-item-content.active .objectbrowser-field[aria-labelledby^="fieldset-default-field-label-href-0-"] button[aria-label="Open object browser"]',
    ).should('be.visible');
    cy.get(
      '.olw-item-content.active .objectbrowser-field[aria-labelledby^="fieldset-default-field-label-href-0-"] button[aria-label="Open object browser"]',
    ).click();
    cy.wait(1000);
    cy.get('aside .breadcrumbs svg.home-icon').click();
    cy.findByLabelText('Select My Page').dblclick();

    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    cy.get('.highlight-image-wrapper img')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
      });

    cy.get('.teaser-item-title').should('be.visible').contains('My Page');

    cy.injectAxe({ axeCorePath: './node_modules/axe-core/axe.min.js' });
    cy.checkAccessibility();
  });
});
