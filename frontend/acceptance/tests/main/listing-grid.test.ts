import { expect, test } from '../test';
import { login } from '../login';
import { createContent } from '../content';
import { addBlockFromChooser, save } from '../blocks';
import { configurePageListing, createListingPages } from './listing';

test('As editor I can add a listing with Grid variation', async ({ page }) => {
  await login(page);
  await createContent(page, {
    contentType: 'Document',
    contentId: 'document',
    contentTitle: 'Document',
  });
  await page.goto('/');
  await createListingPages(page);
  await page.goto('/document/edit');
  await addBlockFromChooser(page, 'Listing');
  await page.locator('#field-variation').click();
  await page
    .locator('#field-variation')
    .getByText('Grid', { exact: true })
    .click();
  await configurePageListing(page);
  await expect(
    page.locator('.block.listing .listing-item').first(),
  ).toContainText('My Page');
  await save(page);
  const firstItem = page.locator('#page-document .listing-item').first();
  await expect(firstItem).toContainText('My Page');
  await expect(firstItem.locator('a')).toHaveAttribute(
    'href',
    '/document/my-page',
  );
});
