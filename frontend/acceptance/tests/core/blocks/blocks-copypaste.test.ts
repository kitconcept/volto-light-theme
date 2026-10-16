import { expect, test } from '../../test';
import { save } from '../../blocks';
import { openBlockEditor } from './editor';
import { addMap, routeMaps } from './editor-actions';

test.beforeEach(async ({ page }) => {
  await routeMaps(page);
  await openBlockEditor(page);
  await addMap(page);
  await page
    .locator('.block.slate [contenteditable=true]')
    .fill('Noam Avram Chomsky');
  await save(page);
  await page.getByRole('link', { name: 'Edit', exact: true }).click();
});
for (const [action, count] of [
  ['Copy', 2],
  ['Cut', 1],
  ['Delete', 0],
] as const) {
  test(
    action === 'Delete'
      ? 'Delete multiple blocks'
      : `${action}/paste multiple blocks`,
    async ({ page }) => {
      const title = page.locator('.block-editor-title [contenteditable=true]');
      await title.click();
      await page.keyboard.down('Shift');
      await page.locator('.block-editor-maps').click();
      await page.keyboard.up('Shift');
      await page.locator(`#toolbar-${action.toLowerCase()}-blocks`).click();
      if (action !== 'Delete') {
        await page
          .locator('.block-editor-slate [contenteditable=true]')
          .last()
          .click();
        await page.locator('#toolbar-paste-blocks').click();
      }
      await expect(page.locator('.documentFirstHeading')).toHaveCount(count);
      await expect(page.locator('.block-editor-maps')).toHaveCount(count);
    },
  );
}
