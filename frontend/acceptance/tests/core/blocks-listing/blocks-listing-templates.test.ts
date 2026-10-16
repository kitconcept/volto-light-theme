import type { Page } from '@playwright/test';
import { expect, test } from '../../test';
import { createContent } from '../../content';
import { login } from '../../login';
import { addBlockFromSlashMenu, save } from '../../blocks';
import { expectLoadedImage } from '../../main/teaser';
import {
  child,
  variation,
  typeCriterion,
  relativeLocation,
  expectServerMarkup,
} from './listing';

test.beforeEach(async ({ page }) => {
  await createContent(page, {
    contentType: 'Document',
    contentId: 'my-folder',
    contentTitle: 'My Folder',
  });
  await child(page, 'my-document', 'My Document', 'Document', 'my-folder');
  await login(page);
  await page.goto('/my-folder/my-document');
});
async function addListing(page: Page, kind: string) {
  await page.getByRole('link', { name: 'Edit', exact: true }).click();
  await addBlockFromSlashMenu(page, 'listing');
  await variation(page, kind);
}
test('Should render Summary template', async ({ page }) => {
  await child(page, 'my-image', 'My Image', 'Image', 'my-folder/my-document');
  await addListing(page, 'summary');
  await save(page);
  const image = page.locator('.listing-item img');
  await expect(image).toHaveAttribute(
    'src',
    /\/my-folder\/my-document\/my-image\/@@images\/image-/,
  );
  await expectLoadedImage(image);
  await page.getByRole('link', { name: 'Edit', exact: true }).click();
  await page.locator('.block-editor-listing').click();
  await typeCriterion(page, 'Image');
  await save(page);
  await expectServerMarkup(page, '.listing-item', 'My Image');
});
test('Summary listing should render default preview images', async ({
  page,
}) => {
  await child(
    page,
    'my-document',
    'My Document',
    'Document',
    'my-folder/my-document',
  );
  await addListing(page, 'summary');
  await save(page);
  const image = page.locator('.listing-item img');
  await expect(image).toHaveAttribute('src', /\/static\/media\/default-image/);
  await expectLoadedImage(image);
  await page.getByRole('link', { name: 'Edit', exact: true }).click();
  await page.locator('.block-editor-listing').click();
  await typeCriterion(page, 'Page');
  await relativeLocation(page);
  await save(page);
  await expectServerMarkup(page, '.listing-item', 'My Document');
});
test('Should render Image gallery listing view', async ({ page }) => {
  await child(page, 'my-image', 'My Image', 'Image', 'my-folder/my-document');
  await addListing(page, 'imageGallery');
  await save(page);
  await expect(page.locator('.image-gallery-play-button')).toHaveAttribute(
    'aria-label',
    'Play or Pause Slideshow',
  );
  await expectLoadedImage(
    page.locator('.image-gallery-slides img.image-gallery-image').first(),
  );
  await page.getByRole('link', { name: 'Edit', exact: true }).click();
  await page.locator('.block-editor-listing').click();
  await relativeLocation(page);
  await save(page);
  await expectServerMarkup(page, '.image-gallery-slides .image-gallery-image');
});
test('Should render image gallery in edit mode', async ({ page }) => {
  await child(page, 'my-image', 'My Image', 'Image', 'my-folder/my-document');
  await addListing(page, 'imageGallery');
  await expect(page.locator('.image-gallery-play-button')).toHaveAttribute(
    'aria-label',
    'Play or Pause Slideshow',
  );
  await expectLoadedImage(
    page.locator('.image-gallery-slides img.image-gallery-image').first(),
  );
});
