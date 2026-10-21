import { expect, test } from '../../test';
import { createContent } from '../../content';
import { login } from '../../login';
import { addBlockFromSlashMenu, save } from '../../blocks';
import {
  child,
  editListing,
  typeCriterion,
  addCriterion,
  relativeLocation,
  expectServerMarkup,
  items,
  threeChildren,
  pagination,
} from './listing';

test.beforeEach(async ({ page }) => {
  await login(page);
  await createContent(page, {
    contentType: 'Document',
    contentId: 'my-page',
    contentTitle: 'My Page',
  });
  await page.goto('/');
});
for (const mode of [
  'with no results',
  'default',
  'with query parameters',
  'containing items',
  'results preview',
  'with a headline',
]) {
  test(`Add Listing block - ${mode}`, async ({ page }) => {
    await child(page, 'my-page-test', 'My Page Test');
    if (mode !== 'with no results') {
      await child(page, 'my-news', 'My News', 'News Item');
      await child(page, 'my-folder', 'My Folder');
    }
    await editListing(page);
    await page.locator('.block.title [contenteditable=true]').fill('My title');
    await page
      .locator('.block-editor-listing')
      .click({ position: { x: 1, y: 1 } });
    if (mode === 'with no results') await typeCriterion(page, 'News Item');
    else {
      if (['with query parameters', 'results preview'].includes(mode))
        await typeCriterion(page, 'Page');
      await expect(
        page.locator('.block.listing .listing-item').first(),
      ).toContainText('My Page Test');
      if (mode === 'containing items')
        await expect(page.locator('.items-preview')).toContainText(
          'Contained items',
        );
      if (mode === 'results preview')
        await expect(page.locator('.items-preview')).toContainText(
          'Results preview',
        );
      if (mode === 'with a headline')
        await page.locator('#field-headline').fill('This is a headline');
    }
    await save(page);
    if (mode === 'with no results')
      await expect(page.locator('.emptyListing')).toContainText(
        'No results found.',
      );
    else {
      await expect(items(page).first()).toContainText('My Page Test');
      await expect(items(page).first().locator('a').first()).toHaveAttribute(
        'href',
        '/my-page/my-page-test',
      );
      await expectServerMarkup(page, '.listing-item', 'My Page Test');
      if (mode === 'with a headline') {
        await expect(page.locator('h2.headline')).toHaveText(
          'This is a headline',
        );
        await expectServerMarkup(page, 'h2.headline', 'This is a headline');
      }
    }
  });
}
test('Add Listing Block - sort by effective date', async ({ page }) => {
  for (const [id, title, date] of [
    ['page-one', 'Page One', '2018-01-01T08:00:00'],
    ['page-two', 'Page Two', '2019-01-01T08:00:00'],
  ]) {
    await createContent(page, {
      contentType: 'Document',
      contentId: id,
      contentTitle: title,
      path: 'my-page',
      transition: 'publish',
      bodyModifier: (body) => ({ ...body, effective: date }),
    });
  }
  await editListing(page);
  await typeCriterion(page, 'Page');
  const sort = page.locator('#select-listingblock-sort-on');
  await sort.click();
  await sort.pressSequentially('Effective date');
  await sort.press('Enter');
  await page
    .locator('input[name="field-sort_order_boolean-2-querystring"]')
    .check({ force: true });
  await save(page);
  await expect(items(page).first()).toContainText('Page Two');
  await expect(items(page).first().locator('a').first()).toHaveAttribute(
    'href',
    '/my-page/page-two',
  );
  await expectServerMarkup(page, '.listing-item', 'Page Two');
});
test('Listing block - Test Root with Criteria: Type Page', async ({ page }) => {
  await child(page, 'my-news', 'My News', 'News Item');
  await page.goto('/');
  await page.getByRole('link', { name: 'Edit', exact: true }).click();
  await addBlockFromSlashMenu(page, 'listing');
  await typeCriterion(page, 'Page');
  await expect(page.locator('.block-editor-listing')).toContainText('My Page');
  await expect(page.locator('.block-editor-listing')).not.toContainText(
    'My News',
  );
  await save(page);
  await expectServerMarkup(page, '.listing-item', 'My Page');
  await expect(items(page).first().locator('a').first()).toHaveAttribute(
    'href',
    '/my-page',
  );
});
test('Listing block - Test Criteria: short-name', async ({ page }) => {
  await child(page, 'my-page-test', 'My Page Test');
  await child(page, 'my-news', 'My News', 'News Item');
  await child(page, 'my-folder', 'My Folder');
  await editListing(page);
  const row = await addCriterion(page, 'Short name (id)');
  await row.locator('.main-fields-wrapper .field').last().click();
  await row
    .locator('.react-select__option')
    .getByText('Is', { exact: true })
    .click();
  await row.locator(':scope > .field input').fill('my-page-test');
  await expect(page.locator('.block-editor-listing')).toContainText(
    'My Page Test',
  );
  await expect(page.locator('.block-editor-listing')).not.toContainText(
    'My News',
  );
  await save(page);
  await expect(items(page)).toHaveCount(1);
  await expectServerMarkup(page, '.listing-item', 'My Page Test');
  await expect(items(page).first().locator('a').first()).toHaveAttribute(
    'href',
    '/my-page/my-page-test',
  );
});
for (const mode of [
  'relative',
  'absolute',
  'relative with some outside content',
]) {
  test(`Listing block - Test Criteria: Location ${mode}`, async ({ page }) => {
    const outside = mode.includes('outside');
    if (outside) {
      await child(page, 'about-us', 'about us', 'Document', '');
      await child(page, 'contact', 'contact', 'Document', '');
      await child(page, 'news-item-one', 'News Item One');
      await child(page, 'news-item-two', 'News Item Two');
      await editListing(page);
    } else {
      await child(page, 'document-outside-folder', 'Document outside Folder');
      await child(page, 'my-folder', 'My Folder');
      await child(
        page,
        'document-within-folder',
        'Document within Folder',
        'Document',
        'my-page/my-folder',
      );
      if (mode === 'absolute')
        await child(page, 'my-image', 'My Image', 'Image', 'my-page/my-folder');
      await editListing(page, '/my-page/my-folder');
    }
    if (mode === 'absolute') {
      const row = await addCriterion(page, 'Location');
      await row.getByRole('button', { name: 'Open object browser' }).click();
      await expect(
        page.locator('aside').getByLabel('Select My Image', { exact: true }),
      ).toHaveClass(/disabled/);
      await page
        .locator('aside')
        .getByRole('button', { name: 'Search SVG', exact: true })
        .click();
      await page
        .locator('aside')
        .getByPlaceholder('Search content')
        .fill('My Folder');
      await page
        .locator('aside')
        .getByLabel('Select My Folder', { exact: true })
        .dblclick();
    } else await relativeLocation(page);
    const title = outside ? 'News Item One' : 'Document within Folder';
    await expect(
      page.locator('.block.listing .listing-item').first(),
    ).toContainText(title);
    await expect(page.locator('.block-editor-listing')).not.toContainText(
      outside ? 'about us' : 'Document outside Folder',
    );
    await save(page);
    await expectServerMarkup(page, '.listing-item', title);
    await expect(items(page).first()).toContainText(title);
    await expect(items(page).first()).not.toContainText(
      outside ? 'about us' : 'Document outside Folder',
    );
  });
}
test('Listing block: respect batching and limits', async ({ page }) => {
  await threeChildren(page);
  await editListing(page);
  await typeCriterion(page, 'Page');
  await page.locator('#field-limit-3-querystring').fill('2');
  await save(page);
  await expect(items(page)).toHaveCount(2);
  await expectServerMarkup(page, '.listing-item', 'My Folder');
  await page.getByRole('link', { name: 'Edit', exact: true }).click();
  await page.locator('.block-editor-listing').click();
  await page.locator('#field-limit-3-querystring').fill('0');
  await page.locator('#field-b_size-5-querystring').fill('2');
  await page.locator('.ui.pagination.menu a[value="2"]').first().click();
  await expect(page.locator('.listing-item').first()).toContainText(
    'My Folder 3',
  );
});
for (const [name, reload] of [
  ['Navigates in listing block pagination and url clears on logo click', false],
  ['Reload path when listing page = 2', true],
] as const) {
  test(name, async ({ page }) => {
    await threeChildren(page);
    await editListing(page);
    if (reload) {
      await typeCriterion(page, 'Page');
      await page.locator('#field-limit-3-querystring').fill('2');
      await save(page);
      await expect(items(page)).toHaveCount(2);
      await expect(items(page).first().locator('a').first()).toHaveAttribute(
        'href',
        '/my-page/my-folder',
      );
      await expectServerMarkup(page, '.listing-item', 'My Folder');
      await page.getByRole('link', { name: 'Edit', exact: true }).click();
      await page.locator('.block-editor-listing').click();
      await page.locator('#field-limit-3-querystring').fill('0');
      await page.locator('#field-b_size-5-querystring').fill('2');
      await page.locator('.ui.pagination.menu a[value="2"]').first().click();
      await expect(page.locator('.listing-item').first()).toContainText(
        'My Folder 3',
      );
    } else await pagination(page, '2');
    await save(page);
    await expectServerMarkup(page, '.listing-item', 'My Folder');
    await page.locator('.ui.pagination.menu a[value="2"]').first().click();
    await expect(page).toHaveURL(/\?page=2/);
    await expect(items(page).first()).toContainText('My Folder 3');
    await expectServerMarkup(page, '.listing-item', 'My Folder 3');
    if (reload) {
      await page.reload();
      await expect(page).toHaveURL(/\?page=2/);
      await expectServerMarkup(page, '.listing-item', 'My Folder 3');
    } else {
      await page.locator('.logo').first().click();
      await expect(page).toHaveURL('/');
    }
  });
}
test('Navigate to different pages on two different listings', async ({
  page,
}) => {
  await threeChildren(page);
  await editListing(page);
  await pagination(page, '2');
  await addBlockFromSlashMenu(page, 'listing');
  await pagination(page, '1');
  await save(page);
  const listings = page.locator('#page-document .block.listing');
  await listings.nth(0).locator('a[value="2"]').first().click();
  await page.reload();
  await expect(page).toHaveURL(/=2/);
  await expectServerMarkup(page, '.listing-item', 'My Folder 3');
  await listings.nth(1).locator('a[value="3"]').first().click();
  await page.reload();
  await expect(page).toHaveURL(/=2/);
  await expect(page).toHaveURL(/=3/);
  await expectServerMarkup(page, '.listing-item', 'My Folder 3');
  await page.locator('.logo').first().click();
  await expect(page).toHaveURL('/');
  await page.goto('/my-page');
  await listings.nth(0).locator('a[value="2"]').first().click();
  await listings.nth(1).locator('a[value="3"]').first().click();
  await page.goBack();
  await expect(page).not.toHaveURL(/=3/);
  await expectServerMarkup(page, '.listing-item', 'My Folder 3');
  await page.goBack();
  await expect(page).not.toHaveURL(/=2|=3/);
  await expectServerMarkup(page, '.block.listing', 'My Folder 2');
});
test('Add Listing block with no results, navigate to home, add a News Item, go to the listing', async ({
  page,
}) => {
  await child(page, 'my-page-test', 'My Page Test');
  await editListing(page);
  await typeCriterion(page, 'News Item');
  await save(page);
  await expect(page.locator('.emptyListing')).toContainText(
    'No results found.',
  );
  await expectServerMarkup(page, '.emptyListing', 'No results found.');
  await page.locator('.logo').first().click();
  await child(page, 'my-news-item-test', 'My News Item', 'News Item');
  await page.goto('/my-page');
  await expect(items(page).first()).toContainText('My News Item');
  await expect(items(page).first().locator('a').first()).toHaveAttribute(
    'href',
    '/my-page/my-news-item-test',
  );
  await expectServerMarkup(page, '.listing-item', 'My News Item');
});
