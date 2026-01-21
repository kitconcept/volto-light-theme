import { expect, test } from '@playwright/test';

test('Homepage', async ({ page }, testInfo) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  const html = await page.content();
  // const htmlPath = testInfo.outputPath('page.html');
  console.log(html);
  await expect(page).toHaveScreenshot('homepage2.png', { fullPage: true });
});
