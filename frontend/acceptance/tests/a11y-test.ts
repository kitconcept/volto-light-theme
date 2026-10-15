import { request as apiRequest, test as base } from '@playwright/test';

import {
  applyProfile,
  runRobotKeyword,
  setup,
  teardown,
} from './reset-fixture';

type WorkerFixtures = {
  a11yDemoContent: void;
};

export const test = base.extend<{}, WorkerFixtures>({
  a11yDemoContent: [
    async ({}, use) => {
      const request = await apiRequest.newContext();

      try {
        await teardown(request);
        await setup(request);
        await runRobotKeyword(request, 'enable_autologin_as', ['Manager']);
        try {
          await applyProfile(request, 'kitconcept.voltolighttheme:demo');
        } finally {
          await runRobotKeyword(request, 'disable_autologin');
        }
        await use();
      } finally {
        await teardown(request);
        await request.dispose();
      }
    },
    { scope: 'worker', auto: true },
  ],
});

export { expect } from '@playwright/test';
