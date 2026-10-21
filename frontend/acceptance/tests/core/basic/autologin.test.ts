import { expect, test } from '../../test';
import { login } from '../../login';

test.describe('Autologin Tests', () => {
  test('authenticates through the API in a standalone test', async ({
    page,
  }) => {
    await login(page);
    await page.goto('/');
    await page.locator('#toolbar-personal').click();
    await expect(page.locator('#toolbar-logout')).toBeVisible();
  });
});
