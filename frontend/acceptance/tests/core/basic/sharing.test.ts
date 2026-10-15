import type { Page } from '@playwright/test';
import { expect, test } from '../../test';
import { login } from '../../login';
import { createPageThroughEditor } from './page';

async function openSharing(page: Page) {
  await page.getByRole('button', { name: /more/i }).click();
  await expect(page.locator('.menu-more')).toContainText('Sharing');
  const loaded = page.waitForResponse(
    (response) =>
      response.request().method() === 'GET' &&
      new URL(response.url()).pathname.endsWith('/@sharing'),
  );
  await page.getByRole('link', { name: 'Sharing', exact: true }).click();
  expect((await loaded).ok()).toBeTruthy();
  await expect(page).toHaveURL('/my-page/sharing');
}

async function saveSharing(page: Page) {
  const saved = page.waitForResponse(
    (response) =>
      response.request().method() === 'POST' &&
      new URL(response.url()).pathname.endsWith('/@sharing'),
  );
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  expect((await saved).ok()).toBeTruthy();
}

test.describe('Sharing', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/');
    await createPageThroughEditor(page);
  });

  test('As editor I can add a page and access sharing', async ({ page }) => {
    await openSharing(page);
    await expect(page.getByText('Sharing for', { exact: false })).toBeVisible();
  });

  test('As editor, I can share a page to another user', async ({ page }) => {
    await openSharing(page);
    const search = page.getByPlaceholder(/search for user or group/i);
    await search.fill('test');
    await search.press('Enter');
    const user = page.getByRole('row').filter({
      has: page.getByRole('cell', {
        name: 'test_user_1_ (test-user)',
        exact: true,
      }),
    });
    // Sharing's role checkboxes use a visual wrapper over a hidden input.
    await user.locator('.checkbox').nth(2).click();
    await expect(user.getByRole('checkbox').nth(2)).toBeChecked();
    await saveSharing(page);

    const loggedOut = page.waitForResponse((response) =>
      new URL(response.url()).pathname.endsWith('/@logout'),
    );
    await page.goto('/logout');
    expect((await loggedOut).ok()).toBeTruthy();
    await expect
      .poll(async () =>
        (await page.context().cookies()).some(
          (cookie) => cookie.name === 'auth_token',
        ),
      )
      .toBe(false);
    await login(page, {
      username: 'test-user',
      password: 'correct horse battery staple',
    });
    await page.goto('/my-page');
    await expect(page.getByRole('heading', { name: 'My Page' })).toBeVisible();
  });

  test('As editor, I can uncheck the inherit permissions checkbox', async ({
    page,
  }) => {
    await openSharing(page);
    const inherit = page.getByLabel('Inherit permissions from higher levels');
    await inherit.uncheck({ force: true });
    await expect(inherit).not.toBeChecked();
    await saveSharing(page);
    await page.goto('/my-page/sharing');
    await expect(inherit).not.toBeChecked();
  });
});
