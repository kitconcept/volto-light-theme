import type { Page } from '@playwright/test';
import { expectNoAccessibilityViolations } from '../accessibility';
import { addBlockFromSlashMenu, save } from '../blocks';
import { createContent } from '../content';
import { login } from '../login';
import { expect, test } from '../test';

// Fieldsets may start expanded; clicking an open one would collapse it.
async function openStylingFieldset(page: Page) {
  const styling = page
    .locator('#sidebar-properties .accordion .title')
    .filter({ hasText: 'Styling' });
  if (!(await styling.evaluate((el) => el.classList.contains('active')))) {
    await styling.click();
  }
}

function infoboxBlock({
  title,
  text,
  align,
  theme,
}: {
  title: string;
  text: string;
  align: 'left' | 'center' | 'right';
  theme: 'default' | 'grey';
}) {
  return {
    '@type': 'infoboxBlock',
    title,
    align,
    theme,
    icon: [{ '@id': '/infobox-icon', image_field: 'image', title: 'Icon' }],
    value: [{ type: 'p', children: [{ text }] }],
    plaintext: text,
    buttonText: `More about ${title}`,
    buttonLink: [{ '@id': '/document', title: 'Document' }],
  };
}

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

  test('As editor I can add a new paragraph in an Infobox block with Enter', async ({
    page,
  }) => {
    await page.goto('/document/edit');
    await addBlockFromSlashMenu(page, 'infoboxBlock', 'infobox');

    const editor = page.locator(
      '.block.infoboxBlock .slate-editor [contenteditable=true]',
    );
    await editor.pressSequentially('First paragraph');
    await editor.press('Enter');
    await editor.pressSequentially('Second paragraph');

    // Enter must stay in the infobox instead of moving to the next block.
    await expect(editor.locator('p')).toHaveCount(2);
    await expect(editor).toContainText('Second paragraph');

    await save(page);
    await page.reload();

    const paragraphs = page.locator(
      '#page-document .block.infoboxBlock .info-text p',
    );
    await expect(paragraphs).toHaveText([
      'First paragraph',
      'Second paragraph',
    ]);
  });

  test('As editor I can align and theme an Infobox block', async ({ page }) => {
    await page.goto('/document/edit');
    await addBlockFromSlashMenu(page, 'infoboxBlock', 'infobox');

    const sidebar = page.locator('#sidebar-properties');
    await sidebar.locator('#field-title').fill('Aligned');
    await openStylingFieldset(page);
    // Both pickers are visually hidden radios inside their labels.
    await sidebar
      .locator('.field-wrapper-align label')
      .filter({ has: page.locator('input[aria-label="Right"]') })
      .click();
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

  test('Infobox blocks in all alignments and themes are accessible', async ({
    page,
  }) => {
    await createContent(page, {
      contentType: 'Image',
      contentId: 'infobox-icon',
      contentTitle: 'Icon',
    });
    const variants = [
      { title: 'Left', align: 'left', theme: 'default' },
      { title: 'Center', align: 'center', theme: 'grey' },
      { title: 'Right', align: 'right', theme: 'default' },
      { title: 'Grey right', align: 'right', theme: 'grey' },
    ] as const;
    await createContent(page, {
      contentType: 'Document',
      contentId: 'infoboxes',
      contentTitle: 'Infoboxes',
      bodyModifier: (body) => {
        const blocks = body.blocks as Record<string, unknown>;
        const layout = body.blocks_layout as { items: string[] };
        variants.forEach((variant, index) => {
          const id = `infobox-${index}`;
          blocks[id] = infoboxBlock({
            ...variant,
            text: `${variant.title} infobox text.`,
          });
          layout.items.push(id);
        });
        return body;
      },
    });

    await page.goto('/infoboxes', { waitUntil: 'networkidle' });

    const infoboxes = page.locator('#page-document .block.infoboxBlock');
    await expect(infoboxes).toHaveCount(variants.length);

    for (const { title } of variants) {
      const infobox = infoboxes.filter({
        has: page.getByRole('heading', { level: 2, name: title, exact: true }),
      });
      await expect(infobox).toHaveCount(1);
      // The icon is decorative; the title carries the meaning.
      await expect(infobox.locator('img.icon')).toHaveAttribute('alt', '');
      await expect(
        infobox.getByRole('link', { name: `More about ${title}` }),
      ).toHaveAttribute('href', '/document');
    }

    // The call-to-action links are reachable by keyboard.
    const firstLink = infoboxes
      .first()
      .getByRole('link', { name: 'More about Left' });
    await firstLink.focus();
    await expect(firstLink).toBeFocused();

    await expectNoAccessibilityViolations(page, {
      include: ['#page-document'],
    });
  });
});
