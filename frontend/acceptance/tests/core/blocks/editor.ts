import type { Page } from '@playwright/test';
import { expect } from '../../test';
import { login } from '../../login';
import { createContent } from '../../content';

export async function openBlockEditor(page: Page) {
  await login(page);
  await createContent(page, {
    contentType: 'Document',
    contentId: 'my-page',
    contentTitle: 'My Page',
  });
  await page.goto('/my-page');
  await page.getByRole('link', { name: 'Edit', exact: true }).click();
  await expect(page).toHaveURL('/my-page/edit');
  await expect(page.locator('.block-editor-title [role=textbox]')).toHaveText(
    'My Page',
  );
}

export async function expectNewFocusedTextBlock(page: Page) {
  const blocks = page.locator('*[class*="block-editor-"]');
  const newBlock = blocks.nth(2);
  await expect(newBlock).toHaveClass(/block-editor-slate/);
  await expect(newBlock.locator('.block.selected')).toBeVisible();
  await expect(newBlock.locator('[contenteditable=true]')).toBeFocused();
}
