import { expect, test } from '@playwright/test';

test('Homepage', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot('homepage.png', { fullPage: true });
});
