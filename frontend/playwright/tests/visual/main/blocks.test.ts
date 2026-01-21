import { expect, test } from './base-fixture';

const URLs = [
  '/block/search-block',
  '/block/grid-block/text',
  '/block/grid-block/image',
  '/block/grid-block/teaser',
  '/block/table-block',
  '/block/text-block',
  '/block/video-block',
  '/block/toc-block',
  '/block/block-accordion',
  '/block/maps-block',
  '/block/heading-block',
  '/block/button-block',
  '/block/highlight-block',
  '/block/image-block',
  '/block/introduction-block',
  '/block/separator-block',
  '/block/teaser-block',
];

test.describe('Blocks', () => {
  for (const pagePath of URLs) {
    test(`${pagePath}`, async ({ page }) => {
      await page.goto(pagePath, { waitUntil: 'networkidle' });
      await page.hideStickyMenu();
      await expect(page).toHaveScreenshot(
        `blocks-${pagePath.replace('/block/', '').replace(/\//g, '-')}.png`,
        { fullPage: true },
      );
    });
  }
});
