import { fixturePath } from '../../fixtures';
import { expect, test } from '../../test';
import { createContent } from '../../content';
import { login } from '../../login';
import { selectInternalLink } from '../../object-browser';

test.describe('Add content through the editor', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/');
  });

  test('adds a file', async ({ page }) => {
    await page.locator('#toolbar-add').click();
    await page.locator('#toolbar-add-file').click();
    await page.locator('input[name="title"]').fill('My File');
    await expect(page.locator('input[name="title"]')).toHaveValue('My File');
    await page.locator('#field-file').setInputFiles(fixturePath('file.pdf'));

    await page.locator('#toolbar-save').click();

    await expect(page).toHaveURL(/\/file\.pdf$/);
    await expect(page.getByLabel('Edit')).toBeVisible();
    await expect(page.locator('.documentFirstHeading')).toHaveText('My File');
  });

  test('adds a page', async ({ page }) => {
    await page.locator('#toolbar-add').click();
    await page.locator('#toolbar-add-document').click();
    const title = page.locator('.block.title [contenteditable="true"]');
    await title.fill('My Page');

    await page.locator('#toolbar-save').click();

    await expect(page).toHaveURL(/\/my-page$/);
    await expect(page.locator('.navigation .item.active')).toHaveText(
      'My Page',
    );
  });

  test('adds a page with a text block', async ({ page }) => {
    await page.locator('#toolbar-add').click();
    await page.locator('#toolbar-add-document').click();
    await page.locator('.block.title [contenteditable="true"]').fill('My Page');
    await page
      .locator('.block.slate [contenteditable="true"]')
      .fill('This is the text.');

    await page.locator('#toolbar-save').click();

    await expect(page).toHaveURL(/\/my-page$/);
    await expect(page.locator('.navigation .item.active')).toHaveText(
      'My Page',
    );
    await expect(page.locator('main')).toContainText('This is the text.');
  });

  test('adds a page reference and warns before deleting the referenced page', async ({
    page,
  }) => {
    await page.locator('#toolbar-add').click();
    await page.locator('#toolbar-add-document').click();
    await page.locator('.block.title [contenteditable="true"]').fill('My Page');
    await page.locator('#toolbar-save').click();
    await expect(page).toHaveURL(/\/my-page$/);

    await page.goto('/');
    await page.locator('#toolbar-add').click();
    await page.locator('#toolbar-add-document').click();
    await page
      .locator('.block.title [contenteditable="true"]')
      .fill('My Second Page');
    await page.locator('#sidebar-metadata').evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });
    await selectInternalLink(
      page,
      page.locator('.field-wrapper-relatedItems'),
      'My Page',
      { doubleClick: false },
    );
    await page.locator('#toolbar-save').click();
    await expect(page).toHaveURL(/\/my-second-page$/);

    await page.goto('/contents');
    await page.getByLabel('/my-page').locator('td').nth(1).click();
    await page.locator('.top-menu-menu .delete').click();

    const confirmation = page.locator('.modal.active');
    await expect(
      confirmation.getByText('View links and references to this item'),
    ).toBeVisible();
    await confirmation.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByLabel('/my-page')).toHaveCount(0);
  });

  test('adds an image', async ({ page }) => {
    await page.locator('#toolbar-add').click();
    await page.locator('#toolbar-add-image').click();
    await page.locator('input[name="title"]').fill('My image');
    await page.locator('#field-image').setInputFiles(fixturePath('image.png'));
    await expect(page.locator('#field-image')).toHaveValue(/image\.png$/);
    await expect(page.locator('#field-image-image')).toHaveAttribute(
      'src',
      /^data:image\/png;base64,/,
    );

    await page.locator('#toolbar-save').click();

    await expect(page).toHaveURL(/\/image\.png$/);
    await expect(page.locator('.documentFirstHeading')).toHaveText('My image');
    const image = page.locator('.view-wrapper img');
    await expect(image).toBeVisible();
    await expect
      .poll(() =>
        image.evaluate((element: HTMLImageElement) => element.naturalWidth),
      )
      .toBeGreaterThan(0);
  });

  test('adds a news item', async ({ page }) => {
    await page.locator('#toolbar-add').click();
    await page.locator('#toolbar-add-news-item').click();
    await page.locator('input[name="title"]').fill('My News Item');

    await page.locator('#toolbar-save').click();

    await expect(page).toHaveURL(/\/my-news-item$/);
    await expect(page.locator('.navigation .item.active')).toHaveText(
      'My News Item',
    );
  });

  test('sets the event datetime widget time', async ({ page }) => {
    await page.locator('#toolbar-add').click();
    await page.locator('#toolbar-add-event').click();
    await page.locator('#field-title').fill('datetimeWidget test');
    await page.locator('#start-time').click();
    const timeInput = page.locator('.rc-time-picker-panel-input');
    await timeInput.click();
    await timeInput.fill('6:40 AM');
    await page.locator('#toolbar-save').click();

    await expect(page.locator('.documentFirstHeading').first()).toHaveText(
      'datetimeWidget test',
    );
  });

  test('adds a link to an external URL', async ({ page }) => {
    await page.locator('#toolbar-add').click();
    await page.locator('#toolbar-add-link').click();
    await page.locator('input[name="title"]').fill('My Link');
    await page.locator('input[name="remoteUrl"]').fill('https://google.com');

    await page.locator('#toolbar-save').click();

    await expect(page).toHaveURL(/\/my-link$/);
    await expect(page.locator('main')).toContainText('My Link');
    await expect(page.locator('main')).toContainText('https://google.com');
  });

  test('adds a link to an internal page', async ({ page }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'link-target',
      contentTitle: 'Link Target',
    });

    await page.locator('#toolbar-add').click();
    await page.locator('#toolbar-add-link').click();
    await page.locator('input[name="title"]').fill('My Link');
    await page.locator('input[name="remoteUrl"]').fill('/link-target');

    await page.locator('#toolbar-save').click();

    await expect(page).toHaveURL(/\/my-link$/);
    await expect(page.locator('main')).toContainText('My Link');
    await expect(page.locator('main')).toContainText('/link-target');
    await page.locator('main a[href="/link-target"]').click();
    await expect(page).toHaveURL(/\/link-target$/);
    await expect(page.locator('main')).toContainText('Link Target');
  });
});
