import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Locator, Page } from '@playwright/test';
import { createContent } from '../content';
import { expect } from '../test';

export async function createTeaserFixtures(page: Page) {
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
}

export async function expectLoadedImage(image: Locator) {
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute('src', /.+/);
  await expect
    .poll(() =>
      image.evaluate(
        (element: HTMLImageElement) =>
          element.naturalWidth > 0 && element.naturalHeight > 0,
      ),
    )
    .toBe(true);
}
