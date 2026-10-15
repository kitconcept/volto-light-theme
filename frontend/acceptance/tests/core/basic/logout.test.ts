import { expect, test } from '../../test';
import { loginThroughForm, logoutThroughToolbar } from './auth';

test.describe('Logout Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginThroughForm(page);
  });

  test('as a registered user I can log out', async ({ page }) => {
    await logoutThroughToolbar(page);
    await page.reload();
    await expect(page.locator('body')).not.toHaveClass(/has-toolbar/);
    await expect(page.locator('#toolbar-personal')).toHaveCount(0);
  });
});
