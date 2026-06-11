import {
  pickSidebarButton,
  save,
  assertBlockStyle,
} from '../../../support/block-helpers';

describe('Blocks Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    cy.intercept('POST', '*').as('saveImage');
    cy.intercept('GET', '/**/image.png/@@images/image-*').as('getImage');
    cy.intercept('PATCH', '/**/my-page').as('save');
    // given a logged in editor and a page in edit mode
    cy.visit('/');
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.wait('@content');

    cy.wait(500);

    cy.navigate('/my-page/edit');
    cy.wait('@schema');
  });

  afterEach(() => {
    // Wait a bit to previous teardown to complete correctly because Heisenbug in this point
    // cy.wait(2000);
  });

  it('Add image block', () => {
    // when I add an image block
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('.block-editor-image [tabindex="0"]')
      .last()
      .should('exist')
      .focus()
      .should('have.focus');
    cy.findAllByLabelText('Enter a URL to an image').filter(':visible').click();
    cy.get('.ui.input.editor-link.input-anchorlink-theme input').type(
      `https://github.com/plone/volto/raw/main/logos/volto-colorful.png{enter}`,
    );
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then the page view should contain the image block
    cy.get('#page-document img').should(
      'have.attr',
      'src',
      'https://github.com/plone/volto/raw/main/logos/volto-colorful.png',
    );

    cy.get('#page-document img')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  // OLD ADD IMAGE VIA DRAG AND DROP
  // it('Add image via drag and drop', () => {
  //   const block = 'image';

  //   // Add image Block
  //   cy.getSlate().click();
  //   cy.get('button.block-add-button').click();
  //   cy.get('.blocks-chooser .title')
  //     .contains('media')
  //     .click();
  //   cy.get(
  //     '.content.active.blocks-list .ui.buttons:first-child button',
  //   ).click();

  //   const fileName = 'image.png';
  //   cy.fixture(fileName).then(fileContent => {
  //     cy.get(`.ui.block.${block} .dropzone`).upload(
  //       {
  //         fileContent,
  //         fileName,
  //         mimeType: 'application/png',
  //       },
  //       { subjectType: 'drag-n-drop' },
  //     );
  //   });
  // });

  // NEW ADD IMAGE VIA DRAG AND DROP
  // it('Add image via drag and drop', () => {
  //   // when I add an image block via drag and drop
  //   cy.getSlate().click();
  //   cy.get('.ui.basic.icon.button.block-add-button').click();
  //   cy.get('.ui.basic.icon.button.image')
  //     .contains('Image')
  //     .click();
  //   const imagePath = { filePath: 'image.png', mimeType: 'image/png' };
  //   cy.get('.ui.block.image .dropzone center img').attachFile(imagePath, {
  //     subjectType: 'drag-n-drop',
  //     force: true,
  //     allowEmpty: true,
  //     encoding: 'utf8',
  //   });
  //   cy.waitForResourceToLoad('image.png/@@images/image');

  //   cy.get('#toolbar-save').click();
  //   cy.wait(5000);
  //   cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
  // });
  it('Add image via upload', () => {
    // when I add an image block via upload
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();

    cy.get('input[type="file"]').attachFile('image.png', {
      subjectType: 'input',
      encoding: 'utf8',
    });
    cy.waitForResourceToLoad('image.png/@@images/image');
    cy.get('#toolbar-save').click();

    cy.wait('@saveImage');
    cy.wait('@getImage');

    // then image src must be equal to image name
    cy.get('.block img')
      .should('have.attr', 'src')
      .and('contains', '/my-page/image.png/@@images/image-');

    cy.get('.block img')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('Create a image block document in edit mode', () => {
    cy.visit('/');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();

    cy.get('input[type="file"]').attachFile('image.png', {
      subjectType: 'input',
      encoding: 'utf8',
    });

    cy.wait('@saveImage');
    cy.wait('@getImage');

    cy.get('.block img')
      .should('have.attr', 'src')
      .and('contains', '/image.png/@@images/image-');

    cy.get('.block img')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('Create an image block and initially alt attr is empty', () => {
    // when I add an image block via upload
    cy.get('.content-area .slate-editor [contenteditable=true]', {
      timeout: 10000,
    }).click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();

    cy.get('input[type="file"]').attachFile('image.png', {
      subjectType: 'input',
      encoding: 'utf8',
    });
    cy.wait('@saveImage');
    cy.wait('@getImage');

    // then in sidebar alt attr should be empty
    cy.get('#sidebar-properties .field-wrapper-alt input#field-alt')
      .should('have.attr', 'value')
      .and('eq', '');
  });

  // Adds an image block with an uploaded image. Once the image has a `url`,
  // the standalone image schema exposes the alignment and block width fields.
  const addImageBlock = () => {
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('input[type="file"]').attachFile('image.png', {
      subjectType: 'input',
      encoding: 'utf8',
    });
    cy.wait('@saveImage');
    cy.wait('@getImage');
  };

  it('A centered image keeps the narrow block width', () => {
    addImageBlock();
    pickSidebarButton('Center');
    pickSidebarButton('Narrow');
    save();

    assertBlockStyle('.block.image', {
      alignment: 'var(--align-center)',
      width: 'var(--narrow-container-width)',
    });
  });

  it('A centered image keeps the default block width', () => {
    addImageBlock();
    pickSidebarButton('Center');
    pickSidebarButton('Default');
    save();

    assertBlockStyle('.block.image', {
      alignment: 'var(--align-center)',
      width: 'var(--default-container-width)',
    });
  });

  it('A centered image keeps the layout block width', () => {
    addImageBlock();
    pickSidebarButton('Center');
    pickSidebarButton('Layout');
    save();

    assertBlockStyle('.block.image', {
      alignment: 'var(--align-center)',
      width: 'var(--layout-container-width)',
    });
  });

  it('A centered image keeps the full block width', () => {
    addImageBlock();
    pickSidebarButton('Center');
    pickSidebarButton('Full');
    save();

    assertBlockStyle('.block.image', {
      alignment: 'var(--align-center)',
      width: '100%',
    });
  });

  it('A left aligned image floats and gets the default container width', () => {
    addImageBlock();
    // pick a non-default width first so the assertion proves the adapter
    // overrode it on float, not that it was left at the default
    pickSidebarButton('Full');
    pickSidebarButton('Left');

    // when floating, the block width is driven by the adapter, not the widget
    cy.get(
      '#sidebar .buttons-widget-option input[aria-label="Default"]',
    ).should('be.disabled');

    save();

    assertBlockStyle('.block.image', {
      alignment: 'var(--align-left)',
      width: 'var(--default-container-width)',
    });
  });

  it('A right aligned image floats and gets the default container width', () => {
    addImageBlock();
    // pick a non-default width first so the assertion proves the adapter
    // overrode it on float, not that it was left at the default
    pickSidebarButton('Full');
    pickSidebarButton('Right');
    save();

    assertBlockStyle('.block.image', {
      alignment: 'var(--align-right)',
      width: 'var(--default-container-width)',
    });
  });

  it('A small floating image gets the narrow container width', () => {
    addImageBlock();
    pickSidebarButton('Left');

    // the image size handles are only enabled while the image is floating
    cy.get('button[aria-label="Small"]').should('not.be.disabled').click();
    save();

    assertBlockStyle('.block.image', {
      alignment: 'var(--align-left)',
      width: 'var(--narrow-container-width)',
    });
  });
});
