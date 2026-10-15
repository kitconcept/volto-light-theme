import type { Page } from '@playwright/test';
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

const documentPath = '/my-folder/my-document';
const reorderedPath = '/my-folder/last-and-first-page';

async function moveItem(page: Page, position: 'top' | 'bottom') {
  const reordered = page.waitForResponse(
    (response) =>
      response.request().method() === 'PATCH' &&
      new URL(response.url()).pathname.endsWith('/my-folder'),
  );
  await contentAction(page, reorderedPath, `Move to ${position} of folder`);
  expect((await reordered).ok()).toBeTruthy();
}

async function secondPage(page: Page) {
  await page
    .locator('.contents-pagination')
    .getByText('2', { exact: true })
    .click();
  await expect(contentRow(page, reorderedPath)).toBeVisible();
}

test.describe('Folder contents', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await createContent(page, {
      contentType: 'Document',
      contentId: 'my-folder',
      contentTitle: 'My Folder',
    });
    await createContent(page, {
      contentType: 'Document',
      contentId: 'my-document',
      contentTitle: 'My Document',
      path: 'my-folder',
      bodyModifier: (body) => ({
        ...body,
        creation_date: '2020-01-01T12:00:00+00:00',
      }),
    });
    await page.goto('/my-folder/contents');
    await expect(contentRow(page, documentPath)).toBeVisible();
  });

  test('Renaming via folder contents view', async ({ page }) => {
    await selectContent(page, documentPath);
    await renameSelectedContent(
      page,
      'Brand new document title',
      'brand-new-document-title',
    );
    await expect(
      contentRow(page, '/my-folder/brand-new-document-title').getByRole(
        'link',
        {
          name: 'Brand new document title',
        },
      ),
    ).toHaveAttribute('href', '/my-folder/brand-new-document-title/contents');
    await expect(contentRow(page, documentPath)).toHaveCount(0);
  });

  test('Copying the content in the same folder', async ({ page }) => {
    await selectContent(page, documentPath);
    await page.getByRole('button', { name: 'Copy', exact: true }).click();
    await page.getByRole('button', { name: 'Paste', exact: true }).click();
    await expect(
      contentRow(page, '/my-folder/copy_of_my-document'),
    ).toBeVisible();
    await expect(page.locator('#content-core tbody tr')).toHaveCount(2);
    await expect(contentRow(page, documentPath)).toBeVisible();
  });

  test('Cutting the item and pasting into another item', async ({ page }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'child',
      contentTitle: 'My Child',
      path: 'my-folder',
    });
    await page.reload();
    await selectContent(page, '/my-folder/child');
    await page.getByRole('button', { name: 'Cut', exact: true }).click();
    await contentRow(page, documentPath).getByRole('link').click();
    await expect(page).toHaveURL(/\/my-folder\/my-document\/contents$/);
    await page.getByRole('button', { name: 'Paste', exact: true }).click();
    await expect(
      contentRow(page, `${documentPath}/child`).getByRole('link', {
        name: 'My Child',
      }),
    ).toHaveAttribute('href', `${documentPath}/child/contents`);
    await page.goto('/my-folder/contents');
    await expect(contentRow(page, '/my-folder/child')).toHaveCount(0);
    await expect(page.locator('#content-core tbody tr')).toHaveCount(1);
  });

  test('Deleting an item from a folder', async ({ page }) => {
    await selectContent(page, documentPath);
    await deleteSelectedContent(page);
    await expect(page.locator('#content-core tbody tr')).toHaveCount(0);
  });

  test('Changing Content State recursively', async ({ page }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'child',
      contentTitle: 'My Child',
      path: 'my-folder/my-document',
    });
    await selectContent(page, documentPath);
    await page.getByRole('button', { name: 'State', exact: true }).click();
    const modal = page.locator('.modal.active');
    await modal.getByRole('textbox', { name: 'Change State' }).fill('Publish');
    await modal.getByRole('textbox', { name: 'Change State' }).press('Enter');
    await modal
      .getByText('Change workflow state recursively', { exact: true })
      .click();
    await modal.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(modal).toBeHidden();
    await expect(contentRow(page, documentPath)).toContainText('Published');
    await page.goto(`${documentPath}/contents`);
    await expect(contentRow(page, `${documentPath}/child`)).toContainText(
      'Published',
    );
  });

  test('Sort method by creation field', async ({ page }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'child',
      contentTitle: 'My Child',
      path: 'my-folder',
      bodyModifier: (body) => ({
        ...body,
        creation_date: '2021-01-01T12:00:00+00:00',
      }),
    });
    await page.reload();
    await expect(
      page.locator('#content-core tbody tr').first(),
    ).toHaveAttribute('aria-label', documentPath);
    await page.locator('.configuration-svg').click();
    const creationSort = page.locator('.sort_CreationDate');
    await creationSort.hover();
    await creationSort.getByText('Descending', { exact: true }).click();
    await expect(
      page.locator('#content-core tbody tr').first(),
    ).toHaveAttribute('aria-label', '/my-folder/child');
    await page.reload();
    await expect(
      page.locator('#content-core tbody tr').first(),
    ).toHaveAttribute('aria-label', '/my-folder/child');
  });

  test('Remember indexes', async ({ page }) => {
    await page.locator('.selectIndex').click();
    await page
      .locator('.selectIndex')
      .getByText('Creator', { exact: true })
      .click();
    await expect(
      page
        .locator('thead')
        .getByRole('button', { name: 'Creator', exact: true }),
    ).toBeVisible();
    await page
      .locator('.folder-contents .breadcrumb')
      .getByRole('link', { name: 'Home', exact: true })
      .click();
    await expect(page).toHaveURL(/\/contents$/);
    await expect(contentRow(page, '/my-folder')).toBeVisible();
    await expect(
      page
        .locator('thead')
        .getByRole('button', { name: 'Creator', exact: true }),
    ).toBeVisible();
  });

  test('Move items to top of folder and bottom of folder, including filtered search', async ({
    page,
  }) => {
    test.setTimeout(90_000);
    for (let index = 1; index <= 56; index += 1) {
      await createContent(page, {
        contentType: 'Document',
        contentId: `child-${String(index).padStart(2, '0')}`,
        contentTitle: 'My Child',
        path: 'my-folder',
      });
    }

    await page.goto('/my-folder');
    await page.locator('#toolbar-add').click();
    await page.locator('#toolbar-add-document').click();
    await page
      .locator('.block.title [contenteditable="true"]')
      .fill('last and first page');
    await page.locator('#toolbar-save').click();
    await expect(page).toHaveURL(/\/my-folder\/last-and-first-page$/);
    await page.goto('/my-folder/contents');
    await expect(page.locator('#content-core tbody tr')).toHaveCount(50);
    await expect(contentRow(page, reorderedPath)).toHaveCount(0);
    await secondPage(page);
    await expect(page.locator('#content-core tbody tr')).toHaveCount(8);

    await moveItem(page, 'top');
    await expect(page).toHaveURL(/\/my-folder\/contents$/);
    await expect(
      page.locator('#content-core tbody tr').first(),
    ).toHaveAttribute('aria-label', reorderedPath);
    await moveItem(page, 'bottom');
    await secondPage(page);
    await expect(page.locator('#content-core tbody tr').last()).toHaveAttribute(
      'aria-label',
      reorderedPath,
    );

    await page.goto('/my-folder/contents');
    await page.getByPlaceholder('Filter').fill('last');
    await expect(page.locator('#content-core tbody tr')).toHaveCount(1);
    await expect(contentRow(page, reorderedPath)).toBeVisible();
    await moveItem(page, 'top');
    await page.locator('.search.item button').click();
    await expect(page.getByPlaceholder('Filter')).toHaveValue('');
    await expect(page.locator('#content-core tbody tr')).toHaveCount(50);
    await expect(
      page.locator('#content-core tbody tr').first(),
    ).toHaveAttribute('aria-label', reorderedPath);
    await moveItem(page, 'bottom');
    await secondPage(page);
    await expect(page.locator('#content-core tbody tr').last()).toHaveAttribute(
      'aria-label',
      reorderedPath,
    );
  });
});
