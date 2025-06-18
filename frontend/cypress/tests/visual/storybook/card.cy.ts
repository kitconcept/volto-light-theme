/// <reference types="cypress" />

describe('Storybook - Primitives Card -', () => {
  const storiesUnderTest = [
    { name: 'Simple', id: 'primitives-card--simple' },
    { name: 'Simple without link', id: 'primitives-card--simple-without-link' },
    { name: 'Aligned left', id: 'primitives-card--aligned-left' },
    { name: 'Aligned right', id: 'primitives-card--aligned-right' },
    { name: 'Simple contained', id: 'primitives-card--simple-contained' },
    { name: 'Simple listing', id: 'primitives-card--simple-listing' },
    { name: 'Custom image', id: 'primitives-card--custom-image' },
    { name: 'Custom action', id: 'primitives-card--custom-action' },
    { name: 'With Plone item', id: 'primitives-card--with-item' },
    {
      name: 'With Plone with custom image',
      id: 'primitives-card--with-custom-image',
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
