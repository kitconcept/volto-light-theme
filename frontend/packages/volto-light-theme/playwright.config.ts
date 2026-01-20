import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../../playwright/tests/visual',
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: 'https://light-theme.kitconcept.io',
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
    '{testDir}/__screenshots__/{testFilePath}/{arg}{-projectName}{ext}',
});
