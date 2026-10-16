import { expect, test } from '../../test';
import { save } from '../../blocks';
import { openBlockEditor } from './editor';
import { addTextLink } from './editor-actions';

test.beforeEach(async ({ page }) => {
  await openBlockEditor(page);
});
test('As editor I can add a text block', async ({ page }) => {
  await page.locator('.block.slate [contenteditable=true]').fill('My text');
  await save(page);
  await expect(page.locator('#page-document p')).toContainText('My text');
});
for (const [name, href] of [
  ['link', 'https://google.com'],
  ['mailto link', 'mailto:hello@example.com'],
]) {
  test(`As editor I can add a ${name} to a text block`, async ({ page }) => {
    await addTextLink(
      page,
      page.locator('.block.slate [contenteditable=true]'),
      href,
    );
    await save(page);
    const paragraph = page.locator('main .blocks-group-wrapper p');
    await expect(paragraph).toHaveText(
      'Colorless green ideas sleep furiously.',
    );
    await expect(paragraph.locator('a')).toHaveText('furiously');
    await expect(paragraph.locator('a')).toHaveAttribute('href', href);
  });
}
