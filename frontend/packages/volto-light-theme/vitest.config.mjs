import { defineConfig } from 'vitest/config';
import voltoVitestConfig from '@plone/volto/vitest.config.mjs';
import path from 'path';

export default defineConfig({
  ...voltoVitestConfig,
  resolve: {
    alias: {
      '@plone/volto': path.resolve(__dirname, '../../core/packages/volto/src'), // Add paths accordingly
      // 'promise-file-reader': require.resolve('promise-file-reader') // Add to identify dependency from package
    },
  },
});
