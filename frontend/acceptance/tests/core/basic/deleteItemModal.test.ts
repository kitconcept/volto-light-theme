import type { Page } from '@playwright/test';
import { selectContent } from '../../contents';
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

async function expectDeletionWarning(
  page: Page,
  target: { contentId: string; contentTitle: string },
  referrer: { contentId: string; contentTitle: string },
) {
  await page.goto('/contents');
  await selectContent(page, `/${target.contentId}`);
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  const modal = page.locator('.modal.active');
  await expect(modal.locator('.header')).toBeVisible();
  const brokenLinks = modal.locator('.broken-links-list');
  await expect(brokenLinks).toContainText(
    'Deleting this item will break 1 reference.',
  );
  await expect(
    brokenLinks.getByRole('link', { name: target.contentTitle, exact: true }),
  ).toHaveAttribute('href', `/${target.contentId}`);
  await expect(
    brokenLinks.getByRole('link', { name: referrer.contentTitle, exact: true }),
  ).toHaveAttribute('href', `/${referrer.contentId}`);
}

test.describe('Deletion warning for different content types', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  for (const target of richtextTargets) {
    test(`as editor I get a deletion warning for a ${target.contentType} referenced in richtext`, async ({
      page,
    }) => {
      const referrer = await createRichtextRelation(page, target);
      await expectDeletionWarning(page, target, referrer);
    });
  }
});

test.describe('Different forms of linking content in the deletion modal', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  for (const { form, title } of blockRelations) {
    test(`as editor I get a deletion warning for content referenced via ${title}`, async ({
      page,
    }) => {
      const referrer = await createBlockRelation(page, form);
      // The Cypress override scenario deletes the teaser target, not its image.
      const target = form === 'image' ? imageTarget : documentTarget;
      await expectDeletionWarning(page, target, referrer);
    });
  }
});
