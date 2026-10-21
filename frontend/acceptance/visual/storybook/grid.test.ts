import { expect, test } from '@playwright/test';

const storybookBaseUrl = 'http://localhost:6006/iframe.html?viewMode=story';

test.describe('Storybook - Block Grid Teaser', () => {
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

  for (const story of storiesUnderTest) {
    test(story.name, async ({ page }) => {
      await page.goto(`${storybookBaseUrl}&id=${story.id}&globals=&args=`);
      const container = page.locator('.volto-storybook-container');
      await expect(container).toHaveScreenshot(`${story.id}.png`);
    });
  }
});

test.describe('Storybook - Blocks Grid Teaser Person', () => {
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

  for (const story of storiesUnderTest) {
    test(story.name, async ({ page }) => {
      await page.goto(`${storybookBaseUrl}&id=${story.id}&globals=&args=`);
      const container = page.locator('.volto-storybook-container');
      await expect(container).toHaveScreenshot(`${story.id}.png`);
    });
  }
});
