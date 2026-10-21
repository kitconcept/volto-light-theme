import type { Locator, Page } from '@playwright/test';
import { expect } from './test';

export async function selectInternalLink(
  page: Page,
  field: Locator,
  title: string,
  { doubleClick = true }: { doubleClick?: boolean } = {},
) {
  await field.getByRole('button', { name: 'Open object browser' }).click();
  const browser = page.locator('aside');
  await browser.locator('.breadcrumbs .home-icon').click();
  const item = browser.getByLabel(`Select ${title}`, { exact: true });
  await expect(item).toBeVisible();
  if (doubleClick) {
    await item.dblclick();
  } else {
    await item.click();
    await browser.locator('button.clearSVG').click();
  }
  await expect(item).toBeHidden();
}
