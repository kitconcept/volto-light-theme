import { expectNoAccessibilityViolations } from '../accessibility';
import { addBlockFromSlashMenu, save } from '../blocks';
import { createContent } from '../content';
import { login } from '../login';
import { expect, test } from '../test';

test.describe('Infobox Block Acceptance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Document',
    });
    await login(page);
  });

  test('As editor I can add an Infobox block', async ({ page }) => {
    await page.goto('/document/edit');
    await addBlockFromSlashMenu(page, 'infoboxBlock', 'infobox');

    const sidebar = page.locator('#sidebar-properties');
    await sidebar.locator('#field-title').fill('Apply now');
    await page
      .locator('.block.infoboxBlock .slate-editor [contenteditable=true]')
      .pressSequentially('Colorless green ideas sleep furiously.');
    await sidebar.locator('#field-buttonText').fill('Open positions');

    await save(page);
    await page.reload();

    const infobox = page.locator('#page-document .block.infoboxBlock');
    await expect(
      infobox.getByRole('heading', { name: 'Apply now' }),
    ).toBeVisible();
    await expect(infobox).toContainText(
      'Colorless green ideas sleep furiously.',
    );
    await expect(infobox.locator('.button')).toHaveText('Open positions');
    await expectNoAccessibilityViolations(page, {
      include: ['#page-document'],
    });
  });

  test('As editor I can align and theme an Infobox block', async ({ page }) => {
    await page.goto('/document/edit');
    await addBlockFromSlashMenu(page, 'infoboxBlock', 'infobox');

    const sidebar = page.locator('#sidebar-properties');
    await sidebar.locator('#field-title').fill('Aligned');
    await sidebar
      .locator('.field-wrapper-align label')
      .filter({ has: page.locator('input[aria-label="Right"]') })
      .click();
    // Both pickers are visually hidden radios inside their labels.
    await sidebar
      .locator('.field-wrapper-theme label')
      .filter({ has: page.locator('input[aria-label="Grey"]') })
      .click();

    await save(page);
    await page.reload();

    await expect(
      page.locator('#page-document .blocks-group-wrapper.grey .inner.right'),
    ).toBeVisible();
  });
});
