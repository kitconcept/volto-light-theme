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
  it('As editor testing Breadcrumbs', function () {
    cy.wait('@content');
    cy.get('ul.desktop-menu button').contains('Level 1').click();
    cy.get('.subsubitem-wrapper').findByText('Level 3').click();
    cy.get('.breadcrumb').should('exist');
    cy.get('.breadcrumb .home').find('svg').should('exist');
  });

  describe('Navigation Title Tests', () => {
    const contentTypes = ['Document', 'Event', 'News Item'];
    const navTitle = 'Custom Navigation Title';

    contentTypes.forEach((type) => {
      it(`Test nav_title in breadcrumbs for ${type}`, function () {
        // Create content of the specific type
        cy.createContent({
          contentType: type,
          contentId: `test-${type.toLowerCase().replace(' ', '-')}`,
          contentTitle: `Test ${type}`,
          path: '/',
        });

        cy.visit(`/test-${type.toLowerCase().replace(' ', '-')}/edit`);
        cy.wait('@content');
        cy.get('#field-nav_title').click().type(navTitle);
        cy.get('#toolbar-save').click();
        cy.get('.breadcrumb .section').should('have.text', navTitle);
      });

      it(`Test nav_title in main menu for ${type}`, function () {
        cy.createContent({
          contentType: type,
          contentId: `test-${type.toLowerCase().replace(' ', '-')}`,
          contentTitle: `Test ${type}`,
          path: '/',
        });
        cy.visit(`/test-${type.toLowerCase().replace(' ', '-')}/edit`);
        cy.wait('@content');
        cy.get('#field-nav_title').click().type(navTitle);
        cy.get('#toolbar-save').click();
        cy.get('#navigation .desktop-menu li .item')
          .contains(navTitle)
          .should('exist');
      });

      it(`Test nav_title in fat menu for ${type}`, function () {
        cy.createContent({
          contentType: type,
          contentId: `test-${type.toLowerCase().replace(' ', '-')}`,
          contentTitle: `Test ${type}`,
          path: '/',
        });
        cy.visit(`/test-${type.toLowerCase().replace(' ', '-')}/edit`);
        cy.wait('@content');
        cy.get('#field-nav_title').click().type(navTitle);
        cy.get('#toolbar-save').click();
        cy.get('ul.desktop-menu button').contains(navTitle).click();
        cy.get('.submenu-inner').should('exist');
        cy.get('.submenu-inner h2').contains(navTitle).should('exist');
      });

      it(`Test nav_title fallback to title when empty for ${type}`, function () {
        cy.createContent({
          contentType: type,
          contentId: `test-${type.toLowerCase().replace(' ', '-')}`,
          contentTitle: `Test ${type}`,
          path: '/',
        });
        cy.visit(`/test-${type.toLowerCase().replace(' ', '-')}/edit`);
        cy.wait('@content');
        cy.get('#field-nav_title').clear();
        cy.get('#toolbar-save').click();
        cy.get('.breadcrumb .section').should('have.text', `Test ${type}`);
        cy.get('#navigation .desktop-menu li .item')
          .contains(`Test ${type}`)
          .should('exist');
      });
    });
  });
});
