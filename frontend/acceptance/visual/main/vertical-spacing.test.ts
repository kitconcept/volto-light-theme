import { expect, test, VIEWPORTS } from './base-fixture';

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
    for (const viewport of VIEWPORTS) {
      test(`Vertical Spacing - ${pagePath} - ${viewport.name}`, async ({
        page,
      }) => {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await page.goto(pagePath, { waitUntil: 'networkidle' });
        await page.hideStickyMenu();
        await expect(page).toHaveScreenshot(
          `vertical-spacing-${pagePath
            .replace('/vertical-spacing/', '')
            .replace(/\//g, '-')}-${viewport.name}.png`,
          { fullPage: true },
        );
      });
    }
  }
});
