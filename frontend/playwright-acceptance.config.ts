import { defineConfig, devices } from '@playwright/test';

// Acceptance tests run against a Plone acceptance backend (RobotRemote enabled)
// and a running Volto frontend. This config is intentionally separate from the
// visual regression one (`playwright.config.ts`).
export default defineConfig({
  testDir: 'acceptance/tests',
  testMatch: ['**/*.{spec,test}.{ts,tsx}'],
  outputDir: 'acceptance/results',
  // Disable parallel tests to avoid conflicts creating/deleting content while
  // sharing a single backend that is reset between tests.
  workers: 1,
  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,
  // Retry on CI only.
  retries: process.env.CI ? 3 : 0,
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
    viewport: { width: 1440, height: 1000 },
    trace: 'retain-on-failure',
    // Use video only while debugging CI
    // video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 1000 },
      },
    },
  ],
});
