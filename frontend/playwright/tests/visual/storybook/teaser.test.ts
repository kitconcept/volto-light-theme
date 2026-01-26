import { expect, test } from '@playwright/test';

const storybookBaseUrl = 'http://localhost:6006/iframe.html?viewMode=story';

test.describe('Storybook - Block Teaser', () => {
  const storiesUnderTest = [
    { name: 'Teaser left', id: 'blocks-teaser--left' },
    { name: 'Teaser right', id: 'blocks-teaser--right' },
    { name: 'Teaser top', id: 'blocks-teaser--top' },
    { name: 'Person Teaser left', id: 'blocks-teaser--person-teaser-left' },
    { name: 'Person Teaser right', id: 'blocks-teaser--person-teaser-right' },
    { name: 'Person Teaser top', id: 'blocks-teaser--person-teaser-top' },
    {
      name: 'Person Teaser left Squared',
      id: 'blocks-teaser--person-teaser-left-squared',
    },
    {
      name: 'Person Teaser right Squared',
      id: 'blocks-teaser--person-teaser-right-squared',
    },
    {
      name: 'Person Teaser top Squared',
      id: 'blocks-teaser--person-teaser-top-squared',
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
