import { expect, test } from '@playwright/test';

test('homepage renders consistently', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot('homepage.png', { fullPage: true });
});
