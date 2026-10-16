import { expect, test } from '../../test';
import { openBlockEditor } from './editor';

test('No border in input', async ({ page }) => {
  await openBlockEditor(page);
  const editor = page.locator('.block-editor-slate [role=textbox]');
  await editor.click();
  await expect(editor).toHaveCSS('outline-style', 'none');
  await expect(editor).toHaveCSS('outline-color', 'rgb(0, 0, 0)');
});
