import { login } from './login';
import { expect, test } from './test';
import { createContent } from './content';

test.describe('Content', () => {
  test('a published Document created via the API is viewable', async ({
    page,
  }) => {
    await login(page);

    const contentId = `acceptance-document-${Date.now()}`;
    await createContent(page, {
      contentType: 'Document',
      contentId,
      contentTitle: 'Acceptance Document',
      path: '',
      transition: 'publish',
    });

    const response = await page.goto(`/${contentId}`, {
      waitUntil: 'networkidle',
    });

    expect(response?.ok()).toBeTruthy();
    await expect(
      page.getByRole('heading', { name: 'Acceptance Document' }),
    ).toBeVisible();
  });
});
