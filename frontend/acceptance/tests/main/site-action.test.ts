import { expect, test } from '../test';
import { login } from '../login';

test.use({ viewport: { width: 1536, height: 960 } });

test('As a editor I should see Site action title in header', async ({
  page,
}) => {
  const { token } = await login(page);
  const apiURL =
    process.env.API_PATH ||
    `http://${process.env.BACKEND_HOST || '127.0.0.1'}:55001/${process.env.SITE_ID || 'plone'}`;
  const response = await page.request.patch(`${apiURL}/`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    data: {
      header_actions: [
        {
          title: 'Github',
          href: [{ '@id': 'https://github.com/kitconcept/volto-light-theme' }],
          openLinkInNewTab: true,
        },
        { title: 'Sitemap', href: [{ '@id': '/sitemap' }] },
      ],
    },
  });
  expect(response.ok()).toBeTruthy();
  await page.goto('/');
  await page.goto('/');
  await expect(
    page.locator('.tools').getByText('Github', { exact: true }),
  ).toBeVisible();
  await expect(
    page.locator('.tools').getByText('Sitemap', { exact: true }),
  ).toBeVisible();
});
