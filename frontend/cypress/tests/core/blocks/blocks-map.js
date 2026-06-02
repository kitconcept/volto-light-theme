import {
  pickSidebarButton,
  save,
  assertBlockStyle,
} from '../../../support/block-helpers';

describe('Map Block Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    cy.intercept('PATCH', '/**/my-page').as('save');
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
    cy.wait('@content');
  });

  it('Add maps block - Google Maps', () => {
    // when I add a maps block
    cy.addNewBlock('maps');

    cy.get(`.block.maps .toolbar-inner .ui.input input`)
      .type(
        '<iframe src="https://www.google.com/maps/embed?pb=" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
      )
      .type('{enter}');
    cy.get('#toolbar-save').click();
    cy.wait('@content');
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then the page view should contain the maps block
    cy.get('#page-document iframe')
      .should('have.attr', 'src')
      .and('match', /\/\/www.google.com\/maps\/embed\?pb=/);
  });

  it('Add maps block - OpenStreet Maps', () => {
    // when I add a maps block
    cy.addNewBlock('maps');

    cy.get(`.block.maps .toolbar-inner .ui.input input`)
      .type(
        '<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=2.0408821105957036%2C41.2938013640244%2C2.2400093078613286%2C41.49109217223111&amp;layer=mapnik" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=13/41.3925/2.1404">View Larger Map</a></small>',
      )
      .type('{enter}');
    cy.get('#toolbar-save').click();
    cy.wait('@content');
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // cy.pause();
    // then the page view should contain the maps block
    cy.get('#page-document iframe')
      .should('have.attr', 'src')
      .and('match', /\/\/www.openstreetmap.org\/export\/embed/);
  });

  // Adds a maps block pointing at a Google Maps embed.
  const addMapsBlock = () => {
    cy.addNewBlock('maps');
    cy.get(`.block.maps .toolbar-inner .ui.input input`)
      .type(
        '<iframe src="https://www.google.com/maps/embed?pb=" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
      )
      .type('{enter}');
  };

  it('A centered map keeps the narrow block width', () => {
    addMapsBlock();
    pickSidebarButton('Center');
    pickSidebarButton('Narrow');
    save();

    assertBlockStyle('.block.maps', {
      alignment: 'var(--align-center)',
      width: 'var(--narrow-container-width)',
    });
  });

  it('A centered map keeps the default block width', () => {
    addMapsBlock();
    pickSidebarButton('Center');
    pickSidebarButton('Default');
    save();

    assertBlockStyle('.block.maps', {
      alignment: 'var(--align-center)',
      width: 'var(--default-container-width)',
    });
  });

  it('A centered map keeps the layout block width', () => {
    addMapsBlock();
    pickSidebarButton('Center');
    pickSidebarButton('Layout');
    save();

    assertBlockStyle('.block.maps', {
      alignment: 'var(--align-center)',
      width: 'var(--layout-container-width)',
    });
  });

  it('A centered map keeps the full block width', () => {
    addMapsBlock();
    pickSidebarButton('Center');
    pickSidebarButton('Full');
    save();

    assertBlockStyle('.block.maps', {
      alignment: 'var(--align-center)',
      width: '100%',
    });
  });

  it('A left aligned map floats and gets the default container width', () => {
    addMapsBlock();
    // pick a non-default width first so the assertion proves the adapter
    // overrode it on float, not that it was left at the default
    pickSidebarButton('Full');
    pickSidebarButton('Left');

    // when floating, the block width is driven by the adapter, not the widget
    cy.get(
      '#sidebar .buttons-widget-option input[aria-label="Default"]',
    ).should('be.disabled');

    save();

    assertBlockStyle('.block.maps', {
      alignment: 'var(--align-left)',
      width: 'var(--default-container-width)',
    });
  });

  it('A right aligned map floats and gets the default container width', () => {
    addMapsBlock();
    // pick a non-default width first so the assertion proves the adapter
    // overrode it on float, not that it was left at the default
    pickSidebarButton('Full');
    pickSidebarButton('Right');
    save();

    assertBlockStyle('.block.maps', {
      alignment: 'var(--align-right)',
      width: 'var(--default-container-width)',
    });
  });
});
