import { addBlockFromChooser, save } from '../blocks';
import { createContent } from '../content';
import { login } from '../login';
import { expect, test } from '../test';
import { createTeaserFixtures, expectLoadedImage } from './teaser';

test.describe('Blocks Acceptance Tests - teaser types', () => {
  test.use({ viewport: { width: 1536, height: 960 } });

  test.beforeEach(async ({ page }) => {
    await createTeaserFixtures(page);
    await login(page);
    await page.goto('/');
  });

  for (const contentType of ['Document', 'Event', 'News Item', 'File']) {
    test(`As editor I can add a (standalone) Teaser block for ${contentType === 'Event' ? 'an' : 'a'} ${contentType}`, async ({
      page,
    }) => {
      await createContent(page, {
        contentType,
        contentId: 'blue-orchids',
        contentTitle: 'Blue Orchids',
        contentDescription: 'are growing on the mountain tops',
        path: '/document',
        transition: contentType === 'News Item' ? 'publish' : '',
        bodyModifier: (body) => ({
          ...body,
          preview_image_link: { '@id': '/my-image' },
        }),
      });
      await page.goto('/document/edit');
      await addBlockFromChooser(page, 'Teaser');
      await page
        .locator(
          '.objectbrowser-field[aria-labelledby="fieldset-default-field-label-href"]',
        )
        .getByRole('button', { name: 'Open object browser' })
        .click();
      await page.getByLabel('Select Blue Orchids', { exact: true }).dblclick();
      const center = page.getByRole('radio', { name: 'Center', exact: true });
      await page.locator('label').filter({ has: center }).click();
      await expect(center).toBeChecked();
      await save(page);
      await page.reload();

      const teaser = page.locator('.block.teaser');
      await expect(teaser).toHaveClass(/\bhas--align--center\b/);
      await expect(teaser.locator('.card-summary .title')).toContainText(
        'Blue Orchids',
      );
      if (contentType === 'Document') {
        await expectLoadedImage(teaser.locator('.image-wrapper img'));
      }
      if (['Event', 'News Item'].includes(contentType)) {
        await expect(teaser.locator('.headline .day')).toBeAttached();
      }
      if (contentType !== 'Event') {
        await expect(teaser.locator('.card-summary p')).toContainText(
          'are growing on the mountain tops',
        );
      }
    });
  }
});
