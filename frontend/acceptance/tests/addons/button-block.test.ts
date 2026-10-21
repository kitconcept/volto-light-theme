import { addBlockFromChooser, save } from '../blocks';
import { createContent } from '../content';
import { login } from '../login';
import { expect, test } from '../test';

test.describe('Button Block Acceptance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Document',
    });
    await login(page);
  });

  test('As editor I can add a Button block', async ({ page }) => {
    await page.goto('/document/edit');
    await addBlockFromChooser(page, 'Button');
    await save(page);
    await page.reload();
    await expect(
      page
        .locator('#page-document')
        .getByRole('button', { name: 'Button text' }),
    ).toBeVisible();
  });
});
