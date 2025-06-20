/// <reference types="cypress" />

describe('Storybook - Block Grid Teaser -', () => {
  const storiesUnderTest = [
    { name: 'One Teaser', id: 'blocks-grid-teaser--one' },
    { name: 'Two Teaser', id: 'blocks-grid-teaser--two' },
    { name: 'Three Teaser', id: 'blocks-grid-teaser--three' },
    { name: 'Four Teaser', id: 'blocks-grid-teaser--four' },
    { name: 'Inversed One Teaser', id: 'blocks-grid-teaser--one-inversed' },
    { name: 'Inversed Two Teaser', id: 'blocks-grid-teaser--two-inversed' },
    { name: 'Inversed Three Teaser', id: 'blocks-grid-teaser--three-inversed' },
    { name: 'Inversed Four Teaser', id: 'blocks-grid-teaser--four-inversed' },
  ];

  storiesUnderTest.forEach((story) => {
    it(`${story.name}`, () => {
      const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${story.id}&globals=&args=`;
      cy.visit(storyUrl);
      cy.get('.volto-storybook-container').matchImage();
    });
  });
});

describe('Storybook - Blocks Grid Teaser Person -', () => {
  const storiesUnderTest = [
    { name: 'One Person Teaser', id: 'blocks-grid-teaser--one-person' },
    { name: 'Two Person Teaser', id: 'blocks-grid-teaser--two-person' },
    { name: 'Three Person Teaser', id: 'blocks-grid-teaser--three-person' },
    { name: 'Four Person Teaser', id: 'blocks-grid-teaser--four-person' },
    {
      name: 'Two Document and Person Teaser',
      id: 'blocks-grid-teaser--two-document-and-person',
    },
    {
      name: 'Two Persons different aspect-ratio',
      id: 'blocks-grid-teaser--two-persons-different-image-ratio',
    },
  ];

  storiesUnderTest.forEach((story) => {
    it(`${story.name}`, () => {
      const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${story.id}&globals=&args=`;
      cy.visit(storyUrl);
      cy.get('.volto-storybook-container').matchImage();
    });
  });
});
