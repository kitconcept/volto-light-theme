import type { Locator, Page } from '@playwright/test';
import { expect } from './test';

export async function selectInternalLink(
  page: Page,
  field: Locator,
  title: string,
) {
  await field.getByRole('button', { name: 'Open object browser' }).click();
  const browser = page.locator('aside');
  await browser.locator('.breadcrumbs .home-icon').click();
  const item = browser.getByLabel(`Select ${title}`, { exact: true });
  await expect(item).toBeVisible();
  await item.dblclick();
  await expect(item).toBeHidden();
}
