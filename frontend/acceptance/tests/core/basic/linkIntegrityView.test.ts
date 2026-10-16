import type { Page } from '@playwright/test';
import { createContent } from '../../content';
import { login } from '../../login';
import {
  blockRelations,
  createBlockRelation,
  createRichtextRelation,
  documentTarget,
  imageTarget,
  richtextTargets,
} from '../../relations';
import { expect, test } from '../../test';

async function expectReferrer(
  page: Page,
  target: { contentId: string; contentTitle: string },
  referrer: { contentId: string; contentTitle: string },
) {
  const relations = page.waitForResponse((response) => {
    const url = new URL(response.url());
    return (
      response.request().method() === 'GET' &&
      url.pathname.endsWith('/@relations') &&
      url.searchParams.get('target') === `/${target.contentId}`
    );
  });
  await page.goto(`/${target.contentId}/links-to-item`);
  expect((await relations).ok()).toBeTruthy();
  const summary = page.locator('#linkstoitem .primary');
  await expect(summary).toHaveText(
    `Content that links to or references ${target.contentTitle}`,
  );
  await expect(summary.locator('q')).toHaveText(target.contentTitle);
  const row = page.getByRole('row').filter({
    has: page.getByRole('link', { name: referrer.contentTitle, exact: true }),
  });
  await expect(row).toHaveCount(1);
  await expect(
    row.getByRole('link', { name: referrer.contentTitle, exact: true }),
  ).toHaveAttribute('href', `/${referrer.contentId}`);
}

test.describe('Link Integrity View for different content types', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('as editor I can access Links and references via the left toolbar', async ({
    page,
  }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'my-document',
      contentTitle: 'My Document',
    });
    await page.goto('/my-document');
    await page.locator('#toolbar-more').click();
    await page.getByText('Links and references', { exact: true }).click();
    await expect(page).toHaveURL('/my-document/links-to-item');
    await expect(page.locator('#linkstoitem .primary')).toHaveText(
      'Content that links to or references My Document',
    );
  });

  for (const target of richtextTargets) {
    test(`as editor I can see where my ${target.contentType} is referenced in richtext`, async ({
      page,
    }) => {
      const referrer = await createRichtextRelation(page, target);
      await expectReferrer(page, target, referrer);
    });
  }
});

test.describe('Different forms of linking content in Links and references', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  for (const { form, title } of blockRelations) {
    test(`as editor I can see references via ${title}`, async ({ page }) => {
      const referrer = await createBlockRelation(page, form);
      const target =
        form === 'image' || form === 'teaser-override'
          ? imageTarget
          : documentTarget;
      await expectReferrer(page, target, referrer);
    });
  }
});
