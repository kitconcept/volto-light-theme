import { test as base, expect } from '@playwright/test';

type Fixtures = {
  page: {
    hideStickyMenu: () => Promise<void>;
  };
};

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    page.hideStickyMenu = async () => {
      await page.addStyleTag({
        content: '.sticky-menu{display:none !important;}',
      });
    };
    await use(page);
  },
});

export { expect };
