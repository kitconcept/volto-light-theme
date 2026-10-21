import { expect, test } from '../../test';
import { save } from '../../blocks';
import { createContent } from '../../content';
import { login } from '../../login';

test('Undo/Redo form', async ({ page }) => {
  await login(page);
  await createContent(page, {
    contentType: 'Document',
    contentId: 'my-page',
    contentTitle: 'My Page',
  });
  await page.goto('/my-page');
  await page.getByLabel('Edit', { exact: true }).click();
  await expect(page).toHaveURL('/my-page/edit');
  const editor = page.locator('.block.slate [contenteditable="true"]');
  await editor.click();
  await editor.pressSequentially('My text');
  await expect(editor).toHaveText('My text');

  const undo = page.locator('.toolbar-bottom').getByLabel('Undo', {
    exact: true,
  });
  const redo = page.locator('.toolbar-bottom').getByLabel('Redo', {
    exact: true,
  });
  await undo.click();
  await expect(editor).toHaveText('My tex');
  await expect(editor).not.toHaveText('My text');
  await undo.click();
  await expect(editor).toHaveText('My te');
  await expect(editor).not.toHaveText('My tex');
  await redo.click();
  await expect(editor).toHaveText('My tex');
  await expect(editor).not.toHaveText('My text');
  await redo.click();
  await expect(editor).toHaveText('My text');

  await save(page);
  await expect(page.locator('#page-document p')).toContainText('My text');
});
