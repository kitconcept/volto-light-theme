import type { Page } from '@playwright/test';
import { expect, test } from '../../test';
import { createContent } from '../../content';
import { login } from '../../login';
import { addBlockFromSlashMenu, save } from '../../blocks';
import { addTextLink } from './editor-actions';

test.use({ viewport: { width: 1280, height: 1200 } });
test.beforeEach(async ({ page }) => {
  await createContent(page, {
    contentType: 'Document',
    contentId: 'document',
    contentTitle: 'Test document',
  });
  await createContent(page, {
    contentType: 'Document',
    contentId: 'my-page',
    contentTitle: 'My Page',
    path: '/document',
  });
  await createContent(page, {
    contentType: 'Image',
    contentId: 'my-image',
    contentTitle: 'My Image',
    path: '/document',
  });
  await login(page);
  await page.goto('/document/edit');
  await addBlockFromSlashMenu(page, 'gridBlock', 'grid');
  await page.getByText('2 columns', { exact: true }).click();
});
async function addColumn(
  page: Page,
  position: number,
  type: string,
  label: string,
) {
  await page
    .getByRole('button', {
      name: `Add block in position ${position}`,
      exact: true,
    })
    .click();
  if (type === 'slate')
    await page
      .locator('.blocks-chooser')
      .getByLabel('Unfold Text blocks', { exact: true })
      .click();
  await page
    .locator(
      `.blocks-chooser .${type === 'slate' ? 'text' : 'mostUsed'} .button.${type}`,
    )
    .getByText(label, { exact: true })
    .click();
}
test('As editor I can add a Grid', async ({ page }) => {
  await addColumn(page, 0, 'image', 'Image');
  await page.locator('.block.image .toolbar-inner .buttons').first().click();
  await page
    .locator('aside')
    .getByLabel('Select My Image', { exact: true })
    .dblclick();
  await addColumn(page, 1, 'slate', 'Text');
  await page
    .locator('.block.gridBlock.selected .slate-editor [contenteditable=true]')
    .fill('Colorless green ideas sleep furiously.');
  await save(page);
  await expect(page.locator('.block.gridBlock')).toContainText(
    'Colorless green ideas sleep furiously.',
  );
  await page.getByRole('link', { name: 'Edit', exact: true }).click();
  const grid = page.locator('.block.inner.gridBlock');
  await grid.click();
  await grid.locator('.block-editor-slate').click();
  await grid.getByLabel('Reset element 1', { exact: true }).click();
  await grid.getByLabel('Remove element 1', { exact: true }).click();
  await grid.getByLabel('Add element to container', { exact: true }).click();
  await addColumn(page, 1, 'teaser', 'Teaser');
  await page
    .locator(
      '.objectbrowser-field[aria-labelledby="fieldset-default-field-label-href"]',
    )
    .getByRole('button', { name: 'Open object browser' })
    .click();
  await page
    .locator('aside')
    .getByLabel('Select My Page', { exact: true })
    .dblclick();
  await save(page);
  await expect(page.locator('.block.gridBlock')).toContainText('My Page');
});
test('As editor I can add a Grid with slate block on it', async ({ page }) => {
  await addColumn(page, 1, 'slate', 'Text');
  await addTextLink(
    page,
    page.locator(
      '.block.gridBlock.selected .slate-editor [contenteditable=true]',
    ),
    'https://google.com',
  );
  await save(page);
  const paragraph = page.locator('.block.gridBlock.two p');
  await expect(paragraph).toHaveText('Colorless green ideas sleep furiously.');
  await expect(paragraph.locator('a')).toHaveAttribute(
    'href',
    'https://google.com',
  );
});
