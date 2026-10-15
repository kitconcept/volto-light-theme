import type { Page } from '@playwright/test';
import { expect } from '../../test';

export async function loginThroughForm(page: Page) {
  await page.goto('/login');
  await page.locator('#login').fill('admin');
  await expect(page.locator('#login')).toHaveValue('admin');
  await page.locator('#password').fill('secret');
  await expect(page.locator('#password')).toHaveValue('secret');
  await page.locator('#login-form-submit').click();
  await expect(page.locator('body')).toHaveClass(/has-toolbar/);
  await expect(page.locator('#toolbar-personal')).toBeVisible();
}

export async function logoutThroughToolbar(page: Page) {
  await expect
    .poll(async () =>
      (await page.context().cookies()).some(
        (cookie) => cookie.name === 'auth_token',
      ),
    )
    .toBe(true);
  await page.getByLabel('Personal tools', { exact: true }).click();
  await page.locator('#toolbar-logout').click();
  await expect
    .poll(async () =>
      (await page.context().cookies()).some(
        (cookie) => cookie.name === 'auth_token',
      ),
    )
    .toBe(false);
  await expect(page.locator('body')).not.toHaveClass(/has-toolbar/);
  await expect(page.locator('#toolbar-personal')).toHaveCount(0);
}
