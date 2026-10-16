import { expect, test } from '../../test';
import { createContent } from '../../content';
import { login } from '../../login';

test.describe('Delete content', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await createContent(page, {
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
      allow_discussion: true,
    });
    await page.goto('/contents');
  });

  test('deletes a selected item', async ({ page }) => {
    const row = page.getByLabel('/my-page');
    await row.getByRole('button', { name: 'Checked' }).click();
    await page.getByRole('button', { name: 'Delete', exact: true }).click();
    await page
      .locator('.modal.active')
      .getByRole('button', { name: 'Delete' })
      .click();

    await expect(page.getByLabel('/my-page')).toHaveCount(0);
  });
});
