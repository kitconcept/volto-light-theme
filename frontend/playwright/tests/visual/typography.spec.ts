import { expect, test } from '@playwright/test';

test('Typography', async ({ page }) => {
  await page.goto('/typography', { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot('typography.png', { fullPage: true });
});
