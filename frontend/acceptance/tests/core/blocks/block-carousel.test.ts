import { expect, test } from '../../test';
import { createContent } from '../../content';
import { login } from '../../login';
import { addBlockFromChooser, save } from '../../blocks';
import { createTeaserFixtures, expectLoadedImage } from '../../main/teaser';

test.use({ viewport: { width: 1536, height: 960 } });
test('As editor I can add a carousel block', async ({ page }) => {
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
  await page.goto('/document/edit');
  await addBlockFromChooser(page, 'Carousel');
  await page
    .locator('.field-wrapper-columns .add-item-button-wrapper')
    .getByRole('button', { name: 'Add item' })
    .click();
  const items = page.locator('.olw-item-wrapper');
  await expect(items).toHaveCount(5);
  for (let i = 0; i < 5; i++) {
    await items.nth(i).locator('.olw-item-title-bar').click();
    await page
      .locator(
        '.olw-item-wrapper.active .objectbrowser-field[aria-labelledby^="fieldset-default-field-label-href-0-"]',
      )
      .getByRole('button', { name: 'Open object browser' })
      .click();
    await page
      .locator('aside')
      .getByLabel('Select Blue Orchids', { exact: true })
      .dblclick();
  }
  await page.locator('#field-headline').fill('Carousel Block');
  const count = page.locator('#field-items_to_show');
  await count.click();
  await page
    .locator('.react-select__option')
    .getByText('2', { exact: true })
    .click();
  const hide = page.locator('#field-hide_description');
  await hide.check({ force: true });
  await expect(hide).toBeChecked();
  await hide.uncheck({ force: true });
  await save(page);
  await expect(page.locator('h2.headline')).toHaveText('Carousel Block');
  const cards = page.locator('.block.carousel .block.teaser');
  await expect(cards).toHaveCount(5);
  await expectLoadedImage(cards.first().locator('.image-wrapper img'));
  await expect(cards.first().locator('.card-summary .title')).toHaveText(
    'Blue Orchids',
  );
  await expect(cards.first().locator('.card-summary p')).toHaveText(
    'are growing on the mountain tops',
  );
  const dots = page.locator('.carousel-dots button');
  for (let i = 0; i < (await dots.count()); i++) await dots.nth(i).click();
  await page.getByRole('link', { name: 'Edit', exact: true }).click();
  await page
    .locator('.block-editor-carousel')
    .click({ position: { x: 1, y: 1 } });
  await page.locator('#field-hide_description').check({ force: true });
  await expect(
    page.locator('.block.teaser .card-summary').first(),
  ).not.toContainText('are growing on the mountain tops');
  await expect(
    page.locator('.block.teaser .card-summary .title').first(),
  ).toHaveText('Blue Orchids');
});
