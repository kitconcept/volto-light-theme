import { expect, test } from '../../test';
import { login } from '../../login';
import { createContent } from '../../content';
import { addBlockFromChooser, save } from '../../blocks';

test.describe('Object Browser', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    for (const [contentType, contentId, contentTitle, path] of [
      ['Document', 'my-page', 'My Page', ''],
      ['Document', 'my-page-1', 'My Second Page', ''],
      ['Image', 'my-image', 'My Image', '/my-page-1'],
      ['Image', 'my-searchable-image', 'My Searchable Image', ''],
      ['Document', 'my-searchable-page', 'My Searchable Page', ''],
    ]) {
      await createContent(page, { contentType, contentId, contentTitle, path });
    }
    await page.goto('/my-page');
    await page.getByLabel('Edit', { exact: true }).click();
    await expect(page).toHaveURL('/my-page/edit');
    await addBlockFromChooser(page, 'Image');
    await page
      .locator('.toolbar-inner button.ui.basic.icon.button')
      .first()
      .click();
    await page.getByLabel('Search SVG', { exact: true }).click();
  });

  for (const fullURL of [false, true]) {
    test(`As editor I can add the ${fullURL ? 'full' : 'relative'} url in search box in sidebar`, async ({
      page,
    }) => {
      const apiPath = fullURL
        ? await page.evaluate(() => {
            if (
              !('env' in window) ||
              typeof window.env !== 'object' ||
              window.env === null ||
              !('apiPath' in window.env) ||
              typeof window.env.apiPath !== 'string'
            ) {
              throw new Error('The frontend did not expose env.apiPath');
            }
            return window.env.apiPath;
          })
        : '';
      await page.locator('.ui.input.search input').fill(`${apiPath}/my-page-1`);
      await page.getByLabel('Select My Image', { exact: true }).dblclick();
      await save(page);
      await expect(page.locator('.block img')).toHaveAttribute(
        'src',
        /\/my-page-1\/my-image\/@@images\/image/,
      );
    });
  }

  test('As editor I get focus on search box in sidebar when clicking on lens icon', async ({
    page,
  }) => {
    await expect(page.locator('.ui.input.search input')).toBeFocused();
  });

  test('As editor I can search and only get a list of images but not other content types', async ({
    page,
  }) => {
    const results = page.waitForResponse(
      (response) =>
        response.request().method() === 'GET' &&
        response.url().includes('@search') &&
        decodeURIComponent(response.url()).includes('Searchable'),
    );
    await page.locator('.ui.input.search input').fill('Searchable');
    expect((await results).ok()).toBeTruthy();
    await expect(
      page.getByLabel('Select My Searchable Image', { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByLabel('Browse My Searchable Page', { exact: true }),
    ).toHaveCount(0);
    await expect(
      page.locator('.ui.segment.object-listing .image-wrapper'),
    ).toHaveCount(1);
    await page
      .getByLabel('Select My Searchable Image', { exact: true })
      .dblclick();
    await save(page);
    await expect(page.locator('.block img')).toHaveAttribute(
      'src',
      /\/my-searchable-image\/@@images\/image/,
    );
  });
});
