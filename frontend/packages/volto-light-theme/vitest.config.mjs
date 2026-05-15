import { defineConfig } from 'vitest/config';
import voltoVitestConfig from '@plone/volto/vitest.config.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localAliases = {
  // Alias for absolute imports within this addon
  '@kitconcept/volto-light-theme': path.resolve(__dirname, './src'),
  '@kitconcept/volto-light-theme/': path.resolve(__dirname, './src/'),
  'semantic-ui-react': path.resolve(
    __dirname,
    './src/__mocks__/semantic-ui-react.ts',
  ),
};

export default defineConfig({
  ...voltoVitestConfig,
  resolve: {
    alias: {
      ...voltoVitestConfig.resolve.alias,
      ...localAliases,
    },
  },
  test: {
    ...voltoVitestConfig.test,
    projects: voltoVitestConfig.test.projects.map((project) => ({
      ...project,
      resolve: {
        ...project.resolve,
        alias: {
          ...project.resolve?.alias,
          ...localAliases,
        },
      },
    })),
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
