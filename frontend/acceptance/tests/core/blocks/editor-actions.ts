import type { Locator, Page } from '@playwright/test';
import { expect } from '../../test';
import { addBlockFromSlashMenu } from '../../blocks';

export async function chooseBlock(
  page: Page,
  type: string,
  label: string,
  section = 'mostUsed',
) {
  await page.locator('.block-add-button').first().click({ force: true });
  if (section === 'text' || section === 'common')
    await page
      .locator('.blocks-chooser .title')
      .getByText(section === 'text' ? 'Text' : 'Common', { exact: true })
      .click();
  await page
    .locator(`.blocks-chooser .${section} .button.${type}`)
    .getByText(label, { exact: true })
    .click();
  await expect(page.locator('.blocks-chooser')).toBeHidden();
}

export async function addTextLink(page: Page, editor: Locator, href: string) {
  await page.clock.install();
  await editor.click();
  await editor.pressSequentially('Colorless green ideas sleep furiously.');
  await expect(async () => {
    await editor.evaluate((element) => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        const start = node.textContent?.indexOf('furiously') ?? -1;
        if (start !== -1) {
          window.getSelection()?.setBaseAndExtent(node, start, node, start + 9);
          return;
        }
        node = walker.nextNode();
      }
      throw new Error('Cannot select the link text');
    });
    await expect(editor.locator('.highlight-selection')).toHaveText(
      'furiously',
      { timeout: 1000 },
    );
  }).toPass();
  await page.clock.runFor(200);
  await page
    .locator('.slate-inline-toolbar')
    .getByTitle('Add link', { exact: true })
    .click();
  const input = page.locator('.slate-toolbar .link-form-container input');
  await input.pressSequentially(href);
  await input.press('Enter');
  await expect(editor.locator('a')).toHaveText('furiously');
  await expect(editor.locator('a')).toHaveAttribute('href', href);
}

export async function routeMaps(page: Page) {
  await page.route(
    /^https:\/\/www\.(google\.com\/maps\/embed|openstreetmap\.org\/export\/embed)/,
    (route) => route.fulfill({ contentType: 'text/html', body: '' }),
  );
}

export async function addMap(page: Page) {
  await addBlockFromSlashMenu(page, 'maps');
  const input = page.locator('.block.maps .toolbar-inner .ui.input input');
  await input.fill(
    '<iframe src="https://www.google.com/maps/embed?pb=" width="600" height="450"></iframe>',
  );
  await input.press('Enter');
  await expect(page.locator('.block.maps iframe')).toHaveAttribute(
    'src',
    /google.com\/maps\/embed/,
  );
}
