import { fixturePath } from '../../fixtures';
import { expect, test } from '../../test';
import { addBlockFromChooser, save } from '../../blocks';
import { expectLoadedImage } from '../../main/teaser';
import { expectNewFocusedTextBlock, openBlockEditor } from './editor';

test.describe('Blocks Tests', () => {
  test.beforeEach(async ({ page }) => {
    await openBlockEditor(page);
  });

  test('Add image block', async ({ page }) => {
    const imageURL =
      'https://github.com/plone/volto/raw/main/logos/volto-colorful.png';
    await page.route(imageURL, (route) =>
      route.fulfill({
        path: fixturePath('image.png'),
        contentType: 'image/png',
      }),
    );
    await addBlockFromChooser(page, 'Image');
    await page.locator('.toolbar-inner .buttons').nth(2).click();
    const input = page.locator(
      '.ui.input.editor-link.input-anchorlink-theme input',
    );
    await input.fill(imageURL);
    await input.press('Enter');
    await save(page);
    const image = page.locator('#page-document img');
    await expect(image).toHaveAttribute('src', imageURL);
    await expectLoadedImage(image);
    await page.reload();
    await expect(image).toHaveAttribute('src', imageURL);
    await expectLoadedImage(image);
  });

  test('Press Enter on a listing block adds new autofocused default block', async ({
    page,
  }) => {
    await page.locator('.block.slate [contenteditable=true]').click();
    await page.getByRole('button', { name: 'Add block', exact: true }).click();
    await page
      .locator('.blocks-chooser .title')
      .getByText('Common', { exact: true })
      .click();
    await page
      .locator('.blocks-chooser .common')
      .getByRole('button', { name: 'Listing', exact: true })
      .click();
    const listing = page.locator('.block-editor-listing');
    await listing.click();
    await listing.press('Enter');
    await expectNewFocusedTextBlock(page);
  });
});
