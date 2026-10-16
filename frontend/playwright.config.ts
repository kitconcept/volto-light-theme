import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI || !!process.env.GITHUB_ACTIONS;

const visualProject = {
  testDir: 'acceptance/visual',
  outputDir: 'acceptance/results/visual',
  expect: {
    timeout: 10_000,
    // Allow local exploration without changing the strict CI baselines.
    ...(isCI ? {} : { toHaveScreenshot: { maxDiffPixelRatio: 0.05 } }),
  },
  // Keep the existing baseline filenames when selecting a named project.
  snapshotPathTemplate:
    '{testDir}/../__screenshots__/{testFilePath}/{arg}-chromium{ext}',
};

export default defineConfig({
  forbidOnly: isCI,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'acceptance',
      testDir: 'acceptance/tests',
      testMatch: ['**/*.{spec,test}.{ts,tsx}'],
      outputDir: 'acceptance/results/acceptance',
      // The tests share a backend that is reset between tests.
      workers: 1,
      retries: isCI ? 3 : 0,
      use: { viewport: { width: 1440, height: 1000 } },
    },
    {
      ...visualProject,
      name: 'visual',
      testMatch: '**/main/**/*.test.{js,jsx,ts,tsx}',
    },
    {
      ...visualProject,
      name: 'storybook',
      testMatch: '**/storybook/**/*.test.{js,jsx,ts,tsx}',
      use: { baseURL: 'http://localhost:6006' },
    },
  ],
});
