import { expect, test } from '../../test';
import { login } from '../../login';
import { createPageThroughEditor } from './page';

test('As editor I can add a page and access history', async ({ page }) => {
  await login(page);
  await page.goto('/');
  await createPageThroughEditor(page);
  await page.locator('#toolbar-more').click();
  await expect(page.locator('.menu-more')).toContainText('History');
  await page.locator('.menu-more a[href*="/historyview"]').click();
  await expect(page).toHaveURL('/my-page/historyview');
  await expect(
    page.getByText('History of My Page', { exact: true }),
  ).toBeVisible();
});
