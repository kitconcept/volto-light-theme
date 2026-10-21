import { expect, test } from '../test';
import { login } from '../login';
import { createContent } from '../content';

test.describe('Navigation Acceptance Tests', () => {
  test.use({ viewport: { width: 1536, height: 960 } });

  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/');
    let path = '';
    for (let level = 1; level <= 3; level += 1) {
      await createContent(page, {
        contentType: 'Document',
        contentId: `level-${level}`,
        contentTitle: `Level ${level}`,
        path,
      });
      path += `/level-${level}`;
    }
    await page.goto('/');
  });

  test('includes 3rd level', async ({ page }) => {
    await page
      .locator('ul.desktop-menu')
      .getByRole('button')
      .filter({ hasText: /^Level 1$/ })
      .click();
    await expect(
      page.locator('#navigation').getByText('Level 2', { exact: true }),
    ).toBeVisible();
    await expect(
      page.locator('#navigation').getByText('Level 3', { exact: true }),
    ).toBeVisible();
  });

  test('Open 2nd level', async ({ page }) => {
    await page
      .locator('ul.desktop-menu')
      .getByRole('button')
      .filter({ hasText: /^Level 1$/ })
      .click();
    await page
      .locator('.subitem-wrapper')
      .getByText('Level 2', { exact: true })
      .click();
    await expect(page.locator('.documentFirstHeading')).toHaveText('Level 2');
  });

  test('Open 3rd level', async ({ page }) => {
    await page
      .locator('ul.desktop-menu')
      .getByRole('button')
      .filter({ hasText: /^Level 1$/ })
      .click();
    await page
      .locator('.subsubitem-wrapper')
      .getByText('Level 3', { exact: true })
      .click();
    await expect(page.locator('.documentFirstHeading')).toHaveText('Level 3');
  });
});
