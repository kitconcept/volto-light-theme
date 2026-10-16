import { centeredWidths, expectBlockStyle, pickSidebarButton } from './media';
import { addMap, routeMaps } from './editor-actions';
import { openBlockEditor } from './editor';
import { addBlockFromSlashMenu, save } from '../../blocks';
import { createContent } from '../../content';
import { login } from '../../login';
import { expect, test } from '../../test';

test.describe('Map Block Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Only the configured iframe source is under test, not external map rendering.
    await page.route(
      /^https:\/\/www\.(google\.com\/maps\/embed|openstreetmap\.org\/export\/embed)/,
      (route) => route.fulfill({ contentType: 'text/html', body: '' }),
    );
    await createContent(page, {
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    await login(page);
    await page.goto('/my-page');
    await page.getByRole('link', { name: 'Edit', exact: true }).click();
    await expect(page).toHaveURL('/my-page/edit');
  });

  for (const { provider, embed, source } of [
    {
      provider: 'Google Maps',
      embed:
        '<iframe src="https://www.google.com/maps/embed?pb=" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
      source: /\/\/www.google.com\/maps\/embed\?pb=/,
    },
    {
      provider: 'OpenStreet Maps',
      embed:
        '<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=2.0408821105957036%2C41.2938013640244%2C2.2400093078613286%2C41.49109217223111&amp;layer=mapnik" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=13/41.3925/2.1404">View Larger Map</a></small>',
      source: /\/\/www.openstreetmap.org\/export\/embed/,
    },
  ]) {
    test(`Add maps block - ${provider}`, async ({ page }) => {
      await addBlockFromSlashMenu(page, 'maps');
      const input = page.locator('.block.maps .toolbar-inner .ui.input input');
      await input.fill(embed);
      await input.press('Enter');
      await expect(page.locator('.block.maps iframe')).toHaveAttribute(
        'src',
        source,
      );
      await save(page);
      await expect(page.locator('#page-document iframe')).toHaveAttribute(
        'src',
        source,
      );
      await page.reload();
      await expect(page.locator('#page-document iframe')).toHaveAttribute(
        'src',
        source,
      );
    });
  }
});

test.describe('Map block widths', () => {
  test.beforeEach(async ({ page }) => {
    await routeMaps(page);
    await openBlockEditor(page);
  });
  for (const [label, width] of centeredWidths) {
    test(`A centered map keeps the ${label.toLowerCase()} block width`, async ({
      page,
    }) => {
      await addMap(page);
      await pickSidebarButton(page, 'Center');
      await pickSidebarButton(page, label);
      await save(page);
      await expectBlockStyle(
        page.locator('.block.maps'),
        'var(--align-center)',
        width,
      );
    });
  }
  for (const alignment of ['Left', 'Right']) {
    test(`A ${alignment.toLowerCase()} aligned map floats and gets the default container width`, async ({
      page,
    }) => {
      await addMap(page);
      await pickSidebarButton(page, 'Full');
      await pickSidebarButton(page, alignment);
      if (alignment === 'Left')
        await expect(
          page.locator(
            '#sidebar .buttons-widget-option input[aria-label="Default"]',
          ),
        ).toBeDisabled();
      await save(page);
      await expectBlockStyle(
        page.locator('.block.maps'),
        `var(--align-${alignment.toLowerCase()})`,
        'var(--default-container-width)',
      );
    });
  }
});
