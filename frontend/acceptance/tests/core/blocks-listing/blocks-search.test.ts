import type { Page } from '@playwright/test';
import { expect, test } from '../../test';
import { createContent } from '../../content';
import { login } from '../../login';
import { addBlockFromSlashMenu } from '../../blocks';

test.beforeEach(async ({ page }, testInfo) => {
  const sorted =
    testInfo.title === 'Search block - test on edit sort on and sort order';
  for (const [id, title, type, year] of [
    ['my-page', 'My page', 'Document', 2025],
    ['my-folder', 'My Folder', 'Document', 2024],
    ['my-event', 'My Event', 'Event', 2023],
  ] as const) {
    await createContent(page, {
      contentType: type,
      contentId: id,
      contentTitle: title,
      bodyModifier: (body) =>
        sorted
          ? {
              ...body,
              effective: `${year}-01-01T08:00:00`,
              expires: `${year}-12-31T08:00:00`,
            }
          : body,
    });
  }
  await login(page);
  await page.goto('/');
});
async function addSearch(page: Page) {
  await page.locator('#toolbar-add').click();
  await page.locator('#toolbar-add-document').click();
  await page
    .locator('.block.title [contenteditable=true]')
    .fill('My Search Page');
  await addBlockFromSlashMenu(page, 'search');
  const query = page.locator('#default-query-0-query');
  await query.locator('.react-select__value-container').click();
  await query
    .locator('.react-select__option')
    .getByText('Type', { exact: true })
    .click();
  for (const type of ['Page', 'Folder', 'Event']) {
    const row = query.locator('.fields').first();
    await row.locator(':scope > .field').click();
    await row
      .locator('.react-select__option')
      .getByText(type, { exact: true })
      .click();
  }
}
async function saveSearch(page: Page) {
  await page.locator('#toolbar-save').click();
  await expect(page).toHaveURL('/my-search-page');
  await expect(page.locator('h2.search-details')).toHaveText(
    '3 Search results',
  );
}
async function searchQuery(page: Page) {
  return JSON.parse(new URL(page.url()).searchParams.get('query') || '[]') as {
    i: string;
    o: string;
    v: unknown;
  }[];
}
async function expectTextQuery(page: Page, value: string) {
  await expect
    .poll(async () =>
      (await searchQuery(page)).find((q) => q.i === 'SearchableText'),
    )
    .toEqual({ i: 'SearchableText', o: 'paqo.string.contains', v: value });
}
async function facet(page: Page, field: string, title: string, type: string) {
  await page.locator('.add-item-button-wrapper > button').click();
  await page
    .locator('[id^="field-field-1-"] .react-select__value-container')
    .click();
  await page
    .locator('.react-select__option')
    .getByText(field, { exact: true })
    .click();
  await page.locator('[id^="field-title-0-"]').fill(title);
  await page.locator('[id^="field-type-2-"]').click();
  await page
    .locator('.react-select__option')
    .getByText(type, { exact: true })
    .click();
}
test('Search block - test checkbox facet', async ({ page }) => {
  await addSearch(page);
  await facet(page, 'Type', 'Type', 'Checkbox');
  await saveSearch(page);
  const checkboxes = page.locator('.checkbox-facet');
  await checkboxes.locator('label').getByText('Event', { exact: true }).click();
  await expect(
    page.locator('.searchBlock-facets').getByText('My Event', { exact: true }),
  ).toBeVisible();
  await expect(page.locator('h2.search-details')).toHaveText(
    '1 Search results',
  );
  await expect
    .poll(async () =>
      (await searchQuery(page)).some(
        (q) =>
          q.i === 'portal_type' &&
          (q.v === 'Event' || JSON.stringify(q.v) === '["Event"]'),
      ),
    )
    .toBe(true);
  // The original scenario asserts that this repeated click retains the Event query.
  await checkboxes.locator('label').getByText('Event', { exact: true }).click();
  await expect(page.locator('h2.search-details')).toHaveText(
    '1 Search results',
  );
  await expect
    .poll(async () =>
      (await searchQuery(page)).find(
        (q) => q.i === 'portal_type' && q.v === 'Event',
      ),
    )
    .toEqual({ i: 'portal_type', o: 'paqo.selection.is', v: 'Event' });
  await checkboxes
    .locator('label')
    .getByText('Folder', { exact: true })
    .click();
  await checkboxes.locator('label').getByText('Page', { exact: true }).click();
  const url =
    '/my-search-page?query=' +
    encodeURIComponent(
      JSON.stringify([
        { i: 'portal_type', o: 'paqo.list.contains', v: ['Event'] },
      ]),
    );
  await page.goto(url);
  await page.reload();
  await expect(page.locator('h2.search-details')).toHaveText(
    '1 Search results',
  );
  await page.goto('/');
  await page.goto(url);
  await expect(page.locator('h2.search-details')).toHaveText(
    '1 Search results',
  );
  await page.reload();
  await expect(page.locator('h2.search-details')).toHaveText(
    '1 Search results',
  );
});
test('Search block - test date range facet', async ({ page }) => {
  await addSearch(page);
  await facet(page, 'Effective date', 'Effective date', 'Date Range');
  await saveSearch(page);
  await expect(page.locator('.facets')).toContainText('Effective date');
});
test('Search block - test live searchbox', async ({ page }) => {
  await addSearch(page);
  await saveSearch(page);
  const input = page.locator('.search-wrapper .search-input input');
  const requests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('/@querystring-search'))
      requests.push(request.url());
  });
  await input.fill('Event');
  await expectTextQuery(page, 'Event');
  await expect(
    page.locator('#page-document .listing-item a').first(),
  ).toHaveAttribute('href', '/my-event');
  expect(requests).toHaveLength(1);
  requests.length = 0;
  await input.press('Backspace');
  await expectTextQuery(page, 'Even');
  await expect(page.locator('h2.search-details')).toHaveText(
    '1 Search results',
  );
  expect(requests).toHaveLength(1);
  await input.fill('');
  await expect(page.locator('h2.search-details')).toHaveText(
    '3 Search results',
  );
  await expect
    .poll(async () =>
      (await searchQuery(page)).some((q) => q.i === 'SearchableText'),
    )
    .toBe(false);
  await input.fill('Event');
  await expectTextQuery(page, 'Event');
  await expect(page.locator('h2.search-details')).toHaveText(
    '1 Search results',
  );
  await input.press('ControlOrMeta+A');
  await input.press('Delete');
  await expect(page.locator('h2.search-details')).toHaveText(
    '3 Search results',
  );
});
test('Search block - test searchbox', async ({ page }) => {
  await addSearch(page);
  await saveSearch(page);
  const input = page.locator('.search-wrapper .search-input input');
  await input.fill('Event');
  await expectTextQuery(page, 'Event');
  await expect(page.locator('h2.search-details')).toHaveText(
    '1 Search results',
  );
  await expect(
    page.locator('#page-document .listing-item a').first(),
  ).toHaveAttribute('href', '/my-event');
  await input.press('Backspace');
  await expectTextQuery(page, 'Even');
  await expect(page.locator('h2.search-details')).toHaveText(
    '1 Search results',
  );
  await input.pressSequentially('Event');
  await expectTextQuery(page, 'EvenEvent');
  await expect(page.locator('h2.search-details')).toHaveText(
    '0 Search results',
  );
  expect(
    (await searchQuery(page)).find((q) => q.i === 'portal_type')?.v,
  ).toEqual(['Document', 'Folder', 'Event']);
  expect((await searchQuery(page)).find((q) => q.i === 'portal_type')?.o).toBe(
    'paqo.selection.any',
  );
  expect(new URL(page.url()).searchParams.get('sort_order')).toBe('ascending');
});
test('Search block - test on edit sort on and sort order', async ({ page }) => {
  await addSearch(page);
  await page.locator('label[for="field-sort_order_boolean-2-query"]').click();
  await expect(page.locator('.listing-item').first()).toContainText('My page');
  const sort = page.locator('#select-listingblock-sort-on');
  await sort.click();
  await page
    .locator('.react-select__option')
    .getByText('Effective date', { exact: true })
    .click();
  await expect(page.locator('.listing-item').first()).toContainText('My page');
  await saveSearch(page);
});
