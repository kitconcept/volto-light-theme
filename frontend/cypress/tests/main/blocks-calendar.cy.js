describe('Event Calendar Block Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    cy.intercept('GET', '**/@querystring-search**').as('querySearch');

    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.createContent({
      contentType: 'Event',
      contentId: 'my-first-event',
      contentTitle: 'My First Event',
    });
    cy.createContent({
      contentType: 'Event',
      contentId: 'my-second-event',
      contentTitle: 'Second Event',
    });
    cy.visit('/my-page');
    cy.wait('@content');
    cy.navigate('/my-page/edit');
    cy.wait('@content');
  });

  it('Add Event Calendar block', () => {
    cy.addNewBlock('event');
    cy.get('#toolbar-save').click();
    cy.wait('@content');
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    cy.get('.search-input input').type('My First Event').type('{enter}');
    cy.wait('@querySearch');

    cy.get('.row.template-container')
      .findByText('My First Event')
      .should('exist');
    cy.get('.row.template-container')
      .findByText('Second Event')
      .should('not.exist');
  });

  /* Maybe this test should fail, because we are not able to se the date range correctly */
  it.only('Add Event Calendar block and test the daterange', () => {
    // Adding new event calendar block and setting the date of evet.

    cy.addNewBlock('event');
    cy.get('#toolbar-save').click();
    cy.wait('@content');
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    cy.navigate('/my-first-event/edit');
    cy.wait('@content');

    cy.get(
      '#sidebar-metadata .field-wrapper-start .date-time-widget-wrapper',
    ).click();
    cy.get(
      '.CalendarMonth_table td[aria-label="Thursday, July 24, 2025"]',
    ).click();

    cy.get(
      '#sidebar-metadata .field-wrapper-end .date-time-widget-wrapper',
    ).click();
    cy.get(
      '.CalendarMonth_table td[aria-label="Sunday, August 31, 2025"]',
    ).click({ force: true });
    cy.get('#toolbar-save').click();

    // Now we are going to check if the date range is working correctly.
    cy.wait('@content');
    cy.url().should('eq', Cypress.config().baseUrl + '/my-first-event');
    cy.visit('/my-page');
    cy.wait('@content');
    cy.get('.react-aria-Group [slot="start"] [data-type="day"]')
      .focus()
      .type('11');
    cy.get('.react-aria-Group [slot="start"] [data-type="month"]')
      .focus()
      .type('07');

    cy.get('.react-aria-Group [slot="start"] [data-type="year"]')
      .focus()
      .type('2025');

    cy.get('.react-aria-Group [slot="end"] [data-type="day"]')
      .focus()
      .type('01');

    cy.get('.react-aria-Group [slot="end"] [data-type="month"]')
      .focus()
      .type('09');
    cy.wait(1000);

    cy.get('.react-aria-Group [slot="end"] [data-type="year"]')
      .focus()
      .type('2025');
    cy.wait(1000);

    cy.wait('@querySearch');

    // After setting the date range, we should only see the first event.
    cy.get('.row.template-container')
      .findByText('My First Event')
      .should('exist');
    cy.get('.row.template-container')
      .findByText('Second Event')
      .should('not.exist');
  });

  it('Add Event Calendar block and test facet', () => {
    // Adding new event calendar block and facet
    cy.addNewBlock('event');
    cy.get('#sidebar-properties .field-wrapper-facets button')
      .findByText('Add Facet')
      .click({ force: true });
    cy.get('[id^="field-field-1-"] .react-select__value-container').click();
    cy.get('.react-select__option').contains('Review state').click();

    cy.get('#toolbar-save').click();
    cy.wait('@content');
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // Now we are going to select facet if it is public or private
    cy.get('.facets .react-select-container ').click();
    cy.get('.react-select__option').contains('Public').click();
    cy.wait('@querySearch');
    cy.get('.row.template-container')
      .findByText('My First Event')
      .should('not.exist');
    cy.get('.row.template-container')
      .findByText('Second Event')
      .should('not.exist');
    cy.wait(1000); // This is necessary to wait for re-clicking the facet.

    // Now we are making the facet private. All our content is private. so that's why they should be visible.
    cy.get('.facets .react-select-container .react-select__control ').click();
    cy.get('.react-select__option').contains('Private').click();
    cy.wait('@querySearch');
    cy.get('.row.template-container')
      .findByText('My First Event')
      .should('exist');
    cy.get('.row.template-container')
      .findByText('Second Event')
      .should('exist');
  });
});
