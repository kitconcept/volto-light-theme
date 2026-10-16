import type { Locator } from '@playwright/test';
import { addBlockFromSlashMenu, save } from '../blocks';
import { createContent } from '../content';
import { login } from '../login';
import { expect, test } from '../test';

async function selectCell(cell: Locator) {
  const editor = cell.locator('[contenteditable=true]');
  await editor.click();
  await expect(cell.locator('.slate-editor')).toHaveClass(/\bselected\b/);
  await expect(editor).toBeFocused();
}

test.describe('Table Block Tests', () => {
  test.beforeEach(async ({ page }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    await login(page);
    await page.goto('/my-page');
    await page.getByRole('link', { name: 'Edit', exact: true }).click();
    await expect(page).toHaveURL('/my-page/edit');
  });

  test('Add table block', async ({ page }) => {
    await addBlockFromSlashMenu(page, 'slateTable', 'table');
    const table = page.locator('.celled.fixed.table');
    for (const [cell, text] of [
      ['thead tr th:nth-child(1)', 'column 1 / row 1'],
      ['thead tr th:nth-child(2)', 'column 2 / row 1'],
      ['tbody tr:nth-child(1) td:nth-child(1)', 'column 1 / row 2'],
      ['tbody tr:nth-child(1) td:nth-child(2)', 'column 2 / row 2'],
    ]) {
      const editor = table.locator(`${cell} [contenteditable="true"]`);
      await editor.click();
      await editor.pressSequentially(text);
      await expect(editor).toHaveText(text);
    }
    for (const action of [
      'Insert col after',
      'Insert row after',
      'Insert row before',
      'Insert col before',
    ]) {
      await page.locator(`button[title="${action}"]`).click();
    }
    await save(page);
    await expect(table.locator('thead th')).toHaveCount(4);
    await expect(table.locator('tbody tr')).toHaveCount(3);
    await expect(table.locator('thead th').nth(0)).toContainText(
      'column 1 / row 1',
    );
    await expect(table.locator('thead th').nth(2)).toContainText(
      'column 2 / row 1',
    );
    await expect(
      table.locator('tbody tr').nth(1).locator('td').nth(0),
    ).toContainText('column 1 / row 2');
    await expect(
      table.locator('tbody tr').nth(1).locator('td').nth(2),
    ).toContainText('column 2 / row 2');

    await page.goto('/my-page/edit');
    await expect(page.locator('#toolbar-save')).toBeVisible();
    const secondHeader = table.locator('thead th').nth(1);
    await expect(secondHeader).toBeVisible();
    await secondHeader.click();
    await selectCell(secondHeader);
    await page.locator('button[title="Delete col"]').click();
    await expect(table.locator('thead th')).toHaveCount(3);
    await selectCell(table.locator('thead th').nth(2));
    await page.locator('button[title="Delete col"]').click();
    await expect(table.locator('thead th')).toHaveCount(2);
    await selectCell(table.locator('tbody tr').nth(0).locator('td').first());
    await page.locator('button[title="Delete row"]').click();
    await expect(table.locator('tbody tr')).toHaveCount(2);
    await selectCell(table.locator('tbody tr').nth(1).locator('td').first());
    await page.locator('button[title="Delete row"]').click();
    await expect(table.locator('tbody tr')).toHaveCount(1);
    await save(page);
    await expect(table.locator('thead th')).toHaveCount(2);
    await expect(table.locator('tbody tr')).toHaveCount(1);
    await expect(table.locator('thead th').nth(0)).toContainText(
      'column 1 / row 1',
    );
    await expect(table.locator('thead th').nth(1).locator('p')).toHaveText(
      'column 2 / row 1',
    );
    await expect(table.locator('tbody tr td').nth(0)).toContainText(
      'column 1 / row 2',
    );
    await expect(table.locator('tbody tr td').nth(1)).toContainText(
      'column 2 / row 2',
    );
  });
});
