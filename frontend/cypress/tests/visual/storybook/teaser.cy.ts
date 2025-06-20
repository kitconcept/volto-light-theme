/// <reference types="cypress" />

describe('Storybook - Block Teaser -', () => {
  const storiesUnderTest = [
    { name: 'Teaser left', id: 'blocks-teaser--left' },
    { name: 'Teaser right', id: 'blocks-teaser--right' },
    { name: 'Teaser top', id: 'blocks-teaser--top' },
    { name: 'Person Teaser left', id: 'blocks-teaser--person-teaser-left' },
    { name: 'Person Teaser right', id: 'blocks-teaser--person-teaser-right' },
    { name: 'Person Teaser top', id: 'blocks-teaser--person-teaser-top' },
  ];

  storiesUnderTest.forEach((story) => {
    it(`${story.name}`, () => {
      const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${story.id}&globals=&args=`;
      cy.visit(storyUrl);
      cy.get('.volto-storybook-container').matchImage();
    });
  });
});
