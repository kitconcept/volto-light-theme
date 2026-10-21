import { expect, test } from '../../test';
import { login } from '../../login';

test('Set Setting in registry', async ({ page }) => {
  await login(page);
  const apiURL =
    process.env.API_PATH ||
    `http://${process.env.BACKEND_HOST || '127.0.0.1'}:55001/${process.env.SITE_ID || 'plone'}`;
  const response = await page.request.patch(`${apiURL}/@registry`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${Buffer.from('admin:secret').toString('base64')}`,
    },
    data: { 'plone.site_title': 'test-title' },
  });
  expect(response.ok()).toBeTruthy();
  await page.goto('/controlpanel/site');
  await expect(page.locator('input#field-site_title')).toHaveValue(
    'test-title',
  );
});
