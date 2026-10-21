import { expect, test } from '../../test';
import { save } from '../../blocks';
import { openBlockEditor } from './editor';

test.describe('Block Indexing Tests', () => {
  test.beforeEach(async ({ page }) => {
    await openBlockEditor(page);
  });

  test('Index Text Block', async ({ page }) => {
    const editor = page.locator('.block.slate [contenteditable=true]');
    await editor.fill('Noam Avram Chomsky');
    await expect(editor).toHaveText('Noam Avram Chomsky');
    await save(page);
    await page
      .locator('.navigation-desktop .search-button')
      .getByRole('button', { name: 'Search', exact: true })
      .click();
    const search = page.locator(
      '.navigation-desktop input[name="SearchableText"]',
    );
    await expect(search).toBeEnabled();
    await search.fill('Avram');
    await search.press('Enter');
    await expect(page.locator('#content-core')).toContainText('My Page');
    await expect(page.locator('.summary.url')).toHaveText('My Page');
    await expect(page.locator('.summary.url')).toHaveAttribute(
      'href',
      '/my-page',
    );
  });
});
