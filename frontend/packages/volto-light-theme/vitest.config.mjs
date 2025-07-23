import { defineConfig } from 'vitest/config';
import voltoVitestConfig from '@plone/volto/vitest.config.mjs';
import path from 'path';

export default defineConfig({
  ...voltoVitestConfig,
  server: {
    fs: {
      allow: [
        // Allow vite/vitest to access these folders
        '..', // allow going up from frontend/
        path.resolve(__dirname, '../../../../../core/packages/volto'),
      ],
    },
  },
});
