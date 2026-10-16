import { expect, test } from '../../test';
import { openBlockEditor } from './editor';
import { chooseBlock } from './editor-actions';

test.beforeEach(async ({ page }) => {
  await openBlockEditor(page);
});
for (const [name, type, label, section, count] of [
  ['Text', 'slate', 'Text', 'text', 3],
  ['Highlight', 'highlight', 'Highlight', 'mostUsed', 2],
] as const) {
  test(`Pressing Enter on a focused ${name} block opens Slate editor or block chooser`, async ({
    page,
  }) => {
    await chooseBlock(page, type, label, section);
    if (type === 'slate') {
      const editor = page.locator('.block-editor-slate [contenteditable=true]').first();
      await editor.click();
      await expect(editor).toBeFocused();
      await editor.press('Enter');
    } else {
      await page.keyboard.press('Enter');
    }
    await expect(page.locator('.block-editor-slate')).toHaveCount(count);
  });
}
test('Pressing Enter on a focused Introduction Block opens new Introduction Block', async ({
  page,
}) => {
  await chooseBlock(page, 'introduction', 'Introduction');
  const editor = page.locator('.block.introduction [contenteditable=true]');
  await editor.click();
  await expect(editor).toBeFocused();
  await editor.press('Enter');
  await expect(page.locator('.block.introduction .slate-editor')).toHaveCount(
    2,
  );
});
