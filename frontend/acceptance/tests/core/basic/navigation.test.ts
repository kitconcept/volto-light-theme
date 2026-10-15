import { expect, test } from '../../test';
import { createContent } from '../../content';
import { login } from '../../login';
import { logoutThroughToolbar } from './auth';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await createContent(page, {
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    await page.goto('/');
  });

  test('a private page disappears from navigation after logout', async ({
    page,
  }) => {
    const privatePage = page
      .locator('#navigation')
      .locator('li .item')
      .filter({ hasText: /^My Page$/ });
    await expect(privatePage).toBeVisible();
    await logoutThroughToolbar(page);
    await expect(privatePage).toHaveCount(0);
  });
});

test.describe('Navigation menu', () => {
  test.describe('menu hamburger', () => {
    for (const { name, width, height } of [
      { name: 'iphone-xr', width: 414, height: 896 },
      { name: 'ipad-mini', width: 768, height: 1024 },
    ]) {
      test(name, async ({ page }) => {
        await page.goto('/');
        await page.setViewportSize({ width, height });
        const hamburger = page
          .locator('.mobile-nav')
          .getByRole('button', { name: 'Open menu', exact: true });
        await expect(hamburger).toBeVisible();
        await hamburger.click();
        await expect(
          page
            .locator('.mobile-nav')
            .getByRole('button', { name: 'Close menu', exact: true }),
        ).toHaveAttribute('aria-expanded', 'true');
        await expect(page.locator('nav.navigation li .item.active')).toHaveText(
          'Home',
        );
        await expect(
          page.locator('.mobile-nav .sections > li.header a'),
        ).toBeVisible();
        await expect(
          page.locator('.mobile-nav .sections > li.header a'),
        ).toHaveText('Home');
        await expect(page.locator('body')).toHaveCSS('overflow', 'visible');
      });
    }
  });
});
