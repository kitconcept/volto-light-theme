import { expect, test } from '../../test';
import { openBlockEditor } from './editor';
import { chooseBlock } from './editor-actions';

test.describe('Enter key behavior on focused blocks', () => {
  test.beforeEach(async ({ page }) => {
    await openBlockEditor(page);
  });
  for (const [name, type, label, section] of [
    ['Button', 'button', 'Button'],
    ['Heading', 'heading', 'Heading'],
    ['Image', 'image', 'Image'],
    ['Grid', 'gridBlock', 'Grid'],
    ['Social Media', 'followUsBlock', 'Follow Us Block', 'common'],
    ['Calendar', 'eventCalendar', 'Event Calendar', 'common'],
    ['Listing', 'listing', 'Listing'],
    ['Maps', 'maps', 'Maps', 'common'],
    ['Search', 'search', 'Search', 'common'],
    ['Separator', 'separator', 'Separator'],
    ['Teaser', 'teaser', 'Teaser'],
    ['Table of Contents', 'toc', 'Table of Contents', 'common'],
    ['Carousel', 'carousel', 'Carousel'],
    ['Logos', 'logos', 'Logos'],
    ['Slider', 'slider', 'Slider', 'common'],
    ['Banner', 'banner', 'Banner', 'common'],
    ['Video', 'video', 'Video'],
  ]) {
    test(`Pressing Enter on a focused ${name} block opens Slate editor or block chooser`, async ({
      page,
    }) => {
      await chooseBlock(page, type, label, section);
      await page.keyboard.press('Enter');
      await expect(page.locator('.block-editor-slate')).toHaveCount(2);
    });
  }
});
