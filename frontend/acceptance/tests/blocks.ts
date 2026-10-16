import type { Page } from '@playwright/test';
import { expect } from './test';

export async function addBlockFromChooser(page: Page, title: string) {
  const editor = page.locator('.block .slate-editor [contenteditable=true]');
  await editor.click();
  await editor.hover();
  await page.getByRole('button', { name: 'Add block', exact: true }).click();
  await page
    .locator('.blocks-chooser .mostUsed')
    .getByRole('button', { name: title, exact: true })
    .click();
}

export async function addBlockFromSlashMenu(
  page: Page,
  blockType: string,
  searchTerm = blockType,
) {
  const editor = page.locator('.block .slate-editor [contenteditable=true]');
  await editor.click();
  await editor.pressSequentially(`/${searchTerm}`);
  await expect(
    page.locator(`.power-user-menu .item.active.${blockType}`),
  ).toBeVisible();
  await editor.press('Enter');
}

export async function save(page: Page) {
  const contentURL = new URL(page.url());
  contentURL.pathname = contentURL.pathname.replace(/\/edit$/, '');
  contentURL.search = '';
  const saved = page.waitForResponse(
    (response) =>
      response.request().method() === 'PATCH' &&
      new URL(response.url()).pathname.endsWith(contentURL.pathname),
  );
  await page.locator('#toolbar-save').click();
  expect((await saved).ok()).toBeTruthy();
  await expect(page).toHaveURL(contentURL.toString());
}
