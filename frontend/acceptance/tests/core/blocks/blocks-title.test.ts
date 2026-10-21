import { expect, test } from '../../test';
import { openBlockEditor } from './editor';

test.describe('Title Block Tests', () => {
  test.beforeEach(async ({ page }) => {
    await openBlockEditor(page);
  });

  test('No border in input', async ({ page }) => {
    const title = page.locator('.block-editor-title [role=textbox]');
    await title.click();
    await expect(title).toBeFocused();
    await expect(title).toHaveCSS('outline-style', 'none');
    await expect(title).toHaveCSS('outline-color', 'rgb(0, 0, 0)');
  });
});
