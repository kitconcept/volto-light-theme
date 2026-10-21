import { fixturePath } from '../../fixtures';
import { expect, test } from '../../test';
import { login } from '../../login';

test('As editor I am able to see the preview of uploading image', async ({
  page,
}) => {
  await login(page);
  await page.goto('/');
  await page.locator('#toolbar-add').click();
  await page.locator('#toolbar-add-news-item').click();
  await page
    .locator('input#field-image')
    .setInputFiles(fixturePath('image.png'));
  const preview = page.locator('#field-image-image');
  await expect(preview).toHaveAttribute('src', /.+/);
  await expect(preview).toBeVisible();
  await expect
    .poll(() =>
      preview.evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBeGreaterThan(0);
});
