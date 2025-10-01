describe('Search Block Tests', () => {
  var results_number = 3;
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    // Wait a bit to previous teardown to complete correctly because Heisenbug in this point
    cy.wait(2000);
    // given a logged in editor and a page in edit mode
    cy.autologin();

    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My page',
      path: '/',
    });

    cy.createContent({
      contentType: 'Document',
      contentId: 'my-folder',
      contentTitle: 'My Folder',
      path: '/',
    });

    cy.createContent({
      contentType: 'Event',
      contentId: 'my-event',
      contentTitle: 'My Event',
      path: '/',
    });

    cy.visit('/');
    cy.wait('@content');
  });

  afterEach(() => {
    cy.removeContent({ path: 'my-page' });
    cy.removeContent({ path: 'my-folder' });
    cy.removeContent({ path: 'my-event' });
    cy.removeContent({ path: 'my-search-page' });
  });

  it('Search block - test checkbox facet', () => {
    cy.get('#toolbar-add > .icon').click();
    cy.get('#toolbar-add-document').click();
    cy.getSlateTitle().focus().click().type('My Search Page');

    // Add Search listing block
    cy.addNewBlock('search');

    // Add search query criteria
    cy.get('#default-query-0-query .react-select__value-container').click();
    cy.get('#default-query-0-query .react-select__option')
      .contains('Type')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Page')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Folder')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Event')
      .click();

    //  Add checkbox facet
    cy.get('.add-item-button-wrapper > button').click();
    cy.get('[id^="field-field-1-"] .react-select__value-container').click();
    cy.get('.react-select__option').contains('Type').click();
    cy.get('[id^="field-title-0-"]').type('Type');
    cy.get('[id^="field-type-2-"]').click();
    cy.get('.react-select__option').contains('Checkbox').click();

    // Save the page
    cy.get('#toolbar-save > .icon').click();

    cy.wait(500);

    // test search results number
    cy.get('.search-details').should(
      'contain',
      `${results_number} Search results`,
    );

    // test if type facet works
    cy.get('.block.search .facets .checkbox-facet .entries .entry label')
      .contains('Event')
      .click();

    cy.get('.searchBlock-facets').findByText('My Event').should('exist');
    cy.url().should(
      'contain',
      '%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.selection.is%22%2C%22v%22%3A%22Event%22%7D%5D&sort_order=ascending',
    );
    // clear facets
    cy.get('.checkbox-facet').findByText('Event').click();
    cy.url().should(
      'contain',
      '%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.selection.is%22%2C%22v%22%3A%22Event%22%7D%5D&sort_order=ascending',
    );

    cy.get('.checkbox-facet').findByText('Folder').click();
    cy.get('.checkbox-facet').findByText('Page').click();

    cy.wait(2000);

    // // navigate to the searched url
    cy.visit(
      '/my-search-page?query=%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.list.contains%22%2C%22v%22%3A%5B%22Event%22%5D%7D%5D',
    );
    cy.reload();
    cy.wait(2000);
    cy.get('h2.search-details')
      .should('contain', '1')
      .and('contain', 'Search results');

    //navigate to home
    cy.navigate('/');
    cy.wait(500);

    // navigate to the searched url
    cy.navigate(
      // '/my-search-page?query=%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.list.contains%22%2C%22v%22%3A%5B%22Event%22%5D%7D%5D',
      '/my-search-page?query=%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.list.contains%22%2C%22v%22%3A%5B%22Event%22%5D%7D%5D',
    );
    cy.get('h2.search-details')
      .should('contain', '1')
      .and('contain', 'Search results');

    cy.reload();
    cy.get('h2.search-details')
      .should('contain', '1')
      .and('contain', 'Search results');
  });

  it('Search block - test date range facet', () => {
    cy.visit('/');
    cy.get('#toolbar-add > .icon').click();
    cy.get('#toolbar-add-document').click();
    cy.getSlateTitle().focus().click().type('My Search Page');

    // Add Search listing block
    cy.addNewBlock('search');

    // Add search query criteria
    cy.get('#default-query-0-query .react-select__value-container').click();
    cy.get('#default-query-0-query .react-select__option')
      .contains('Type')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Page')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Folder')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Event')
      .click();

    //  Add data range facet
    cy.get('.add-item-button-wrapper > button').click();
    cy.get('[id^="field-field-1-"] .react-select__value-container').click();
    cy.get('.react-select__option').contains('Effective date').click();
    cy.get('[id^="field-title-0-"]').type('Effective date');
    cy.get('[id^="field-type-2-"]').click();
    cy.get('.react-select__option').contains('Date Range').click();

    // TODO: test if date range facet works

    // Save the page
    cy.get('#toolbar-save > .icon').click();

    cy.wait(500);

    // test search results number

    cy.get('h2.search-details')
      .should('contain', `${results_number}`)
      .and('contain', 'Search results');
  });

  it('Search block - test live searchbox', () => {
    cy.visit('/');
    cy.get('#toolbar-add > .icon').click();
    cy.get('#toolbar-add-document').click();
    cy.getSlateTitle().focus().click().type('My Search Page');

    // Add Search listing block
    cy.addNewBlock('search');

    // Add search query criteria
    cy.get('#default-query-0-query .react-select__value-container').click();
    cy.get('#default-query-0-query .react-select__option')
      .contains('Type')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Page')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Folder')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Event')
      .click();

    // Save the page
    cy.get('#toolbar-save > .icon').click();
    cy.wait('@content');

    cy.wait(500);

    // test search results number
    cy.get('h2.search-details')
      .should('contain', `${results_number}`)
      .and('contain', 'Search results');

    cy.queryCounter('**/@querystring-search**', [
      () => cy.get('.search-wrapper .search-input input').focus().type('Event'),
      () =>
        cy
          .get('#page-document .listing-item:first-of-type a')
          .should('have.attr', 'href', '/my-event'),
      () =>
        cy
          .url()
          .should(
            'contain',
            '%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Event%22%7D',
          ),
    ]);

    // // // test removing one char
    cy.queryCounter('**/@querystring-search**', [
      () =>
        cy
          .get('.search-wrapper .search-input input')
          .focus()
          .type('{backspace}'),
      () =>
        cy
          .url()
          .should(
            'contain',
            '%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Even%22%7D',
          ),
    ]);

    // test removing the text with the button
    cy.get('.search-wrapper .search-input input').clear();
    cy.url().should('not.contain', '%22SearchableText%22');

    // test search results number
    cy.get('h2.search-details')
      .should('contain', `${results_number}`)
      .and('contain', 'Search results');

    // test searching for Event
    cy.get('.search-wrapper .search-input input').focus().type('Event');
    cy.get('#page-document .listing-item:first-of-type a').should(
      'have.attr',
      'href',
      '/my-event',
    );

    cy.url().should(
      'contain',
      '%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Event%22%7D',
    );

    // test search results number
    cy.get('h2.search-details')
      .should('contain', '1')
      .and('contain', 'Search results');

    // test removing the whole text from the keyboard
    cy.get('.search-wrapper .search-input input')
      .focus()
      .type('{selectAll}{del}');
  });

  it('Search block - test searchbox', () => {
    cy.visit('/');
    cy.get('#toolbar-add > .icon').click();
    cy.get('#toolbar-add-document').click();
    cy.getSlateTitle().focus().click().type('My Search Page');

    // Add Search listing block
    cy.addNewBlock('search');

    // Add search query criteria
    cy.get('#default-query-0-query .react-select__value-container').click();
    cy.get('#default-query-0-query .react-select__option')
      .contains('Type')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Page')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Folder')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Event')
      .click();

    // Save the page
    cy.get('#toolbar-save > .icon').click();

    cy.wait(500);

    // test search results number
    cy.get('h2.search-details')
      .should('contain', `${results_number}`)
      .and('contain', 'Search results');

    // test searching for Event
    cy.get('.search-wrapper .search-input input').focus().type('Event');

    cy.get('#page-document .listing-item:first-of-type a').should(
      'have.attr',
      'href',
      '/my-event',
    );

    cy.url().should(
      'contain',
      '%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Event%22%7D',
    );

    // test search results number
    cy.get('h2.search-details')
      .should('contain', '1')
      .and('contain', 'Search results');

    // test removing one char
    cy.get('.search-wrapper .search-input input').focus().type('{backspace}');

    cy.url().should(
      'contain',
      '%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Even%22%7D',
    );

    cy.url().should(
      'contain',
      '%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.selection.any%22%2C%22v%22%3A%5B%22Document%22%2C%22Folder%22%2C%22Event%22%5D%7D%2C%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Even%22%7D%5D&sort_order=ascending',
    );

    // test search results number
    cy.get('h2.search-details')
      .should('contain', '1')
      .and('contain', 'Search results');

    // test searching for Event
    cy.get('.search-wrapper .search-input input').focus().type('Event');
    // cy.get('.search-wrapper > .ui.button').click();
    cy.get('#page-document .listing-item:first-of-type a').should(
      'have.attr',
      'href',
      '/my-event',
    );

    cy.url().should(
      'contain',
      '%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.selection.any%22%2C%22v%22%3A%5B%22Document%22%2C%22Folder%22%2C%22Event%22%5D%7D%2C%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22EvenEvent%22%7D%5D&sort_order=ascending',
    );

    // test search results number
    cy.get('h2.search-details')
      .should('contain', '0')
      .and('contain', 'Search results');

    cy.url().should(
      'contain',
      '%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.selection.any%22%2C%22v%22%3A%5B%22Document%22%2C%22Folder%22%2C%22Event%22%5D%7D%2C%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22EvenEvent%22%7D%5D&sort_order=ascending',
    );

    // test search results number
    cy.get('h2.search-details')
      .should('contain', '0')
      .and('contain', 'Search results');
  });

  it('Search block - test on edit sort on and sort order', () => {
    cy.visit('/');
    cy.get('#toolbar-add > .icon').click();
    cy.get('#toolbar-add-document').click();
    cy.getSlateTitle().focus().click().type('My Search Page');

    // Add Search listing block
    cy.addNewBlock('search');

    // Add search query criteria
    cy.get('#default-query-0-query .react-select__value-container').click();
    cy.get('#default-query-0-query .react-select__option')
      .contains('Type')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Page')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Folder')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Event')
      .click();

    // reverse order
    cy.get('label[for=field-sort_order_boolean-2-query]').click();
    //check if the sorting order is working
    cy.get('.listing-item  h2.title').first().contains('My Event');
    cy.get('#select-listingblock-sort-on').click();
    cy.get('.react-select__menu .react-select__group')
      .first()
      .children()
      .first()
      .next()
      .children()
      .first()
      .next()
      .click();
    cy.wait(5000);

    cy.get('.listing-item  h2.title').first().contains('My page');
    //save page
    cy.get('#toolbar-save > .icon').click();
    cy.wait(500);
  });
  // commenting out because we don't have ascending and descending options in VLT.
  // it('Search block - test on select 1 sort on in listing criteria sort on', () => {
  //   cy.visit('/');
  //   cy.get('#toolbar-add > .icon').click();
  //   cy.get('#toolbar-add-document').click();
  //   cy.getSlateTitle().focus().click().type('My Search Page');

  //   // Add Search listing block
  //   cy.addNewBlock('search');

  //   // Add search query criteria
  //   cy.get('#default-query-0-query .react-select__value-container').click();
  //   cy.get('#default-query-0-query .react-select__option')
  //     .contains('Type')
  //     .click();

  //   cy.get('#default-query-0-query .fields:first-of-type > .field').click();
  //   cy.get(
  //     '#default-query-0-query .fields:first-of-type > .field .react-select__option',
  //   )
  //     .contains('Page')
  //     .click();
  //   cy.get(
  //     '#select-listingblock-sort-on > .react-select__control > .react-select__value-container',
  //   ).click();
  //   cy.findByText('Effective date').click();
  //   cy.get('.field-wrapper-showSortOn .wrapper .ui label').click();
  //   //save page
  //   cy.get('#toolbar-save').click();

  //   // then we are able to see title and value
  //   cy.get('span.sorted-label').should('have.text', 'Sorted onEffective date');
  //   cy.get('span.sorted-label-value').should('have.text', 'Effective date');
  //   // Verify the presence of Ascending button
  //   cy.get('button[title="Ascending"]').should('be.visible');
  //   // Verify the presence of Descending button
  //   cy.get('button[title="Descending"]').should('be.visible');
  // });

  // commenting out because we don't have ascending and descending options in VLT.
  // it('Search block - test on only one sort on option below.', () => {
  //   cy.visit('/');
  //   cy.get('#toolbar-add > .icon').click();
  //   cy.get('#toolbar-add-document').click();
  //   cy.getSlateTitle().focus().click().type('My Search Page');

  //   // Add Search listing block
  //   cy.addNewBlock('search');
  //   cy.get('.field-wrapper-showSortOn .wrapper .ui label').click();
  //   cy.get(
  //     '#field-sortOnOptions > .react-select__control > .react-select__value-container ',
  //   ).click();
  //   cy.findByText('Effective date').click();
  //   //save page
  //   cy.get('#toolbar-save').click();
  //   // then we are able to see label and sort option
  //   cy.get('.sort-label').should('have.text', 'Sort on');
  //   cy.get('#select-search-sort-on').click();
  //   cy.findByText('Effective date').click({ force: true });
  //   cy.get(
  //     'div#select-search-sort-on.search-react-select-container.css-2b097c-container',
  //   ).contains('Effective date');
  //   // Verify the presence of Ascending button
  //   cy.get('button[title="Ascending"]').should('be.visible');
  //   // Verify the presence of Descending button
  //   cy.get('button[title="Descending"]').should('be.visible');
  // });
  // commenting out because we don't have ascending and descending options in VLT.
  // it('Search block - test on select both listing sort on and sort on options', () => {
  //   cy.visit('/');
  //   cy.get('#toolbar-add > .icon').click();
  //   cy.get('#toolbar-add-document').click();
  //   cy.getSlateTitle().focus().click().type('My Search Page');

  //   // Add Search listing block
  //   cy.addNewBlock('search');
  //   // Add search query criteria
  //   cy.get('#default-query-0-query .react-select__value-container').click();
  //   cy.get('#default-query-0-query .react-select__option')
  //     .contains('Type')
  //     .click();

  //   cy.get('#default-query-0-query .fields:first-of-type > .field').click();
  //   cy.get(
  //     '#default-query-0-query .fields:first-of-type > .field .react-select__option',
  //   )
  //     .contains('Page')
  //     .click();
  //   cy.get(
  //     '#select-listingblock-sort-on > .react-select__control > .react-select__value-container',
  //   ).click();
  //   cy.findByText('Order in folder').click();
  //   // Add one sort on options below
  //   cy.get('.field-wrapper-showSortOn .wrapper .ui label').click();
  //   cy.get('#field-sortOnOptions').click();
  //   cy.findByText('Effective date').click();
  //   // save page
  //   cy.get('#toolbar-save').click();
  //   // then we are able to see label and sort option
  //   cy.get('.sort-label').should('have.text', 'Sort on');
  //   cy.get('#select-search-sort-on').click();
  //   cy.findByText('Effective date').click({ force: true });
  //   cy.get(
  //     'div#select-search-sort-on.search-react-select-container.css-2b097c-container',
  //   ).contains('Effective date');
  //   cy.get('#select-search-sort-on').click();
  //   cy.get(
  //     'div#select-search-sort-on.search-react-select-container.css-2b097c-container',
  //   ).contains('Order in folder');
  //   // Verify the presence of Ascending button
  //   cy.get('button[title="Ascending"]').should('be.visible');
  //   // Verify the presence of Descending button
  //   cy.get('button[title="Descending"]').should('be.visible');
  // });
});
