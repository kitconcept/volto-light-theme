import { expect, test } from './test';
import { expectNoAccessibilityViolations } from './accessibility';

test.describe('Homepage', () => {
  test('renders and has no automatic accessibility violations', async ({
    page,
  }) => {
    const response = await page.goto('/', { waitUntil: 'networkidle' });

    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole('banner')).toBeVisible();

    await expectNoAccessibilityViolations(page, {
      // The example homepage intentionally omits an h1, matching the
      // longstanding Cypress a11y baseline for this repo.
      disabledRules: ['page-has-heading-one'],
    });
  });
});
