import { defineConfig, devices } from '@playwright/test';

// @ts-ignore
const isCI = !!process.env.CI || !!process.env.GITHUB_ACTIONS;

export default defineConfig({
  testDir: 'playwright/tests/visual',
  outputDir: 'playwright/results',
  timeout: 30_000,
  expect: {
    timeout: 10_000,
    // For development, we allow a bit more freedom for visual diffs
    // However, we never push such changes in the screenshots repo
    ...(isCI ? {} : { toHaveScreenshot: { maxDiffPixelRatio: 0.05 } }),
  },
  use: {
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
    viewport: { width: 1280, height: 720 },
    trace: 'retain-on-failure',
    // Use video only while debugging CI
    // video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  snapshotPathTemplate:
    '{testDir}/../../__screenshots__/{testFilePath}/{arg}{-projectName}{ext}',
});
