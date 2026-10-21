import type { Page } from '@playwright/test';
import { addBlockFromChooser, save } from '../blocks';
import { createContent } from '../content';
import { login } from '../login';
import { expect, test } from '../test';
import { createTeaserFixtures, expectLoadedImage } from './teaser';

async function configureSlides(page: Page) {
  await page.goto('/document/edit');
  await addBlockFromChooser(page, 'Slider');
  const variation = page.locator('#field-variation');
  await variation.click();
  await variation.pressSequentially('simple');
  await variation.press('Enter');
  const active = page.locator('.olw-item-content.active');
  const target = active.locator(
    '.objectbrowser-field[aria-labelledby^="fieldset-default-field-label-href-0-"]',
  );
  await target.getByRole('button', { name: 'Open object browser' }).click();
  await page
    .locator('aside')
    .getByLabel('Select Blue Orchids', { exact: true })
    .dblclick();
  await expect(page.locator('aside')).toHaveCount(0);
  await active.locator('[id^="field-head_title-1-"]').fill('Kicker');
  await active.locator('[id^="field-buttonText-5-"]').fill('Button text');
  const hideButton = active.locator('[id^="field-hideButton-6-"]');
  await hideButton.check({ force: true });
  await expect(hideButton).toBeChecked();
  await hideButton.uncheck({ force: true });
  await expect(hideButton).not.toBeChecked();
  for (const alignment of ['Right', 'Left']) {
    const radio = page.locator(
      `[class*="field-wrapper-flagAlign-"] input[aria-label="${alignment}"]`,
    );
    await radio.check({ force: true });
    await expect(radio).toBeChecked();
  }

  await page.locator('.add-item-button-wrapper button').click();
  await expect(
    page.getByLabel('Collapse item #2', { exact: true }),
  ).toBeVisible();
  await target.getByRole('button', { name: 'Open object browser' }).click();
  await page
    .locator('aside')
    .getByLabel('Select Blue Orchids', { exact: true })
    .dblclick();
  await expect(page.locator('aside')).toHaveCount(0);
  await active.locator('[id^="field-title-2-"]').fill('Override Title');
  await active
    .locator('[id^="field-description-3-"]')
    .fill('Override Description');
  await active
    .locator(
      '.objectbrowser-field[aria-labelledby^="fieldset-default-field-label-preview_image-4-"]',
    )
    .getByRole('button', { name: 'Open object browser' })
    .click();
  await page
    .locator('aside')
    .getByLabel('Select My Image', { exact: true })
    .dblclick();
  await expect(page.locator('aside')).toHaveCount(0);
  await expect(active.locator('[id^="field-title-2-"]')).toHaveValue(
    'Override Title',
  );
  await expect(active.locator('[id^="field-description-3-"]')).toHaveValue(
    'Override Description',
  );
}

test.describe('Blocks Acceptance Tests - slider variants', () => {
  test.use({ viewport: { width: 1536, height: 960 } });

  test.beforeEach(async ({ page }) => {
    await createTeaserFixtures(page);
    await login(page);
    await page.goto('/');
    await createContent(page, {
      contentType: 'Image',
      contentId: 'my-image',
      contentTitle: 'My Image',
      path: '/document',
    });
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
  });

  test('As editor I can add a simple side variant slider block', async ({
    page,
  }) => {
    await configureSlides(page);
    await save(page);
    await page.reload();
    const slides = page.locator('.slider-container .slider-slide');
    await expect(slides).toHaveCount(2);
    const first = slides.first();
    await expectLoadedImage(first.locator('.highlight-image-wrapper img'));
    await expect(first.locator('.title .supertitle')).toHaveText('Kicker');
    await expect(first.locator('.title .supertitle')).toBeVisible();
    await expect(first.locator('.title h2')).toHaveText('Blue Orchids');
    await expect(first.locator('.title h2')).toBeVisible();
    await expect(first.locator('p')).toHaveText(
      'are growing on the mountain tops',
    );
    await expect(first.locator('p')).toBeVisible();
    await expect(
      first.getByRole('button', { name: 'Button text', exact: true }),
    ).toBeVisible();
    await page.locator('.slider-button.slider-button-next').click();
    const second = slides.nth(1);
    await expect(second.locator('.title h2')).toHaveText('Override Title');
    await expect(second.locator('.title h2')).toBeVisible();
    await expect(second.locator('p')).toHaveText('Override Description');
    await expect(second.locator('p')).toBeVisible();
    await expect(
      second.getByRole('button', { name: 'Continue reading', exact: true }),
    ).toBeVisible();
    const image = second.locator('.highlight-image-wrapper img');
    await expect(image).toHaveAttribute('src', /\/document\/my-image\//);
    await expectLoadedImage(image);
  });

  test('As editor I can refresh the slider block content', async ({ page }) => {
    await configureSlides(page);
    await page.locator('.refresh.slider button').click();
    const active = page.locator('.olw-item-content.active');
    await expect(active.locator('[id^="field-title-2-"]')).toBeVisible();
    await expect(active.locator('[id^="field-title-2-"]')).toHaveValue(
      'Blue Orchids',
    );
    await expect(active.locator('[id^="field-description-3-"]')).toBeVisible();
    await expect(active.locator('[id^="field-description-3-"]')).toHaveValue(
      'are growing on the mountain tops',
    );
    await save(page);
  });
});
