import { expect, test } from '../../test';
import { addBlockFromSlashMenu, save } from '../../blocks';
import { fixturePath } from '../../fixtures';
import { openBlockEditor } from './editor';
import { pickSidebarButton } from './media';

test.use({ viewport: { width: 1536, height: 960 } });
for (const width of ['Layout', 'Full']) {
  test(`As editor I can add a (${width} width) Banner block`, async ({
    page,
  }) => {
    await openBlockEditor(page);
    await addBlockFromSlashMenu(page, 'banner');
    await page
      .locator('.block.banner input[type=file]')
      .setInputFiles(fixturePath('halfdome2022.jpg'));
    await page.locator('.field-wrapper-text #field-text').fill('Blue Orchids');
    await page
      .locator('.field-wrapper-additionalText #field-additionalText')
      .fill('are growing on the mountain tops');
    await pickSidebarButton(page, width);
    await save(page);
    await page.reload();
    const banner = page.locator('.block.banner');
    await expect(banner).toHaveClass(
      new RegExp(`has--block-width--${width.toLowerCase()}`),
    );
    await expect(
      banner.locator('.banner-inner-container .text p').nth(0),
    ).toHaveText('Blue Orchids');
    await expect(
      banner.locator('.banner-inner-container .text p').nth(1),
    ).toHaveText('are growing on the mountain tops');
  });
}
