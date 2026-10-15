import { expect, test } from '../../test';
import { login } from '../../login';
import { createContent } from '../../content';

test('adds a new alias', async ({ page }) => {
  await login(page);
  await createContent(page, {
    contentType: 'Document',
    contentId: 'my-page',
    contentTitle: 'My Page',
  });
  await page.goto('/my-page');
  await expect(
    page.getByRole('heading', { name: 'My Page', exact: true }),
  ).toBeVisible();
  await page.goto('/my-page/aliases');
  await page.locator('#alternative-url-input').fill('/alturl');
  const added = page.waitForResponse(
    (response) =>
      response.request().method() === 'POST' &&
      new URL(response.url()).pathname.endsWith('/@aliases'),
  );
  await page.locator('#submit-alias').click();
  expect((await added).ok()).toBeTruthy();
  await expect(page.locator('.Toastify').getByRole('alert')).toContainText(
    'Alias has been added',
  );
  await page.goto('/alturl');
  await expect(page).toHaveURL('/my-page');
  await expect(
    page.getByRole('heading', { name: 'My Page', exact: true }),
  ).toBeVisible();
});
