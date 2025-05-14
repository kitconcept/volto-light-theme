describe('Navigation', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/');
    cy.wait('@content');
  });
  it('Given an private page, when I logout it is not present in nav anymore', function () {
    cy.findByLabelText('Personal tools').click();
    cy.get('#toolbar-logout').click();
    cy.wait(1000);
    cy.get('#navigation li .item').contains('My Page').should('not.exist');
  });
});

describe('Navigation menu', () => {
  context('menu hamburger', () => {
    beforeEach(() => {
      cy.intercept('GET', `/**/*?expand*`).as('content');
      cy.visit('/');
      cy.wait('@content');
    });

    const hambClass =
      'button.hamburger, .hamburger-wrapper button, .mobile-menu-button, [aria-label="Menu"]';

    it('iphone-xr', () => {
      cy.viewport('iphone-xr');
      cy.wait(1000);

      cy.get(hambClass).should('be.visible');
      cy.get(hambClass).click();

      cy.get('nav.navigation li .item.active').contains('Home');

      cy.get('body')
        .invoke('css', 'overflow')
        .then((ov) => {
          expect(ov).to.eq('visible');
        });
    });

    it('ipad-mini', () => {
      cy.viewport('ipad-mini');
      cy.wait(1000);

      cy.get(hambClass).should('be.visible');
      cy.get(hambClass).click();

      cy.get('nav.navigation li .item.active').contains('Home');

      cy.get('body')
        .invoke('css', 'overflow')
        .then((ov) => {
          expect(ov).to.eq('visible');
        });
    });
  });
});
