describe('sticky menu visibility Test', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.createContent({
      contentType: 'Image',
      contentId: 'my-image',
      contentTitle: 'My Image',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page-test',
      contentTitle: 'My Page Test',
    });
    cy.visit('/my-page');
    cy.wait('@content');
  });
  it('create sticky menu items and check if it is hidden in settings/controlpanel and visible elsewhere', () => {
    cy.navigate('/edit');
    cy.get('#metadataform-fieldset-sticky_menu').should('exist');
    cy.get('.field-wrapper-sticky_menu .add-item-button-wrapper')
      .should('exist')
      .dblclick();
    cy.get('.olw-item-wrapper.active').should('exist');
    cy.get('.olw-item-wrapper.active [id^="field-title-"]')
      .should('exist')
      .type('My Link');
    cy.get(
      '.olw-item-wrapper.active [class*="field-wrapper-icon-"] .objectbrowser-field button.ui.button.action',
    )
      .should('exist')
      .click();
    cy.findByLabelText('Search SVG').click();
    cy.get('.ui.input.search').type('My Image');
    cy.findByLabelText('Select My Image').dblclick();

    cy.get('.olw-item-wrapper.active [id^="field-alt-"]')
      .should('exist')
      .type('My Link Test');

    cy.get(
      '.olw-item-wrapper.active [class*="field-wrapper-href-"] .objectbrowser-field button.ui.button.action',
    )
      .should('exist')
      .click();
    cy.findByLabelText('Search SVG').click();
    cy.get('.ui.input.search').type('My Page Test');
    cy.findByLabelText('Select My Page Test').dblclick();

    cy.get('.theme-color-picker.field-wrapper-sticky_menu_color input')
      .click()
      .type('#000000');
    cy.get(
      '.theme-color-picker.field-wrapper-sticky_menu_foreground_color input',
    )
      .click()
      .type('#ffffff');

    cy.get('#toolbar-save').click();
    cy.wait('@content');

    //Test if sticky menu is visible on normal page
    cy.get('.sticky-menu').should('be.visible');

    //Test if sticky menu is not visible on settings and control panel pages
    cy.visit('/my-page/historyview');
    cy.get('.sticky-menu').should('not.be.visible');

    cy.visit('/my-page/aliases');
    cy.get('.sticky-menu').should('not.be.visible');

    cy.visit('/my-page/sharing');
    cy.get('.sticky-menu').should('not.be.visible');

    cy.visit('/my-page/links-to-item');
    cy.get('.sticky-menu').should('not.be.visible');

    cy.visit('/controlpanel/usergroupmembership');
    cy.get('.sticky-menu').should('not.be.visible');
  });
});
