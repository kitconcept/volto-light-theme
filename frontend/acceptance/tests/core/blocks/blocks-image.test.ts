import type { Page } from '@playwright/test';
import { expect, test } from '../../test';
import { addBlockFromChooser, save } from '../../blocks';
import { expectLoadedImage } from '../../main/teaser';
import { openBlockEditor } from './editor';
import {
  centeredWidths,
  expectBlockStyle,
  externalImageURL,
  pickSidebarButton,
  routeExternalMedia,
} from './media';

async function uploadImage(page: Page) {
  await addBlockFromChooser(page, 'Image');
  await page
    .locator('.block-editor-image input[type=file]')
    .setInputFiles('acceptance/fixtures/image.png');
  const image = page.locator('.block.image img');
  await expect(image).toHaveAttribute('src', /\/image\.png\/@@images\/image-/);
  await expectLoadedImage(image);
}

test.describe('Image blocks', () => {
  test.beforeEach(async ({ page }) => {
    await routeExternalMedia(page);
    await openBlockEditor(page);
  });

  test('Add image block', async ({ page }) => {
    await addBlockFromChooser(page, 'Image');
    const focusTarget = page
      .locator('.block-editor-image [tabindex="0"]')
      .last();
    await focusTarget.focus();
    await expect(focusTarget).toBeFocused();
    await page
      .getByLabel('Enter a URL to an image', { exact: true })
      .filter({ visible: true })
      .click();
    const input = page.locator(
      '.ui.input.editor-link.input-anchorlink-theme input',
    );
    await input.fill(externalImageURL);
    await input.press('Enter');
    await save(page);
    const image = page.locator('#page-document img');
    await expect(image).toHaveAttribute('src', externalImageURL);
    await expectLoadedImage(image);
    await page.reload();
    await expect(image).toHaveAttribute('src', externalImageURL);
    await expectLoadedImage(image);
  });

  test('Add image via upload', async ({ page }) => {
    await uploadImage(page);
    await save(page);
    const image = page.locator('.block.image img');
    await expect(image).toHaveAttribute(
      'src',
      /\/my-page\/image\.png\/@@images\/image-/,
    );
    await expectLoadedImage(image);
    await page.reload();
    await expect(image).toHaveAttribute(
      'src',
      /\/my-page\/image\.png\/@@images\/image-/,
    );
    await expectLoadedImage(image);
  });

  test('Create a image block document in edit mode', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    await page.locator('#toolbar-add').click();
    await page.locator('#toolbar-add-document').click();
    await uploadImage(page);
  });

  test('Create an image block and initially alt attr is empty', async ({
    page,
  }) => {
    await uploadImage(page);
    const alt = page.locator(
      '#sidebar-properties .field-wrapper-alt input#field-alt',
    );
    await expect(alt).toHaveAttribute('value', '');
    await expect(alt).toHaveValue('');
  });

  for (const [label, width] of centeredWidths) {
    test(`A centered image keeps the ${label.toLowerCase()} block width`, async ({
      page,
    }) => {
      await uploadImage(page);
      await pickSidebarButton(page, 'Center');
      await pickSidebarButton(page, label);
      await save(page);
      await expectBlockStyle(
        page.locator('.block.image'),
        'var(--align-center)',
        width,
      );
    });
  }

  for (const alignment of ['Left', 'Right']) {
    test(`A ${alignment.toLowerCase()} aligned image floats and gets the default container width`, async ({
      page,
    }) => {
      await uploadImage(page);
      await pickSidebarButton(page, 'Full');
      await pickSidebarButton(page, alignment);
      if (alignment === 'Left') {
        await expect(
          page.locator(
            '#sidebar .buttons-widget-option input[aria-label="Default"]',
          ),
        ).toBeDisabled();
      }
      await save(page);
      await expectBlockStyle(
        page.locator('.block.image'),
        `var(--align-${alignment.toLowerCase()})`,
        'var(--default-container-width)',
      );
    });
  }

  test('A small floating image gets the narrow container width', async ({
    page,
  }) => {
    await uploadImage(page);
    await pickSidebarButton(page, 'Left');
    const small = page.getByRole('button', { name: 'Small', exact: true });
    await expect(small).toBeEnabled();
    await small.click();
    await save(page);
    await expectBlockStyle(
      page.locator('.block.image'),
      'var(--align-left)',
      'var(--narrow-container-width)',
    );
  });
});
