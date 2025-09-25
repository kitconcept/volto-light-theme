describe('Event Calendar Block Tests', () => {
  let startDate;
  let endDate;
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    cy.intercept('GET', '**/@querystring-search**').as('querySearch');
    cy.intercept('PATCH', '/**/my-page').as('save');

    const now = new Date();

    // Start = 7th of month
    startDate = new Date(now.getFullYear(), now.getMonth(), 7);

    // End = 14th of same month
    endDate = new Date(startDate.getFullYear(), startDate.getMonth(), 14);

    // Always 11th for eventStart
    const eventStart = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      11,
    );

    // Always 12th for eventEnd
    const eventEnd = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      12,
    );

    const formatDate = (date) => date.toISOString().replace('.000Z', '+00:00');

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
      contentId: 'my-search-event',
      contentTitle: 'Search Event',
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
      bodyModifier(body) {
        const baseYear = now.getFullYear();
        const baseMonth = now.getMonth();
        const startDate = new Date(baseYear, baseMonth, 16);
        body.start = formatDate(startDate);
        body.end = formatDate(new Date(startDate.getTime() + 1000));

        return body;
      },
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
      .type((startDate.getMonth() + 1).toString()); // we have to add one here because the month index starts from 0. but above not because formatDate function takes care of that.

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
    cy.get('.react-select__option').contains('Published').click();
    cy.wait('@querySearch');
    cy.get('.row.template-container')
      .findByText('My First Event')
      .should('exist');
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
    cy.get('#sidebar-properties .querystring-widget .fields')
      .contains('Add criteria')
      .click();
    cy.get(
      '#sidebar-properties .querystring-widget .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
    )
      .contains('Review state')
      .click();

    //insert Page
    cy.get(
      '#sidebar-properties .querystring-widget .fields:first-of-type > .field',
    ).click();
    cy.get(
      '#sidebar-properties .querystring-widget .fields:first-of-type > .field .react-select__menu .react-select__option',
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

  it('Test the daterange with facet and input', () => {
    // Adding new event calendar block and setting the two event content published.
    cy.setWorkflow({
      path: 'my-first-event',
      review_state: 'publish',
    });
    cy.setWorkflow({
      path: 'my-search-event',
      review_state: 'publish',
    });
    cy.addNewBlock('event');

    // setting the facet
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
    cy.get('.react-select__option').contains('Published').click();
    cy.wait('@querySearch');
    cy.get('.row.template-container')
      .findByText('My First Event')
      .should('exist');
    cy.get('.row.template-container')
      .findByText('Second Event')
      .should('not.exist');

    // Now we are going to set the date range.
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

    // After setting the date range, we should see the first event.
    cy.get('.row.template-container')
      .findByText('My First Event')
      .should('exist');
    cy.get('.row.template-container')
      .findByText('Second Event')
      .should('not.exist');

    // Now we are going to search the event.
    cy.get('.first-row .search-input input').type('Search Event');

    cy.wait('@querySearch');

    // After searching, we should see the searched event.
    cy.get('.row.template-container')
      .findByText('Search Event')
      .should('exist');
    // We should not see the first event.
    cy.get('.row.template-container')
      .findByText('My First Event')
      .should('not.exist');
    cy.get('.first-row .search-input input').clear();
    // Now changing to the private review state
    cy.wait(1000); // This is necessary to wait for re-clicking the facet.
    cy.get('.facets .react-select-container .react-select__control ').click();
    cy.get('.react-select__option').contains('Private').click();
    cy.wait('@querySearch');

    // After changing the review state to private, we should not see the first event.
    cy.get('.row.template-container')
      .findByText('My First Event')
      .should('not.exist');
    cy.get('.row.template-container')
      .findByText('Second Event')
      .should('not.exist');

    // Now we are going to reset the date range.
    cy.get('.react-aria-DateRangePicker .reset-date-range').click();
    cy.wait('@querySearch');
    // Since we reset the date range and facet is still private, we should not see the first event.
    cy.get('.row.template-container')
      .findByText('My First Event')
      .should('not.exist');
  });

  it('EventCalendar block - Test Criteria: short-name', () => {
    cy.clearSlateTitle().type(
      'EventCalendar block - Test Criteria: short-name',
    );

    //add eventCalendar block
    cy.addNewBlock('event');

    //********  add short-name criteria filter
    cy.get('.sidebar-container .tabs-wrapper .menu .item')
      .contains('Block')
      .click();
    cy.get('.querystring-widget .fields').contains('Add criteria').click();
    cy.get(
      '.querystring-widget .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
    )
      .contains('Short name (id)')
      .click();
    //short-name is..
    cy.get(
      '.querystring-widget .fields:first-of-type .main-fields-wrapper .field:last-of-type',
    ).click();
    cy.get(
      '.querystring-widget .fields:first-of-type .main-fields-wrapper .field:last-of-type .react-select__menu .react-select__option',
    )
      .contains('Is')
      .click();
    //insert short name
    cy.get('.querystring-widget .fields:first-of-type > .field input')
      .clear()
      .type('my-first-event');

    //before save, vrify if in list there's a page with id my-page-test
    cy.get(`.block.eventCalendar .card-listing:first-of-type .title`).contains(
      'My First Event',
    );
    //before save, verify if in list there isn't the Event with title Search event
    cy.get(`.block.eventCalendar .card-listing .title`)
      .contains('Search Event')
      .should('not.exist');

    //save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    cy.get('#page-document .card-listing:first-of-type').contains(
      'My First Event',
    );
    cy.get('#page-document .card-listing:first-of-type a').should(
      'have.attr',
      'href',
      '/my-first-event',
    );
  });

  it('Event calendar show single date for same day event and double for different', () => {
    //add eventCalendar block
    cy.addNewBlock('event');
    cy.get('#toolbar-save').click();
    cy.wait('@content');
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    cy.get('a[href="/my-second-event"]')
      .next('div.card-inner')
      .find('.date-inset')
      .should('not.have.class', 'has-end-date');
  });

  it('Add eventCalendar Block - sort by Order in folder and sort_order:descending', () => {
    //add eventCalendar block
    cy.addNewBlock('event');

    //********  add Type criteria filter
    cy.configureListingWith('Event');

    // selecting sort_on 'Order in folder'
    cy.get('#select-listingblock-sort-on')
      .click()
      .type('Order in folder {enter}');

    //save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    // My first event should be first in the list
    cy.get('#page-document .card-listing:first-of-type').contains(
      'My First Event',
    );
    cy.get('#page-document .card-listing:first-of-type a').should(
      'have.attr',
      'href',
      '/my-first-event',
    );

    // selecting sort order 'Reversed'
    cy.navigate('/my-page/edit');
    cy.wait('@content');
    cy.wait('@schema');
    cy.wait('@querySearch');
    cy.get('.block-editor-eventCalendar').click();
    cy.get('input[name="field-sort_order_boolean-2-query"]')
      .check({ force: true })
      .should('be.checked');

    //save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');
    cy.wait('@querySearch');

    // Second event should be first in the list
    cy.get('#page-document .card-listing:first-of-type').contains(
      'Second Event',
    );
    cy.get('#page-document .card-listing:first-of-type a').should(
      'have.attr',
      'href',
      '/my-second-event',
    );
  });
});
