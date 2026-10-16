import { expect, test } from '../../test';
import { createContent } from '../../content';
import { contentRow, selectContent } from '../../contents';
import { login } from '../../login';

test('change workflow state recursively', async ({ page }) => {
  await login(page);
  await createContent(page, {
    contentType: 'Document',
    contentId: 'my-page',
    contentTitle: 'My Page',
    allow_discussion: true,
  });
  await page.goto('/contents');
  await selectContent(page, '/my-page');
  await page.getByRole('button', { name: 'State', exact: true }).click();
  const modal = page.locator('.modal.active');
  const state = modal.getByRole('textbox', { name: 'Change State' });
  await state.fill('Publish');
  await state.press('Enter');
  await modal.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(modal).toBeHidden();
  await expect(contentRow(page, '/my-page')).toContainText('Published');
});
