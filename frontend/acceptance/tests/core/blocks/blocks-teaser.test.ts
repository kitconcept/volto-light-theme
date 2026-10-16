import type { Page } from '@playwright/test';
import { expect, test } from '../../test';
import { createContent } from '../../content';
import { login } from '../../login';
import { addBlockFromSlashMenu, save } from '../../blocks';
import { createTeaserFixtures, expectLoadedImage } from '../../main/teaser';
import { externalImageURL, routeExternalMedia } from './media';

test.use({ viewport: { width: 1536, height: 960 } });
test.beforeEach(async ({ page }) => {
  await routeExternalMedia(page);
  await createTeaserFixtures(page);
  await createContent(page, {
    contentType: 'Document',
    contentId: 'blue-orchids',
    contentTitle: 'Blue Orchids',
    contentDescription: 'are growing on the mountain tops',
    path: '/document',
    bodyModifier: (body) => ({
      ...body,
      preview_image_link: { '@id': '/my-image' },
    }),
  });
  await login(page);
  await page.goto('/document');
  await page.getByRole('link', { name: 'Edit', exact: true }).click();
});
async function addTeaser(page: Page) {
  await addBlockFromSlashMenu(page, 'teaser');
  await page
    .locator(
      '.objectbrowser-field[aria-labelledby="fieldset-default-field-label-href"]',
    )
    .getByRole('button', { name: 'Open object browser' })
    .click();
  await page
    .locator('aside')
    .getByLabel('Select Blue Orchids', { exact: true })
    .dblclick();
  await expect(page.locator('#sidebar #field-overwrite')).toBeAttached();
}
async function changeTarget(page: Page, suffix: string, description?: string) {
  await page.goto('/document/blue-orchids');
  await page.getByRole('link', { name: 'Edit', exact: true }).click();
  const title = page.locator('.block.title [contenteditable=true]');
  await title.press('End');
  await title.pressSequentially(suffix);
  if (description) await page.locator('#field-description').fill(description);
  await save(page);
  await expect(page.locator('.documentFirstHeading')).toHaveText(
    `Blue Orchids${suffix}`,
  );
  await page.goto('/document');
}
test('As editor I can add a (standalone) Teaser block', async ({ page }) => {
  await addTeaser(page);
  const center = page.getByRole('radio', { name: 'Center', exact: true });
  await page.locator('label').filter({ has: center }).click();
  await expect(center).toBeChecked();
  await save(page);
  await page.reload();
  const teaser = page.locator('.block.teaser');
  await expect(teaser).toHaveClass(/has--align--center/);
  await expectLoadedImage(teaser.locator('.image-wrapper img'));
  await expect(teaser.locator('.card-summary .title')).toHaveText(
    'Blue Orchids',
  );
  await expect(teaser.locator('.card-summary p')).toHaveText(
    'are growing on the mountain tops',
  );
});
test('As editor I can add a (standalone) Teaser block that always fetches the live data', async ({
  page,
}) => {
  await addTeaser(page);
  await save(page);
  await expect(page.locator('.block.teaser .title')).toHaveText('Blue Orchids');
  await changeTarget(
    page,
    ' and Tulips',
    'are beautifully growing on the mountain tops',
  );
  await expect(page.locator('.block.teaser .title')).toHaveText(
    'Blue Orchids and Tulips',
  );
  await expect(page.locator('.block.teaser .card-summary p')).toHaveText(
    'are beautifully growing on the mountain tops',
  );
});
test('As editor I can create a Teaser block and overwrite the data which is is not updated when the target is changed', async ({
  page,
}) => {
  await addTeaser(page);
  await page.locator('label[for="field-overwrite"]').click();
  await expect(page.locator('#sidebar #field-overwrite')).toBeChecked();
  await page
    .locator('#sidebar-properties #field-title')
    .fill('Blue Orchids and Tulips');
  await save(page);
  await expect(page.locator('.block.teaser .title')).toHaveText(
    'Blue Orchids and Tulips',
  );
  await changeTarget(page, ' but no Tulips');
  await expect(page.locator('.block.teaser .title')).toHaveText(
    'Blue Orchids and Tulips',
  );
});
test('As editor I can add a Teaser block and override the data with an external image', async ({
  page,
}) => {
  await addTeaser(page);
  await page.locator('label[for="field-overwrite"]').click();
  await expect(page.locator('#sidebar #field-overwrite')).toBeChecked();
  const field = page.locator(
    '.objectbrowser-field[aria-labelledby="fieldset-default-field-label-preview_image"]',
  );
  await field.click();
  await page.keyboard.type(externalImageURL);
  await page.keyboard.press('Enter');
  await save(page);
  await expect(
    page.locator('.block.teaser .image-wrapper img'),
  ).toHaveAttribute('src', externalImageURL);
  await expectLoadedImage(page.locator('.block.teaser .image-wrapper img'));
  await expect(page.locator('.block.teaser .title')).toHaveText('Blue Orchids');
});
