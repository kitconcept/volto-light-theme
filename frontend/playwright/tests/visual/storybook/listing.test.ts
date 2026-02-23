import { expect, test } from '@playwright/test';

const storybookBaseUrl = 'http://localhost:6006/iframe.html?viewMode=story';

test.describe('Storybook - Block Listing', () => {
  const storiesUnderTest = [
    { name: 'Person', id: 'blocks-listing--person' },
    { name: 'Person Summary', id: 'blocks-listing--person-summary' },
    {
      name: 'Person Summary Big Description',
      id: 'blocks-listing--person-summary-with-big-description',
    },
    {
      name: 'Person Summary Squared',
      id: 'blocks-listing--person-summary-squared',
    },
    {
      name: 'Person Summary Big Description Squared',
      id: 'blocks-listing--person-summary-squared-with-big-description',
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
