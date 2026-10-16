import type { Page } from '@playwright/test';
import { expect, test } from '../../test';
import { addBlockFromChooser, save } from '../../blocks';
import { expectLoadedImage } from '../../main/teaser';
import { openBlockEditor } from './editor';
import {
  centeredWidths,
  expectBlockStyle,
  externalImageURL,
  mp4URL,
  pickSidebarButton,
  routeExternalMedia,
  youtubeURL,
} from './media';

async function addVideo(page: Page, url = youtubeURL) {
  await addBlockFromChooser(page, 'Video');
  const input = page
    .locator('.toolbar-inner > .ui > input')
    .filter({ visible: true });
  await input.click();
  await input.fill(url);
  await input.press('Enter');
}

test.describe('Video blocks', () => {
  test.beforeEach(async ({ page }) => {
    await routeExternalMedia(page);
    await openBlockEditor(page);
  });

  const providers = [
    ['YouTube', youtubeURL, '//img.youtube.com/vi/T6J3d35oIAY/sddefault.jpg'],
    ['YouTube Video and Placeholder', youtubeURL, externalImageURL],
    ['Vimeo', 'https://vimeo.com/85804536', '//vumbnail.com/85804536.jpg'],
    ['MP4', mp4URL, mp4URL],
  ] as const;

  for (const [provider, url, source] of providers) {
    test(`Add Video Block with ${provider}${provider.includes('Placeholder') ? '' : ' Video'}`, async ({
      page,
    }) => {
      await addVideo(page, url);
      if (provider.includes('Placeholder')) {
        await page
          .locator('#field-preview_image')
          .last()
          .fill(externalImageURL);
      }
      await save(page);
      const media = page.locator(
        provider === 'MP4'
          ? '.block.video video'
          : '.block.video img.placeholder',
      );
      const expectedSource =
        provider === 'MP4' || provider.includes('Placeholder')
          ? source
          : new RegExp(source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      await expect(media).toHaveAttribute('src', expectedSource);
      if (provider !== 'MP4') await expectLoadedImage(media);
      await page.reload();
      await expect(media).toHaveAttribute('src', expectedSource);
      if (provider !== 'MP4') await expectLoadedImage(media);
    });
  }

  for (const [label, width] of centeredWidths) {
    test(`A centered video keeps the ${label.toLowerCase()} block width`, async ({
      page,
    }) => {
      await addVideo(page);
      await pickSidebarButton(page, 'Center');
      await pickSidebarButton(page, label);
      await save(page);
      await expectBlockStyle(
        page.locator('.block.video'),
        'var(--align-center)',
        width,
      );
    });
  }

  for (const alignment of ['Left', 'Right']) {
    test(`A ${alignment.toLowerCase()} aligned video floats and gets the default container width`, async ({
      page,
    }) => {
      await addVideo(page);
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
        page.locator('.block.video'),
        `var(--align-${alignment.toLowerCase()})`,
        'var(--default-container-width)',
      );
    });
  }
});
