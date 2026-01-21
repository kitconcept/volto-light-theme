import { expect, test } from './base-fixture';

const URLs = [
  '/vertical-spacing/grid-and-button',
  '/vertical-spacing/grid-and-grids',
  '/vertical-spacing/grid-and-text',
  '/vertical-spacing/heading-and-introduction',
  '/vertical-spacing/highlight-and-grid',
  '/vertical-spacing/highlight-and-text',
  '/vertical-spacing/teasers-and-text',
  '/vertical-spacing/text',
];

test.describe('Vertical Spacing', () => {
  for (const pagePath of URLs) {
    test(`Vertical Spacing - ${pagePath}`, async ({ page }) => {
      await page.goto(pagePath, { waitUntil: 'networkidle' });
      await page.hideStickyMenu();
      await expect(page).toHaveScreenshot(
        `vertical-spacing-${pagePath
          .replace('/vertical-spacing/', '')
          .replace(/\//g, '-')}.png`,
        { fullPage: true },
      );
    });
  }
});
