import { expect, test } from '../../test';
import { addBlockFromChooser } from '../../blocks';
import { login } from '../../login';

test.describe('Metadata', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/');
    await page.locator('#toolbar-add').click();
    await page.locator('#toolbar-add-document').click();
  });

  test('As an editor I can set the effective date of a page', async ({
    page,
  }) => {
    const title = page.locator('.block.title [contenteditable="true"]');
    await title.fill('My Page');
    await expect(title).toHaveText('My Page');
    await page.locator('#effective-date').fill('12/24/2050');
    await page.locator('#effective-date').press('Escape');
    await page.locator('#effective-time').press('ArrowDown');
    await page.locator('.rc-time-picker-panel-input').fill('10:00 AM');
    await page.locator('.rc-time-picker-panel-input').press('Escape');
    await page.locator('#toolbar-save').click();
    await expect(
      page.locator('body.view-viewview #page-document .documentFirstHeading'),
    ).toHaveText('My Page');
    await expect(page).toHaveURL('/my-page');

    await page.getByLabel('Edit', { exact: true }).click();
    await expect(page.locator('#effective-date')).toHaveValue('12/24/2050');
    await expect(page.locator('#effective-time')).toHaveValue('10:00 AM');
  });

  test('As an editor, given a document with no title or a validation error when I save the sidebar tab switches to the metadata tab', async ({
    page,
  }) => {
    await addBlockFromChooser(page, 'Image');
    await page.locator('#toolbar-save').click();
    await expect(page.locator('.Toastify').getByRole('alert')).toContainText(
      'Required input is missing',
    );
    await expect(
      page.locator('.sidebar-container .tabs-wrapper .active.item'),
    ).toContainText('Page');
  });

  test('After removing value of widget the focus should be removed from the field', async ({
    page,
  }) => {
    const creators = page.locator('#field-creators input');
    await creators.pressSequentially('aaaaaa');
    await creators.press('Enter');
    await page.locator('.react-select__multi-value__remove').click();
    const text = 'Test if all the text will be in this slate block';
    const editor = page.locator('.block.slate [contenteditable="true"]');
    await editor.click();
    await editor.pressSequentially(text);
    await expect(editor).toHaveText(text);
  });
});
