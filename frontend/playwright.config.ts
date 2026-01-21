import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI || !!process.env.GITHUB_ACTIONS;

export default defineConfig({
  testDir: 'playwright/tests/visual',
  outputDir: 'playwright/results',
  timeout: 30_000,
  expect: {
    timeout: 10_000,
    ...(isCI ? {} : { toHaveScreenshot: { maxDiffPixelRatio: 0.03 } }),
  },
  use: {
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
    viewport: { width: 1280, height: 720 },
    trace: 'retain-on-failure',
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
