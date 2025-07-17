describe('Event Calendar Block Tests', () => {
  let startDate;
  let endDate;
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    cy.intercept('GET', '**/@querystring-search**').as('querySearch');
    cy.intercept('PATCH', '/**/my-page').as('save');

    const now = new Date();
    startDate = new Date(now);
    startDate.setMonth(startDate.getMonth() + 1);

    // End = start + 7 days
    endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const formatDate = (date) => date.toISOString().replace('.000Z', '+00:00');
    const eventStart = new Date((startDate.getTime() + endDate.getTime()) / 2);
    const eventEnd = new Date(eventStart.getTime() + 2 * 24 * 60 * 60 * 1000);

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
      bodyModifier(body) {
        body.start = formatDate(eventStart);
        body.end = formatDate(eventEnd);
        return body;
      },
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

  it('Add Event Calendar block and test the daterange', () => {
    // Adding new event calendar block and setting the date of evet.

    cy.addNewBlock('event');
    cy.get('#toolbar-save').click();
    cy.wait('@content');
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    cy.get('.react-aria-Group [slot="start"] [data-type="day"]')
      .focus()
      .type(startDate.getDate().toString());
    cy.get('.react-aria-Group [slot="start"] [data-type="month"]')
      .focus()
      .type((startDate.getMonth() + 1).toString());

    cy.get('.react-aria-Group [slot="start"] [data-type="year"]')
      .focus()
      .type(startDate.getFullYear().toString());

    cy.get('.react-aria-Group [slot="end"] [data-type="day"]')
      .focus()
      .type(endDate.getDate().toString());

    cy.get('.react-aria-Group [slot="end"] [data-type="month"]')
      .focus()
      .type((endDate.getMonth() + 1).toString());

    cy.get('.react-aria-Group [slot="end"] [data-type="year"]')
      .focus()
      .type(endDate.getFullYear().toString());

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
    cy.setWorkflow({
      path: 'my-first-event',
      review_state: 'publish',
    });
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
      .should('not.exist');
    cy.get('.row.template-container')
      .findByText('Second Event')
      .should('exist');
  });

  it('Add Event Calendar block and test query field', () => {
    cy.setWorkflow({
      path: 'my-first-event',
      review_state: 'publish',
    });
    cy.addNewBlock('event');
    cy.get('.sidebar-container .tabs-wrapper .menu .item')
      .contains('Block')
      .click();
    cy.get('.querystring-widget .fields').contains('Add criteria').click();
    cy.get(
      '.querystring-widget .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
    )
      .contains('Review state')
      .click();

    //insert Page
    cy.get('.querystring-widget .fields:first-of-type > .field').click();
    cy.get(
      '.querystring-widget .fields:first-of-type > .field .react-select__menu .react-select__option',
    )
      .contains('Private')
      .click();
    cy.get('#toolbar-save').click();
    cy.wait('@content');
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    cy.wait('@querySearch');
    cy.get('.row.template-container')
      .findByText('My First Event')
      .should('not.exist');
    cy.get('.row.template-container')
      .findByText('Second Event')
      .should('exist');
  });

  it('Respect batching,limits and pagination', () => {
    cy.createContent({
      contentType: 'Event',
      contentId: 'my-folder',
      contentTitle: 'My Folder',
      path: 'my-page',
    });
    cy.createContent({
      contentType: 'Event',
      contentId: 'my-folder2',
      contentTitle: 'My Folder 2',
      path: 'my-page',
    });
    cy.createContent({
      contentType: 'Event',
      contentId: 'my-folder3',
      contentTitle: 'My Folder 3',
      path: 'my-page',
    });
    cy.addNewBlock('event');
    cy.configureListingWith('Event');
    cy.get('#field-limit-3-query').type('2');

    //save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    cy.get('.card-listing').should(($els) => {
      expect($els).to.have.length(2);
    });

    cy.navigate('/my-page/edit');
    cy.wait('@schema');
    cy.get('.block-editor-eventCalendar').click();
    cy.get('#field-limit-3-query').clear().type('0');
    cy.get('#field-b_size-4-query').type('2');
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');
    cy.get('.card-listing').should(($els) => {
      expect($els).to.have.length(2);
    });
    cy.get('.ui.pagination.menu a[value="2"]').first().click({ force: true });
    cy.wait('@querySearch');
    cy.get('.card-listing').should(($els) => {
      expect($els).to.have.length(2);
    });
  });
});
