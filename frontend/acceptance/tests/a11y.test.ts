import { expect, test } from './a11y-test';
import { expectNoAccessibilityViolations } from './accessibility';

type AccessibilityCheck = {
  name: string;
  path: string;
  disabledRules?: string[];
};

const checks: AccessibilityCheck[] = [
  {
    name: 'Home page',
    path: '/',
    disabledRules: ['page-has-heading-one'],
  },
  {
    name: 'Accordion block',
    path: '/block/block-accordion',
    disabledRules: ['page-has-heading-one', 'duplicate-id'],
  },
  { name: 'Banner block', path: '/block/banner-block' },
  { name: 'Button block', path: '/block/button-block' },
  {
    name: 'Event calendar block',
    path: '/block/event-calendar',
    disabledRules: ['aria-required-attr'],
  },
  { name: 'Event content type', path: '/content-types/event' },
  { name: 'File content type', path: '/content-types/file' },
  { name: 'Grid block', path: '/block/grid-block' },
  { name: 'Grid image block', path: '/block/grid-block/image' },
  {
    name: 'Grid listing block',
    path: '/block/grid-block/listing',
    // The demo page repeats the same unheaded pagination landmark in its grid.
    disabledRules: ['landmark-unique'],
  },
  { name: 'Grid teaser block', path: '/block/grid-block/teaser' },
  { name: 'Grid text block', path: '/block/grid-block/text' },
  { name: 'Heading block', path: '/block/heading-block' },
  { name: 'Highlight block', path: '/block/highlight-block' },
  { name: 'Image block', path: '/block/image-block' },
  { name: 'Image content type', path: '/content-types/image' },
  { name: 'Introduction block', path: '/block/introduction-block' },
  { name: 'Internal link content type', path: '/content-types/internal-link' },
  {
    name: 'Listing block',
    path: '/block/listing-block',
    disabledRules: ['image-alt'],
  },
  {
    name: 'Maps block',
    path: '/block/maps-block',
    // The map provider nests its own landmark inside the titled map iframe.
    disabledRules: ['landmark-unique'],
  },
  { name: 'News item content type', path: '/content-types/news-item' },
  { name: 'Page content type', path: '/content-types/page' },
  { name: 'Search block', path: '/block/search-block' },
  { name: 'Separator block', path: '/block/separator-block' },
  {
    name: 'Table block',
    path: '/block/table-block',
    disabledRules: ['page-has-heading-one'],
  },
  { name: 'Teaser block', path: '/block/teaser-block' },
  { name: 'Text block', path: '/block/text-block' },
  { name: 'Table of contents block', path: '/block/toc-block' },
  {
    name: 'Video block',
    path: '/block/video-block',
    disabledRules: ['image-alt'],
  },
];

test.describe('Accessibility', () => {
  for (const { name, path, disabledRules = [] } of checks) {
    test(name, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: 'networkidle' });

      expect(response?.ok()).toBeTruthy();
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.locator('#main')).toBeVisible();
      if (path === '/block/listing-block') {
        const galleryDownload = page.getByRole('link', {
          name: 'Download image',
        });
        await expect(galleryDownload).toBeVisible();
        await expect(
          galleryDownload.locator('xpath=ancestor::button'),
        ).toHaveCount(0);
      }
      await expectNoAccessibilityViolations(page, { disabledRules });
    });
  }
});
