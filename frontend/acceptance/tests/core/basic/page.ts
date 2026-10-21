import type { Page } from '@playwright/test';
import { expect } from '../../test';

export async function createPageThroughEditor(page: Page) {
  await page.locator('#toolbar-add').click();
  await page.locator('#toolbar-add-document').click();
  const title = page.locator('.block.title [contenteditable="true"]');
  await title.fill('My Page');
  await expect(title).toHaveText('My Page');
  await page.locator('#toolbar-save').click();
  await expect(page).toHaveURL('/my-page');
  await expect(page.locator('.navigation .item.active')).toHaveText('My Page');
}
