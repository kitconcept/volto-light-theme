describe('Enter key behavior on focused blocks', () => {
  const addBlockAndPressEnter = ({
    chooserClass,
    label,
    chooserSection = 'mostUsed',
    selectedSelectors,
  }) => {
    // Open block chooser and pick the block
    cy.get('.button .block-add-button').click({ force: true });

    cy.get(`.blocks-chooser .${chooserSection} .button.${chooserClass}`)
      .contains(label)
      .click({ force: true });

    cy.wait(500);
    // press enter
    cy.focused().type('{enter}');
    // Now we can see two slate editor
    cy.get('.block-editor-slate').should('have.length', 2);
  };

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

  it('Pressing Enter on a focused Button block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'button',
      label: 'Button',
    });
  });

  it('Pressing Enter on a focused Heading block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'heading',
      label: 'Heading',
    });
  });

  it('Pressing Enter on a focused Image block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'image',
      label: 'Image',
    });
  });

  it('Pressing Enter on a focused Grid block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'gridBlock',
      label: 'Grid',
    });
  });

  it('Pressing Enter on a focused Social Media block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'followUsBlock',
      label: 'Follow Us Block',
      chooserSection: 'common',
    });
  });

  it('Pressing Enter on a focused Calendar block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'eventCalendar',
      label: 'Calendar',
      chooserSection: 'common',
    });
  });

  it('Pressing Enter on a focused Listing block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'listing',
      label: 'Listing',
    });
  });

  it('Pressing Enter on a focused Maps block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'maps',
      label: 'Maps',
      chooserSection: 'common',
    });
  });

  it('Pressing Enter on a focused Search block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'search',
      label: 'Search',
      chooserSection: 'common',
    });
  });

  it('Pressing Enter on a focused Separator block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'separator',
      label: 'Separator',
    });
  });

  it('Pressing Enter on a focused Teaser block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'teaser',
      label: 'Teaser',
    });
  });

  it('Pressing Enter on a focused Table of Contents block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'toc',
      label: 'Table of Contents',
      chooserSection: 'common',
    });
  });

  it('Pressing Enter on a focused Carousel block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'carousel',
      label: 'Carousel',
    });
  });

  it('Pressing Enter on a focused Logos block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'logos',
      label: 'Logos',
    });
  });

  it('Pressing Enter on a focused Slider block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'slider',
      label: 'Slider',
      chooserSection: 'common',
    });
  });

  it('Pressing Enter on a focused Banner block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'banner',
      label: 'Banner',
      chooserSection: 'common',
    });
  });

  it('Pressing Enter on a focused Description block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'description',
      label: 'Description',
      chooserSection: 'text',
    });
  });

  it('Pressing Enter on a focused Video block opens Slate editor or block chooser', () => {
    addBlockAndPressEnter({
      chooserClass: 'video',
      label: 'Video',
    });
  });
});

