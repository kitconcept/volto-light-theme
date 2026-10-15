import type { Locator, Page } from '@playwright/test';
import { expect } from '../../test';

export const externalImageURL =
  'https://github.com/plone/volto/raw/main/logos/volto-colorful.png';
export const youtubeURL = 'https://youtu.be/T6J3d35oIAY';
export const mp4URL = 'https://1.videolyser.de/videos/1714848/11745228_hd.mp4';

export async function routeExternalMedia(page: Page) {
  for (const url of [
    externalImageURL,
    '**/img.youtube.com/vi/T6J3d35oIAY/sddefault.jpg',
    '**/vumbnail.com/85804536.jpg',
  ]) {
    await page.route(url, (route) =>
      route.fulfill({
        path: 'acceptance/fixtures/image.png',
        contentType: 'image/png',
      }),
    );
  }
  // The source checks the configured video URL, not decoding or playback.
  await page.route(mp4URL, (route) => route.fulfill({ status: 204, body: '' }));
}

export async function pickSidebarButton(page: Page, name: string) {
  const input = page
    .locator('#sidebar .buttons-widget-option')
    .getByLabel(name, { exact: true });
  await expect(input).toBeEnabled();
  await input.click({ force: true });
  await expect(input).toBeChecked();
}

export async function expectBlockStyle(
  block: Locator,
  alignment: string,
  width: string,
) {
  await expect
    .poll(() =>
      block.evaluate((element: HTMLElement) => ({
        alignment: element.style.getPropertyValue('--block-alignment').trim(),
        width: element.style.getPropertyValue('--block-width').trim(),
      })),
    )
    .toEqual({ alignment, width });
}

export const centeredWidths = [
  ['Narrow', 'var(--narrow-container-width)'],
  ['Default', 'var(--default-container-width)'],
  ['Layout', 'var(--layout-container-width)'],
  ['Full', '100%'],
] as const;
