import { expect, test } from '@playwright/test';
import { login } from './login';

test('Controlpanel', async ({ page }) => {
  await login(page);

  await page.goto('http://localhost:3000/controlpanel', {
    waitUntil: 'networkidle',
  });
  await expect(page).toHaveScreenshot('controlpanel.png', { fullPage: true });
});
