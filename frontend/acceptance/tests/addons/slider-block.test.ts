import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Page } from '@playwright/test';
import { expectNoAccessibilityViolations } from '../accessibility';
import { addBlockFromSlashMenu, save } from '../blocks';
import { createContent } from '../content';
import { login } from '../login';
import { selectInternalLink } from '../object-browser';
import { expect, test } from '../test';

async function addLinkedSlides(page: Page) {
  await page.goto('/document/edit');
  await addBlockFromSlashMenu(page, 'slider');

  const targetField = page.locator(
    '.olw-item-content.active .objectbrowser-field[aria-labelledby^="fieldset-default-field-label-href-0-"]',
  );
  await selectInternalLink(page, targetField, 'My Page');
  await page.getByText('Add item', { exact: true }).click();
  await selectInternalLink(page, targetField, 'My Page');
  await save(page);
  await page.reload();

  const slides = page.locator('#page-document .slider-slide');
  await expect(slides).toHaveCount(2);
  await expect(
    slides.first().getByRole('heading', { name: 'My Page', exact: true }),
  ).toBeVisible();
  await expect(
    slides.last().getByRole('heading', { name: 'My Page', exact: true }),
  ).toBeAttached();

  const image = slides.first().locator('.highlight-image-wrapper img');
  await expect(image).toBeVisible();
  await expect(image).toHaveJSProperty('complete', true);
  await expect
    .poll(() =>
      image.evaluate((element: HTMLImageElement) => element.naturalWidth),
    )
    .toBeGreaterThan(0);
}

test.describe('Slider Block Acceptance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Document',
    });
    const image = await readFile(
      path.resolve(__dirname, '../../fixtures/halfdome2022.jpg'),
    );
    await createContent(page, {
      contentType: 'Image',
      contentId: 'my-image',
      contentTitle: 'My Image',
      bodyModifier: (body) => ({
        ...body,
        image: {
          data: image.toString('base64'),
          encoding: 'base64',
          filename: 'halfdome2022.jpg',
          'content-type': 'image/jpeg',
        },
      }),
    });
    await createContent(page, {
      contentType: 'Document',
      contentId: 'page',
      contentTitle: 'My Page',
      bodyModifier: (body) => ({
        ...body,
        preview_image_link: { '@id': '/my-image' },
      }),
    });
    await login(page);
  });

  test('As editor I can add a Slider block', async ({ page }) => {
    await page.goto('/document/edit');
    await addBlockFromSlashMenu(page, 'slider');
    await save(page);
    await page.reload();
    await expect(page.locator('#page-document .block.slider')).toHaveCount(1);
  });

  test('As editor I can add a Slider block and teaser another content', async ({
    page,
  }) => {
    await addLinkedSlides(page);
  });

  test('a11y', async ({ page }) => {
    await addLinkedSlides(page);
    await expectNoAccessibilityViolations(page);
  });
});
