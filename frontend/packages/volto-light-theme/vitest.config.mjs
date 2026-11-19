import { defineConfig } from 'vitest/config';
import voltoVitestConfig from '@plone/volto/vitest.config.mjs';
import { existsSync } from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const coreVolto = path.resolve(__dirname, '../../core/packages/volto');

const {
  createBlocksDocsLoader,
} = require('@plone/registry/create-blocks-docs-loader');

// The block add-ons the theme uses. Their `*.block.md` docs are collected
// from their source folders, as the build does, for the @blocks-schema tests.
const blockAddons = [
  'volto-banner-block',
  'volto-button-block',
  'volto-calendar-block',
  'volto-carousel-block',
  'volto-heading-block',
  'volto-highlight-block',
  'volto-introduction-block',
  'volto-logos-block',
  'volto-separator-block',
  'volto-slider-block',
];

// Bare imports of the add-on sources. Those sources live outside any
// node_modules, so these resolve to the copies this package or Volto installs.
const addonDependencies = [
  'classnames',
  'deepmerge',
  'embla-carousel-autoplay',
  'embla-carousel-react',
  'lodash',
  'query-string',
  'react',
  'react-aria-components',
  'react-contenteditable',
  'react-dom',
  'react-intl',
  'react-redux',
  'react-router-dom',
  'react-toastify',
  'redux',
  'slate',
  'uuid',
];

// The folder of a package, looked up from this package first and then from
// Volto's, which is where core's own dependencies are installed.
const packageDirectory = (name) => {
  for (const base of [__dirname, coreVolto]) {
    const candidate = path.join(base, 'node_modules', name);
    if (existsSync(candidate)) return candidate;
  }
  return null;
};

const blocksDocsLoaderPath = createBlocksDocsLoader([
  path.resolve(coreVolto, 'src'),
  path.resolve(__dirname, '../../core/packages/volto-slate/src'),
  ...blockAddons.map((name) =>
    path.resolve(__dirname, `../${name}/packages/${name}/src`),
  ),
]);

// Volto's modules deep-import semantic-ui-react (for example its
// `dist/commonjs/lib` helpers). The root import is mocked; the `dist` tree is
// mapped to the real package.
const semanticUIDist = path.join(
  path.dirname(
    require.resolve('semantic-ui-react/package.json', { paths: [coreVolto] }),
  ),
  'dist',
);

const localAliases = {
  // Alias for absolute imports within this addon
  '@kitconcept/volto-light-theme': path.resolve(__dirname, './src'),
  '@kitconcept/volto-light-theme/': path.resolve(__dirname, './src/'),
  'semantic-ui-react/dist': semanticUIDist,
  'semantic-ui-react': path.resolve(
    __dirname,
    './src/__mocks__/semantic-ui-react.ts',
  ),
  'load-blocks-docs': blocksDocsLoaderPath,
  // The built stylesheet that the add-ons import from the components package
  '@plone/components/dist': path.resolve(
    __dirname,
    '../../core/packages/components/dist',
  ),
  // Add-ons import their own modules by package name, as the app resolves them
  ...Object.fromEntries(
    blockAddons.map((name) => [
      `@kitconcept/${name}`,
      path.resolve(__dirname, `../${name}/packages/${name}/src`),
    ]),
  ),
  '@kitconcept/volto-bm3-compat': path.resolve(
    __dirname,
    '../volto-bm3-compat/packages/volto-bm3-compat/src',
  ),
  ...Object.fromEntries(
    addonDependencies
      .map((name) => [name, packageDirectory(name)])
      .filter(([, dir]) => dir),
  ),
};

// Vite takes an alias list in order and uses the first match, so this
// package's entries come first, then the ones of the Volto config (unless
// they are overridden above).
const aliasList = (...aliasObjects) => {
  const seen = new Set();
  const entries = [];
  for (const aliases of aliasObjects) {
    for (const [find, replacement] of Object.entries(aliases)) {
      if (seen.has(find)) continue;
      seen.add(find);
      entries.push({ find, replacement });
    }
  }
  return entries;
};

export default defineConfig({
  ...voltoVitestConfig,
  resolve: {
    ...voltoVitestConfig.resolve,
    alias: aliasList(localAliases, voltoVitestConfig.resolve.alias),
  },
  test: {
    ...voltoVitestConfig.test,
    projects: voltoVitestConfig.test.projects.map((project) => ({
      ...project,
      resolve: {
        ...project.resolve,
        alias: aliasList(localAliases, project.resolve?.alias ?? {}),
      },
    })),
  },
  server: {
    fs: {
      allow: ['..', path.resolve(coreVolto)],
    },
  },
});
