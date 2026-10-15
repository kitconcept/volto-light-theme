import { expect, test } from '../test';
import { login } from '../login';
import { createContent } from '../content';
import { save } from '../blocks';

test.describe('Basic Acceptance Tests - Text Block Tests', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await createContent(page, {
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Document',
    });
    await page.goto('/');
  });

  test('As editor I can add a page with a text block', async ({ page }) => {
    await page.locator('#toolbar-add').click();
    await page.locator('#toolbar-add-document').click();
    const title = page.locator('.block.title [contenteditable=true]');
    await title.fill('My Page');
    await expect(title).toHaveText('My Page');
    const editor = page.locator('.block.slate [contenteditable=true]');
    await editor.fill('This is the text');
    await expect(editor).toHaveText('This is the text');
    await page.locator('#toolbar-save').click();
    await expect(page).toHaveURL('/my-page');
    await expect(page.locator('main')).toContainText('This is the text');
  });

  test('As editor I can add a link to a text block', async ({ page }) => {
    await page.clock.install();
    await page.goto('/document/edit');
    await expect(
      page.locator('.block.title .documentFirstHeading'),
    ).toBeVisible();
    const editor = page.locator('.block.slate [contenteditable=true]');
    await editor.click();
    await editor.pressSequentially('Colorless green ideas sleep furiously.');
    // Slate ignores selectionchange events while it is syncing its own DOM
    // selection after typing, so reapply the same selection until Slate's
    // selection decoration acknowledges it.
    await expect(async () => {
      await editor.evaluate((element) => {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();
        while (node) {
          const start = node.textContent?.indexOf('furiously') ?? -1;
          if (start !== -1) {
            const selection = window.getSelection();
            if (!selection) throw new Error('Browser selection is unavailable');
            selection.setBaseAndExtent(
              node,
              start,
              node,
              start + 'furiously'.length,
            );
            return;
          }
          node = walker.nextNode();
        }
        throw new Error('Cannot select furiously in the Slate editor');
      });
      await expect
        .poll(() => page.evaluate(() => window.getSelection()?.toString()))
        .toBe('furiously');
      await expect(editor.locator('.highlight-selection')).toHaveText(
        'furiously',
        { timeout: 1000 },
      );
    }).toPass();
    // Slate persists the selection in a 200ms onSelect debounce.
    await page.clock.runFor(200);
    await page
      .locator('.slate-inline-toolbar')
      .getByTitle('Add link', { exact: true })
      .click();
    const linkInput = page.locator('.slate-toolbar .link-form-container input');
    await expect(linkInput).toBeFocused();
    await linkInput.pressSequentially('https://google.com');
    await linkInput.press('Enter');
    await expect(editor.locator('a')).toHaveText('furiously');
    await expect(editor.locator('a')).toHaveAttribute(
      'href',
      /https:\/\/google\.com/,
    );
    await save(page);
    const paragraph = page.locator('.container .blocks-group-wrapper p');
    await expect(paragraph).toHaveText(
      'Colorless green ideas sleep furiously.',
    );
    await expect(paragraph.locator('a')).toHaveText('furiously');
    await expect(paragraph.locator('a')).toHaveAttribute(
      'href',
      /https:\/\/google\.com/,
    );
  });
});
