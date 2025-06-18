/// <reference types="cypress" />

describe('Storybook - Primitives Summary -', () => {
  const storiesUnderTest = [
    { name: 'Default Summary', id: 'primitives-summary--summary' },
    {
      name: 'Default Summary Hide Description',
      id: 'primitives-summary--summary-hide-description',
    },
    { name: 'News Item Summary', id: 'primitives-summary--news-item-summary' },
    { name: 'Event Summary', id: 'primitives-summary--event-summary' },
    { name: 'File Summary', id: 'primitives-summary--file-summary' },
  ];

  storiesUnderTest.forEach((story) => {
    it(`${story.name}`, () => {
      const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${story.id}&globals=&args=`;
      cy.visit(storyUrl);
      cy.get('.volto-storybook-container').matchImage();
    });
  });
});
