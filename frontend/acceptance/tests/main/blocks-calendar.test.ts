import type { Page } from '@playwright/test';
import { addBlockFromSlashMenu, save } from '../blocks';
import { createContent } from '../content';
import { login } from '../login';
import { expect, test } from '../test';

const results = (page: Page) => page.locator('.row.template-container');
const cards = (page: Page) => page.locator('.card-listing');

async function addCalendar(page: Page) {
  await addBlockFromSlashMenu(page, 'eventCalendar', 'event');
  await expect(page.locator('.block.eventsearch.eventCalendar')).toBeVisible();
}

async function addReviewFacet(page: Page) {
  await page.getByRole('button', { name: 'Add Facet', exact: true }).click();
  await page
    .locator('[id^="field-field-1-"] .react-select__value-container')
    .click();
  await page
    .locator('.react-select__option')
    .getByText('Review state', { exact: true })
    .click();
}

async function selectReviewFacet(page: Page, state: string) {
  await page.locator('.facets .react-select__control').click();
  await page
    .locator('.react-select__option')
    .getByText(state, { exact: true })
    .click();
}

async function setDateRange(page: Page) {
  const now = new Date();
  for (const [slot, day] of [
    ['start', 7],
    ['end', 14],
  ] as const) {
    for (const [segment, value] of [
      ['day', day],
      ['month', now.getUTCMonth() + 1],
      ['year', now.getUTCFullYear()],
    ] as const) {
      const input = page.locator(
        `.react-aria-Group [slot="${slot}"] [data-type="${segment}"]`,
      );
      await input.focus();
      await input.pressSequentially(String(value));
    }
  }
  await page
    .locator('.react-aria-Group [slot="end"] [data-type="year"]')
    .press('Tab');
}

async function addCriterion(page: Page, name: string) {
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
  return query.locator('.fields').first();
}

async function configureEvents(page: Page) {
  const criterion = await addCriterion(page, 'Type');
  await criterion.locator(':scope > .field').click();
  await criterion
    .locator('.react-select__option')
    .getByText('Event', { exact: true })
    .click();
}

async function expectEvents(page: Page, present: string[], absent: string[]) {
  for (const title of present) {
    await expect(results(page).getByText(title, { exact: true })).toBeVisible();
  }
  for (const title of absent) {
    await expect(results(page).getByText(title, { exact: true })).toHaveCount(
      0,
    );
  }
}

