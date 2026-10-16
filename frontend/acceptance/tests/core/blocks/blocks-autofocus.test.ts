import { expect, test } from '../../test';
import { addBlockFromSlashMenu } from '../../blocks';
import { expectLoadedImage } from '../../main/teaser';
import { expectNewFocusedTextBlock, openBlockEditor } from './editor';

test.describe('New Block Auto Focus Tests', () => {
  test.beforeEach(async ({ page }) => {
    await openBlockEditor(page);
  });

  test('Press Enter on a text block adds new autofocused default block', async ({
    page,
  }) => {
    await page.locator('.block.slate [contenteditable=true]').click();
    await page.getByRole('button', { name: 'Add block', exact: true }).click();
    await page
      .locator('.blocks-chooser .title')
      .getByText('Text', { exact: true })
      .click();
    await page
      .locator('.blocks-chooser .text')
      .getByRole('button', { name: 'Text', exact: true })
      .click();
    const editor = page.locator('.text-slate-editor-inner').first();
    await editor.click();
    await editor.press('Enter');
    await expect(
      page.locator('.block-editor-slate + .block-editor-slate'),
    ).toBeVisible();
    await expectNewFocusedTextBlock(page);
  });

  for (const { name, type, search, image } of [
    { name: 'image', type: 'image', search: 'image', image: 'img' },
    { name: 'video', type: 'video', search: 'video', image: '.message img' },
    { name: 'listing', type: 'listing', search: 'listing' },
    { name: 'table of contents', type: 'toc', search: 'contents' },
    { name: 'maps', type: 'maps', search: 'maps', image: '.message img' },
    { name: 'search', type: 'search', search: 'search' },
  ]) {
    test(`Press Enter on a ${name} block adds new autofocused default block`, async ({
      page,
    }) => {
      await addBlockFromSlashMenu(page, type, search);
      const block = page.locator(`.block-editor-${type}`);
      if (image) await expectLoadedImage(block.locator(image));
      await block.click(type === 'image' ? { position: { x: 1, y: 1 } } : {});
      await block.press('Enter');
      if (type === 'video') {
        await expect(
          page.locator('.block-editor-slate + .block-editor-slate'),
        ).toBeVisible();
      }
      await expectNewFocusedTextBlock(page);
    });
  }
});
