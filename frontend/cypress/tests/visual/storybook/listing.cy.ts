/// <reference types="cypress" />

describe('Storybook - Block Listing -', () => {
  const storiesUnderTest = [
    { name: 'Person', id: 'blocks-listing--person' },
    { name: 'Person Summary', id: 'blocks-listing--person-summary' },
  ];

  storiesUnderTest.forEach((story) => {
    it(`${story.name}`, () => {
      const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${story.id}&globals=&args=`;
      cy.visit(storyUrl);
      cy.get('.volto-storybook-container').matchImage();
    });
  });
});
