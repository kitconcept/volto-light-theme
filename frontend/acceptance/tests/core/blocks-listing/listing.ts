import type { Page } from '@playwright/test';
import { expect } from '../../test';
import { createContent } from '../../content';
import { addBlockFromSlashMenu } from '../../blocks';

export async function child(
  page: Page,
  id: string,
  title: string,
  type = 'Document',
  parent = 'my-page',
  extra: Record<string, unknown> = {},
) {
  await createContent(page, {
    contentType: type,
    contentId: id,
    contentTitle: title,
    path: parent,
    bodyModifier: (body) => ({ ...body, ...extra }),
  });
}
export async function editListing(page: Page, path = '/my-page') {
  await page.goto(path);
  await page.getByRole('link', { name: 'Edit', exact: true }).click();
  await expect(page).toHaveURL(`${path}/edit`);
  await addBlockFromSlashMenu(page, 'listing');
}
export async function addCriterion(page: Page, name: string) {
  await page
    .locator('.block-editor-listing')
    .last()
    .click({ position: { x: 1, y: 1 } });
  await page
    .locator('.sidebar-container .tabs-wrapper .menu .item')
    .getByText('Block', { exact: true })
    .click();
  const query = page.locator('.querystring-widget');
  await query.getByText('Add criteria', { exact: true }).click();
  await query
    .locator('.react-select__option')
    .getByText(name, { exact: true })
    .click();
  return query
    .locator('.fields')
    .filter({ has: page.locator('.main-fields-wrapper') })
    .last();
}
export async function typeCriterion(page: Page, type: string) {
  const row = await addCriterion(page, 'Type');
  await row.locator(':scope > .field').click();
  await row
    .locator('.react-select__option')
    .getByText(type, { exact: true })
    .click();
}
export async function relativeLocation(page: Page) {
  const row = await addCriterion(page, 'Location');
  await row.getByText('Absolute path', { exact: true }).click();
  await row
    .locator('.react-select__option')
    .getByText('Relative path', { exact: true })
    .click();
  await row.locator(':scope > .field').last().click();
  await row
    .locator('.react-select__option')
    .getByText('Current path (./)', { exact: true })
    .click();
}
export async function variation(page: Page, value: string) {
  const input = page.locator('#field-variation');
  await input.click();
  await input.pressSequentially(value);
  await input.press('Enter');
}
export async function expectServerMarkup(
  page: Page,
  selector: string,
  text?: string,
) {
  const response = await page.request.get(
    page.url().replace(/\/edit(?:\?.*)?$/, ''),
  );
  expect(response.ok()).toBeTruthy();
  const markup = await response.text();
  const result = await page.evaluate(
    ({ markup, selector }) => {
      const element = new DOMParser()
        .parseFromString(markup, 'text/html')
        .querySelector(selector);
      return element
        ? { text: element.textContent, html: element.innerHTML }
        : null;
    },
    { markup, selector },
  );
  expect(result, `SSR must contain ${selector}`).not.toBeNull();
  if (text) expect(result?.text).toContain(text);
}
export const items = (page: Page) =>
  page.locator('#page-document .listing-item');
export async function threeChildren(page: Page) {
  for (const [id, title] of [
    ['my-folder', 'My Folder'],
    ['my-folder2', 'My Folder 2'],
    ['my-folder3', 'My Folder 3'],
  ])
    await child(page, id, title);
}
export async function pagination(page: Page, size: string) {
  await typeCriterion(page, 'Page');
  await page.locator('#field-limit-3-querystring').fill('0');
  await page.locator('#field-b_size-5-querystring').fill(size);
}
