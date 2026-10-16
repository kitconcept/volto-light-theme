import { expect, test } from '../../test';
import { createContent } from '../../content';
import { login } from '../../login';

test.describe('Create content through the REST API', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('creates a document', async ({ page }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });

    await page.goto('/my-page');
    await expect(page.locator('.documentFirstHeading')).toHaveText('My Page');
    await expect(page).toHaveURL(/\/my-page$/);
  });

  test('creates a document with a child at a path', async ({ page }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'container',
      contentTitle: 'My Container',
    });
    await createContent(page, {
      contentType: 'Document',
      contentId: 'child',
      contentTitle: 'My Child',
      path: '/container',
    });

    await page.goto('/container/child');
    await expect(page.locator('.documentFirstHeading')).toHaveText('My Child');
  });

  test('creates a document with a custom id', async ({ page }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'my-custom-id',
      contentTitle: 'My Page',
    });

    await page.goto('/my-custom-id');
    await expect(page.locator('.documentFirstHeading')).toHaveText('My Page');
  });

  test('creates a news item', async ({ page }) => {
    await createContent(page, {
      contentType: 'News Item',
      contentId: 'my-news-item',
      contentTitle: 'My News Item',
    });

    await page.goto('/my-news-item');
    await expect(page.locator('.documentFirstHeading')).toHaveText(
      'My News Item',
    );
  });

  test('creates a file', async ({ page }) => {
    await createContent(page, {
      contentType: 'File',
      contentId: 'my-file',
      contentTitle: 'My File',
    });

    await page.goto('/my-file');
    await expect(page.locator('.documentFirstHeading')).toHaveText('My File');
    await expect(page.locator('.view-wrapper a')).toHaveAttribute(
      'href',
      '/my-file/@@download/file',
    );
  });

  test('creates an image', async ({ page }) => {
    await createContent(page, {
      contentType: 'Image',
      contentId: 'my-image',
      contentTitle: 'My Image',
    });

    await page.goto('/my-image');
    await expect(page.locator('.documentFirstHeading')).toHaveText('My Image');
    await expect(page.locator('.view-wrapper img')).toHaveAttribute(
      'src',
      /\/my-image\/@@images\//,
    );
    await expect(page.locator('.view-wrapper img')).toHaveAttribute('alt', '');
  });
});
