context('Site Action Acceptance Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');

    cy.autologin();
    cy.request({
      method: 'PATCH',
      url: 'http://127.0.0.1:55001/plone/',
      headers: { Accept: 'application/json' },
      body: {
        header_actions: [
          {
            title: 'Github',
            href: [
              {
                '@id': 'https://github.com/kitconcept/volto-light-theme',
              },
            ],
            openLinkInNewTab: true,
          },
          {
            title: 'Sitemap',
            href: [
              {
                '@id': '/sitemap',
              },
            ],
          },
        ],
      },
    }).then(() => {
      cy.visit('/');
      cy.viewport('macbook-16');
      cy.visit('/');
    });
  });

  it('As a editor I should see Site action title in header', function () {
    cy.wait('@content');
    cy.get('.tools').findByText('Github').should('exist');
    cy.get('.tools').findByText('Sitemap').should('exist');
  });
});
