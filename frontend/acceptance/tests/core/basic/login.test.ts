import { test } from '../../test';
import { loginThroughForm } from './auth';

test.describe('Login Tests', () => {
  test('as a registered user I can log in', async ({ page }) => {
    await loginThroughForm(page);
  });
});
