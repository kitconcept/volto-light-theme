import type { Page } from '@playwright/test';
import { expect } from '../test';
import { createContent } from '../content';

export async function createListingPages(page: Page) {
  for (const suffix of ['', '-1', '-2']) {
    await createContent(page, {
      contentType: 'Document',
      contentId: `my-page${suffix}`,
      contentTitle: `My Page${suffix.replace('-', ' ')}`,
      path: '/document',
    });
  }
}

export async function configurePageListing(page: Page) {
  await page
    .locator('.sidebar-container .tabs-wrapper .menu .item')
    .getByText('Block', { exact: true })
    .click();
  const query = page.locator('.querystring-widget');
  await query.getByText('Add criteria', { exact: true }).click();
  await query
    .locator('.react-select__option')
    .getByText('Type', { exact: true })
    .click();
  await query.locator('.fields').first().locator(':scope > .field').click();
  await query
    .locator('.react-select__option')
    .getByText('Page', { exact: true })
    .click();
  await expect(page.locator('.block.listing').last()).toContainText('My Page');
}
