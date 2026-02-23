import { expect, test } from './base-fixture';

const URLs = [
  '/content-types/page',
  '/content-types/image-light',
  '/content-types/event',
];

test.describe('Content Types', () => {
  for (const pagePath of URLs) {
    test(`${pagePath}`, async ({ page }) => {
      await page.goto(pagePath, { waitUntil: 'networkidle' });
      await page.hideStickyMenu();
      await expect(page).toHaveScreenshot(
        `content-types-${pagePath
          .replace('/content-types/', '')
          .replace(/\//g, '-')}.png`,
        { fullPage: true },
      );
    });
  }
});