test.describe('Event Calendar Block Tests', () => {
  test.use({ timezoneId: 'UTC' });

  test.beforeEach(async ({ page }, testInfo) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    const now = new Date();
    const published = [
      'Add Event Calendar block and test facet',
      'Add Event Calendar block and test query field',
      'Test the daterange with facet and input',
    ].includes(testInfo.title);
    for (const [id, title, day, endDay] of [
      ['my-first-event', 'My First Event', 11, 12],
      ['my-search-event', 'Search Event', 11, 12],
      ['my-second-event', 'Second Event', 16, 16],
    ] as const) {
      const start = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), day),
      );
      const end = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), endDay),
      );
      if (id === 'my-second-event') end.setUTCSeconds(1);
      await createContent(page, {
        contentType: 'Event',
        contentId: id,
        contentTitle: title,
        transition:
          published &&
          (id === 'my-first-event' ||
            (id === 'my-search-event' &&
              testInfo.title === 'Test the daterange with facet and input'))
            ? 'publish'
            : '',
        bodyModifier: (body) => ({
          ...body,
          start: start.toISOString(),
          end: end.toISOString(),
        }),
      });
    }
    await login(page);
    await page.goto('/my-page');
    await page.getByRole('link', { name: 'Edit', exact: true }).click();
    await expect(page).toHaveURL('/my-page/edit');
  });

  test('Add Event Calendar block', async ({ page }) => {
    await addCalendar(page);
    await save(page);
    const search = page.locator('.search-input input');
    await search.fill('My First Event');
    await search.press('Enter');
    await expectEvents(page, ['My First Event'], ['Second Event']);
  });

  test('Add Event Calendar block and test the daterange', async ({ page }) => {
    await addCalendar(page);
    await save(page);
    await setDateRange(page);
    await expectEvents(page, ['My First Event'], ['Second Event']);
  });

  test('Add Event Calendar block and test facet', async ({ page }) => {
    await addCalendar(page);
    await addReviewFacet(page);
    await save(page);
    await selectReviewFacet(page, 'Published');
    await expectEvents(page, ['My First Event'], ['Second Event']);
    await selectReviewFacet(page, 'Private');
    await expectEvents(page, ['Second Event'], ['My First Event']);
  });

  test('Add Event Calendar block and test query field', async ({ page }) => {
    await addCalendar(page);
    const criterion = await addCriterion(page, 'Review state');
    await criterion.locator(':scope > .field').click();
    await criterion
      .locator('.react-select__option')
      .getByText('Private [private]', { exact: true })
      .click();
    await save(page);
    await expectEvents(page, ['Second Event'], ['My First Event']);
  });

  test('Respect batching,limits and pagination', async ({ page }) => {
    for (const [id, title] of [
      ['my-folder', 'My Folder'],
      ['my-folder2', 'My Folder 2'],
      ['my-folder3', 'My Folder 3'],
    ]) {
      await createContent(page, {
        contentType: 'Event',
        contentId: id,
        contentTitle: title,
        path: 'my-page',
      });
    }
    await addCalendar(page);
    await configureEvents(page);
    await page.locator('#field-limit-3-query').fill('2');
    await save(page);
    await expect(cards(page)).toHaveCount(2);
    const firstPage = await cards(page).allTextContents();
    await page.goto('/my-page/edit');
    await page.locator('.block-editor-eventCalendar').click();
    await page.locator('#field-limit-3-query').fill('0');
    await page.locator('#field-b_size-5-query').fill('2');
    await save(page);
    await expect(cards(page)).toHaveCount(2);
    await page.locator('.ui.pagination.menu a[value="2"]').first().click();
    await expect(cards(page)).toHaveCount(2);
    await expect
      .poll(() => cards(page).allTextContents())
      .not.toEqual(firstPage);
  });

  test('Test the daterange with facet and input', async ({ page }) => {
    await addCalendar(page);
    await addReviewFacet(page);
    await save(page);
    await selectReviewFacet(page, 'Published');
    await expectEvents(page, ['My First Event'], ['Second Event']);
    await setDateRange(page);
    await expectEvents(page, ['My First Event'], ['Second Event']);
    const search = page.locator('.first-row .search-input input');
    await search.fill('Search Event');
    await expectEvents(page, ['Search Event'], ['My First Event']);
    await search.fill('');
    await expectEvents(
      page,
      ['My First Event', 'Search Event'],
      ['Second Event'],
    );
    await selectReviewFacet(page, 'Private');
    await expectEvents(page, [], ['My First Event', 'Second Event']);
    await page.locator('.react-aria-DateRangePicker .reset-date-range').click();
    await expectEvents(page, ['Second Event'], ['My First Event']);
  });

  test('EventCalendar block - Test Criteria: short-name', async ({ page }) => {
    await page
      .locator('.block.inner.title [contenteditable=true]')
      .fill('EventCalendar block - Test Criteria: short-name');
    await addCalendar(page);
    const criterion = await addCriterion(page, 'Short name (id)');
    await criterion.locator('.main-fields-wrapper .field').last().click();
    await criterion
      .locator('.react-select__option')
      .getByText('Is', { exact: true })
      .click();
    await criterion.locator(':scope > .field input').fill('my-first-event');
    await expect(
      page
        .locator('.block.eventCalendar .card-listing')
        .first()
        .locator('.title'),
    ).toContainText('My First Event');
    await expect(
      page
        .locator('.block.eventCalendar .card-listing .title')
        .getByText('Search Event', { exact: true }),
    ).toHaveCount(0);
    await save(page);
    await expect(cards(page).first()).toContainText('My First Event');
    await expect(cards(page).first().locator('a')).toHaveAttribute(
      'href',
      '/my-first-event',
    );
  });

  test('Event calendar show single date for same day event and double for different', async ({
    page,
  }) => {
    await addCalendar(page);
    await save(page);
    for (const [id, hasEnd] of [
      ['my-second-event', false],
      ['my-first-event', true],
    ] as const) {
      const inset = page
        .locator('.card')
        .filter({ has: page.locator(`a[href="/${id}"]`) })
        .locator('.date-inset');
      await expect(inset).toBeVisible();
      if (hasEnd) await expect(inset).toHaveClass(/\bhas-end-date\b/);
      else await expect(inset).not.toHaveClass(/\bhas-end-date\b/);
    }
  });

  test('Add eventCalendar Block - sort by Order in folder and sort_order:descending', async ({
    page,
  }) => {
    await addCalendar(page);
    await configureEvents(page);
    const sort = page.locator('#select-listingblock-sort-on');
    await sort.click();
    await sort.pressSequentially('Order in folder');
    await sort.press('Enter');
    await save(page);
    await expect(cards(page).first()).toContainText('My First Event');
    await expect(cards(page).first().locator('a')).toHaveAttribute(
      'href',
      '/my-first-event',
    );
    await page.goto('/my-page/edit');
    await page.locator('.block-editor-eventCalendar').click();
    const reversed = page.locator(
      'input[name="field-sort_order_boolean-2-query"]',
    );
    await reversed.check({ force: true });
    await expect(reversed).toBeChecked();
    await save(page);
    await expect(cards(page).first()).toContainText('Second Event');
    await expect(cards(page).first().locator('a')).toHaveAttribute(
      'href',
      '/my-second-event',
    );
  });
});
