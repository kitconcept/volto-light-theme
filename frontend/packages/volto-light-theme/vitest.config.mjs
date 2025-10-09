import { defineConfig } from 'vitest/config';
import voltoVitestConfig from '@plone/volto/vitest.config.mjs';
import path from 'path';

export default defineConfig({
  ...voltoVitestConfig,
  resolve: {
    alias: {
      ...voltoVitestConfig.resolve.alias,
      // Alias for absolute imports
      '@kitconcept/volto-light-theme': path.resolve(__dirname, './src'),
      '@kitconcept/volto-light-theme/': path.resolve(__dirname, './src/'),
    },
  },
  server: {
    fs: {
      allow: [
        '..',
        path.resolve(__dirname, '../../../../../core/packages/volto'),
      ],
    },
  },
});
