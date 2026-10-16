import { test as base, expect } from '@playwright/test';

type Fixtures = {
  page: {
    hideStickyMenu: () => Promise<void>;
  };
};

export const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 720 },
  { name: 'bigdesktop', width: 1536, height: 960 },
] as const;

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
