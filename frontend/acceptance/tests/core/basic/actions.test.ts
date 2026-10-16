import { expect, test } from '../../test';
import { createContent } from '../../content';
import {
  contentAction,
  contentRow,
  deleteSelectedContent,
  renameSelectedContent,
  selectContent,
} from '../../contents';
import { login } from '../../login';

test.describe('Actions', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await createContent(page, {
      contentType: 'Document',
      contentId: 'my-page-1',
      contentTitle: 'My Page-1',
      allow_discussion: true,
    });
    await page.goto('/contents');
  });

  test('copy', async ({ page }) => {
    await contentAction(page, '/my-page-1', 'Copy');
    await page.getByRole('button', { name: 'Paste', exact: true }).click();
    await expect(contentRow(page, '/copy_of_my-page-1')).toBeVisible();
    await page.reload();
    await expect(
      contentRow(page, '/copy_of_my-page-1').getByRole('link'),
    ).toHaveAttribute('href', '/copy_of_my-page-1/contents');
  });

  test('delete', async ({ page }) => {
    await selectContent(page, '/my-page-1');
    await deleteSelectedContent(page);
    await expect(contentRow(page, '/my-page-1')).toHaveCount(0);
    await page.reload();
    await expect(contentRow(page, '/my-page-1')).toHaveCount(0);
  });

  test('cut', async ({ page }) => {
    await contentAction(page, '/my-page-1', 'Cut');
    const moved = page.waitForResponse(
      (response) =>
        response.request().method() === 'POST' &&
        new URL(response.url()).pathname.endsWith('/@move'),
    );
    await page.getByRole('button', { name: 'Paste', exact: true }).click();
    expect((await moved).ok()).toBeTruthy();
    await page.reload();
    await expect(
      contentRow(page, '/my-page-1').getByRole('link'),
    ).toHaveAttribute('href', '/my-page-1/contents');
    await expect(contentRow(page, '/copy_of_my-page-1')).toHaveCount(0);
  });

  test('rename', async ({ page }) => {
    await selectContent(page, '/my-page-1');
    await renameSelectedContent(page, 'my-page-rename', 'my-page-rename');
    await expect(
      contentRow(page, '/my-page-rename').getByRole('link', {
        name: 'my-page-rename',
      }),
    ).toHaveAttribute('href', '/my-page-rename/contents');
    await expect(contentRow(page, '/my-page-1')).toHaveCount(0);
  });
});
