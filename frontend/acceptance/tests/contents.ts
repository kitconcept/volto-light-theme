import type { Page } from '@playwright/test';
import { expect } from './test';

export function contentRow(page: Page, path: string) {
  return page.getByRole('row', { name: path, exact: true });
}

export async function selectContent(page: Page, path: string) {
  await contentRow(page, path)
    .getByRole('button', { name: 'Checked', exact: true })
    .click();
}

export async function renameSelectedContent(
  page: Page,
  title: string,
  id: string,
) {
  await page.getByRole('button', { name: 'Rename', exact: true }).click();
  const modal = page.locator('.modal.active');
  await modal.locator('input[name="0_title"]').fill(title);
  await modal.locator('input[name="0_id"]').fill(id);
  await modal.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(modal).toBeHidden();
}

export async function deleteSelectedContent(page: Page) {
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  const modal = page.locator('.modal.active');
  await modal.getByRole('button', { name: 'Delete', exact: true }).click();
  await expect(modal).toBeHidden();
}

export async function contentAction(page: Page, path: string, action: string) {
  // The row popup has an SVG trigger without an accessible name.
  await contentRow(page, path).locator('.dropdown-popup-trigger').click();
  await page
    .locator('.dropdown-popup')
    .getByText(action, { exact: true })
    .click();
}
