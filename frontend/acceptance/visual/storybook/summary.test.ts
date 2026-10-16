import { expect, test } from '@playwright/test';

const storybookBaseUrl = 'http://localhost:6006/iframe.html?viewMode=story';

test.describe('Storybook - Primitives Summary', () => {
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

  for (const story of storiesUnderTest) {
    test(story.name, async ({ page }) => {
      await page.goto(`${storybookBaseUrl}&id=${story.id}&globals=&args=`);
      const container = page.locator('.volto-storybook-container');
      await expect(container).toHaveScreenshot(`${story.id}.png`);
    });
  }
});
