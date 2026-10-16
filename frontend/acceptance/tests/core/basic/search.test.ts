import type { Page } from '@playwright/test';
import { expect, test } from '../../test';
import { createContent } from '../../content';
import { login } from '../../login';
import { save } from '../../blocks';

async function sortResults(page: Page, sortOn: 'sortable_title' | 'effective') {
  const sorted = page.waitForResponse((response) => {
    const url = new URL(response.url());
    return (
      url.pathname.endsWith('/@search') &&
      url.searchParams.get('sort_on') === sortOn
    );
  });
  await page.locator(`button[name="${sortOn}"]`).click();
  expect((await sorted).ok()).toBeTruthy();
}

async function editSearchDocuments(page: Page, ids: string[]) {
  for (const id of ids) {
    await page.goto(`/${id}/edit`);
    await expect(page).toHaveURL(new RegExp(`/${id}/edit$`));
    await page
      .locator('.block.slate [contenteditable="true"]')
      .fill('This is the text.');
    await save(page);
    await expect(page.locator('main')).toContainText('This is the text.');
  }
  await page.goto('/');
  await expect(page).toHaveURL('/');
  await page.goto('/search?SearchableText=color');
  await expect(page).toHaveURL('/search?SearchableText=color');
  await expect(page.locator('.summary.url')).toHaveCount(2);
}

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/');
  });

  test('as an authenticated user I can see results ordered by search rank', async ({
    page,
  }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'colorless',
      contentTitle: 'Colorless',
    });
    await createContent(page, {
      contentType: 'Document',
      contentId: 'color',
      contentTitle: 'Color',
    });
    await editSearchDocuments(page, ['colorless', 'color']);
    await expect(page.locator('.summary.url')).toHaveText([
      'Color',
      'Colorless',
    ]);
  });

  test('as an authenticated user I can see results ordered alphabetically', async ({
    page,
  }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'acolorless',
      contentTitle: 'A Colorless',
    });
    await createContent(page, {
      contentType: 'Document',
      contentId: 'bcolor',
      contentTitle: 'B Color',
    });
    await editSearchDocuments(page, ['acolorless', 'bcolor']);
    await sortResults(page, 'sortable_title');
    await expect(page.locator('.summary.url')).toHaveText([
      'A Colorless',
      'B Color',
    ]);
  });

  test('as an authenticated user I can see results ordered by effective date, newest first', async ({
    page,
  }) => {
    for (const { id, title, effective } of [
      {
        id: 'colorless',
        title: 'Colorless',
        effective: '2020-08-15T15:58:24+00:00',
      },
      {
        id: 'color',
        title: 'Color',
        effective: '2020-08-13T15:58:24+00:00',
      },
    ]) {
      await createContent(page, {
        contentType: 'Document',
        contentId: id,
        contentTitle: title,
        bodyModifier: (body) => ({
          ...body,
          effective,
          expires: '2030-05-14T15:58:24+00:00',
        }),
      });
    }
    await editSearchDocuments(page, ['colorless', 'color']);
    await sortResults(page, 'effective');
    await expect(page.locator('.summary.url')).toHaveText([
      'Colorless',
      'Color',
    ]);
  });
});
