import { expect, test } from '../../test';
import { login } from '../../login';
import { createContent } from '../../content';
import { addBlockFromSlashMenu, save } from '../../blocks';
import { configurePageListing, createListingPages } from '../listing';

test.describe('Grid Acceptance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await createContent(page, {
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Document',
    });
    await createContent(page, {
      contentType: 'Image',
      contentId: 'my-image',
      contentTitle: 'My Image',
      path: '/document',
    });
    await page.goto('/');
    await page.goto('/document');
    await page.getByLabel('Edit', { exact: true }).click();
    await expect(page).toHaveURL('/document/edit');
  });

  test('As editor I can add a image block in Grid', async ({ page }) => {
    await addBlockFromSlashMenu(page, 'gridBlock', 'grid');
    await page.getByText('2 columns', { exact: true }).click();
    for (const position of [0, 1]) {
      await page
        .getByRole('button', {
          name: `Add block in position ${position}`,
          exact: true,
        })
        .click();
      await page
        .locator('.blocks-chooser .mostUsed')
        .getByRole('button', { name: 'Image', exact: true })
        .click();
      await page
        .locator('.block.image .toolbar-inner .buttons')
        .first()
        .click();
      await page.getByLabel('Select My Image', { exact: true }).dblclick();
      await expect(page.getByText('my-image', { exact: true })).toBeVisible();
    }
    await save(page);
    const columns = page.locator('.two.column.grid > .column');
    await expect(columns).toHaveCount(2);
    await expect(columns.nth(0)).toContainText('My Image');
    await expect(columns.nth(1)).toContainText('My Image');
  });

  test('As editor I can add a listing in Grid block', async ({ page }) => {
    await createListingPages(page);
    await addBlockFromSlashMenu(page, 'gridBlock', 'grid');
    await page.getByText('2 columns', { exact: true }).click();
    for (const position of [0, 1]) {
      await page
        .getByRole('button', {
          name: `Add block in position ${position}`,
          exact: true,
        })
        .click();
      await page
        .locator('.blocks-chooser .mostUsed')
        .getByRole('button', { name: 'Listing', exact: true })
        .click();
      await configurePageListing(page);
    }
    await save(page);
    const columns = page.locator('.two.column.grid > .column');
    await expect(columns).toHaveCount(2);
    await expect(columns.nth(0)).toContainText('My Page');
    await expect(columns.nth(1)).toContainText('My Page 1');
  });
});
