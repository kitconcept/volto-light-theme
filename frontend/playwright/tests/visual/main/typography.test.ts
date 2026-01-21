import { expect, test } from './base-fixture';

test('Typography', async ({ page }) => {
  await page.goto('/typography', { waitUntil: 'networkidle' });
  await page.hideStickyMenu();
  await expect(page).toHaveScreenshot('typography.png', { fullPage: true });
});
