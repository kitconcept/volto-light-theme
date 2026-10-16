import type { Page } from '@playwright/test';
import { expect, test } from '../../test';
import { login } from '../../login';
import { createContent } from '../../content';
import { save } from '../../blocks';

async function lockAsFirstEditor(page: Page) {
  await login(page, { username: 'editor1', password: 'password' });
  await page.goto('/document');
  const locked = page.waitForResponse(
    (response) =>
      response.request().method() === 'POST' &&
      new URL(response.url()).pathname.endsWith('/@lock'),
  );
  await page.getByLabel('Edit', { exact: true }).click();
  await expect(page).toHaveURL('/document/edit');
  expect((await locked).ok()).toBeTruthy();
  await expect(page.locator('.block.title [contenteditable=true]')).toHaveText(
    'Test document',
  );
  const loggedOut = page.waitForResponse((response) =>
    new URL(response.url()).pathname.endsWith('/@logout'),
  );
  await page.goto('/logout');
  expect((await loggedOut).ok()).toBeTruthy();
  await expect(page.locator('.toast-inner-content')).toContainText(
    'You have been logged out',
  );
  await page.locator('.toast-dismiss-action').click();
  await login(page, { username: 'editor2', password: 'password' });
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: 'Personal tools', exact: true }),
  ).toBeVisible();
  await page
    .locator('#navigation li .item')
    .filter({ hasText: /^Test document$/ })
    .click();
  await page
    .locator('#navigation')
    .getByRole('link', { name: 'Test document', exact: true })
    .click();
  await expect(page).toHaveURL('/document');
}

test.describe('Document locking', () => {
  test.beforeEach(async ({ page }) => {
    const apiURL =
      process.env.API_PATH ||
      `http://${process.env.BACKEND_HOST || '127.0.0.1'}:55001/${process.env.SITE_ID || 'plone'}`;
    for (const number of [1, 2]) {
      const created = await page.request.post(`${apiURL}/@users`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Basic ${Buffer.from('admin:secret').toString('base64')}`,
        },
        data: {
          username: `editor${number}`,
          fullname: `Editor ${number}`,
          password: 'password',
          email: `editor${number}@example.com`,
          roles: ['Member', 'Reader', 'Editor'],
        },
      });
      expect(created.ok()).toBeTruthy();
    }
    await createContent(page, {
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Test document',
      transition: 'publish',
    });
    await page.goto('/');
    await lockAsFirstEditor(page);
  });

  test('As editor, a page is locked for other users when I edit that page', async ({
    page,
  }) => {
    await expect(page.locator('.Toastify').getByRole('alert')).toContainText(
      'This item was locked by Editor 1 on',
    );
  });

  test('As editor, I can see when a page is currently edited by another user', async ({
    page,
  }) => {
    await expect(page.locator('.Toastify .toast-inner-content')).toContainText(
      'This item was locked by Editor 1 on',
    );
    await expect(page.getByLabel('Unlock', { exact: true })).toBeVisible();
  });

  test('As editor, I can unlock a locked page', async ({ page }) => {
    await expect(page.locator('.toolbar-body')).toBeVisible();
    const unlocked = page.waitForResponse(
      (response) =>
        response.request().method() === 'DELETE' &&
        new URL(response.url()).pathname.endsWith('/@lock'),
    );
    await page.getByLabel('Unlock', { exact: true }).click();
    expect((await unlocked).ok()).toBeTruthy();
    await expect(page).toHaveURL('/document');
    await page.getByLabel('Edit', { exact: true }).click();
    await page
      .locator('.block.title [contenteditable=true]')
      .fill('New title by Editor 2');
    await save(page);
    await expect(page.locator('h1.documentFirstHeading')).toHaveText(
      'New title by Editor 2',
    );
  });
});
