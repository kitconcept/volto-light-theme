import type { Locator, Page } from '@playwright/test';
import { save } from '../blocks';
import { createContent } from '../content';
import { login } from '../login';
import { expect, test } from '../test';

const HTML_TABLE = `
<meta charset="utf-8">
<table>
  <tbody>
    <tr><th>Name</th><th>Amount</th></tr>
    <tr><td>Apples</td><td>3</td></tr>
    <tr><td>Pears</td><td>5</td></tr>
  </tbody>
</table>`;

const TSV_TABLE = 'Name\tAmount\nApples\t3\nPears\t5\n';

// Puts the data on the system clipboard and pastes it with the keyboard, so
// the browser goes through its real paste path (`beforeinput` with a
// `DataTransfer` in Chrome), as it does for a user.
async function paste(
  editor: Locator,
  clipboard: { 'text/html'?: string; 'text/plain'?: string },
) {
  await editor
    .page()
    .context()
    .grantPermissions(['clipboard-read', 'clipboard-write']);
  await editor.page().evaluate(async (items) => {
    await navigator.clipboard.write([
      new ClipboardItem(
        Object.fromEntries(
          Object.entries(items).map(([type, data]) => [
            type,
            new Blob([data], { type }),
          ]),
        ),
      ),
    ]);
  }, clipboard);
  await editor.press('ControlOrMeta+v');
}

const textEditor = (page: Page) =>
  page.locator('.block-editor-slate [contenteditable=true]').first();

async function expectPastedTable(page: Page) {
  const tableBlock = page.locator('.block-editor-slateTable');
  await expect(tableBlock).toHaveCount(1);
  await expect(page.locator('.block-editor-slate table')).toHaveCount(0);

  for (const text of ['Name', 'Amount', 'Apples', '3', 'Pears', '5']) {
    await expect(tableBlock.getByText(text, { exact: true })).toBeVisible();
  }
}

test.describe('Pasting tables into a Text block', () => {
  test.beforeEach(async ({ page }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    await login(page);
    await page.goto('/my-page/edit');
    await expect(page.locator('#toolbar-save')).toBeVisible();
  });

  test('An HTML table pasted into an empty Text block becomes a Table block', async ({
    page,
  }) => {
    const editor = textEditor(page);
    await editor.click();
    await paste(editor, { 'text/html': HTML_TABLE, 'text/plain': TSV_TABLE });

    await expectPastedTable(page);

    await save(page);
    const table = page.locator('.block.slate-table table');
    await expect(table).toBeVisible();
    await expect(table.locator('tr')).toHaveCount(3);
  });

  test('An HTML table pasted into the middle of a Text block splits it', async ({
    page,
  }) => {
    const editor = textEditor(page);
    await editor.click();
    await editor.pressSequentially('Before after');
    for (let i = 0; i < 'after'.length; i++) {
      await editor.press('ArrowLeft');
    }
    await paste(editor, { 'text/html': HTML_TABLE, 'text/plain': TSV_TABLE });

    await expectPastedTable(page);

    // The text before the cursor, the table, then the text after it
    const blocks = page.locator(
      '.block-editor-slate, .block-editor-slateTable',
    );
    await expect(blocks.nth(0).locator('[contenteditable=true]')).toHaveText(
      /^Before\s*$/,
    );
    await expect(blocks.nth(1)).toHaveClass(/block-editor-slateTable/);
    await expect(blocks.nth(2).locator('[contenteditable=true]')).toHaveText(
      'after',
    );
  });

  test('Tab-separated text becomes a Table block', async ({ page }) => {
    const editor = textEditor(page);
    await editor.click();
    await paste(editor, { 'text/plain': TSV_TABLE });

    await expectPastedTable(page);
  });

  test('Plain text without tabs stays in the Text block', async ({ page }) => {
    const editor = textEditor(page);
    await editor.click();
    await paste(editor, { 'text/plain': 'Just some text' });

    await expect(page.locator('.block-editor-slateTable')).toHaveCount(0);
    await expect(textEditor(page)).toHaveText('Just some text');
  });
});
