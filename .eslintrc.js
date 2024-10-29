const fs = require('fs');
const projectRootPath = __dirname;
const AddonConfigurationRegistry = require('@plone/registry/src/addon-registry');

let coreLocation;
if (fs.existsSync(`${projectRootPath}/core`))
  coreLocation = `${projectRootPath}/core`;
else if (fs.existsSync(`${projectRootPath}/../../core`))
  coreLocation = `${projectRootPath}/../../core`;

const registry = new AddonConfigurationRegistry(
  `${coreLocation}/packages/volto`,
);

// Extends ESlint configuration for adding the aliases to `src` directories in Volto addons
const addonAliases = Object.keys(registry.packages).map((o) => [
  o,
  registry.packages[o].modulePath,
]);

module.exports = {
  extends: `${coreLocation}/packages/volto/.eslintrc`,
  rules: {
    'import/no-unresolved': 1,
    'import/named': 'error',
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        name: '@plone/volto/components',
        message:
          'Importing from barrel files is not allowed. Please use direct imports of the modules instead.',
      },
      {
        name: '@plone/volto/helpers',
        message:
          'Importing from barrel files is not allowed. Please use direct imports of the modules instead.',
      },
      {
        name: '@plone/volto/actions',
        message:
          'Importing from barrel files is not allowed. Please use direct imports of the modules instead.',
      },
    ],
    'react/jsx-key': [2, { checkFragmentShorthand: true }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@plone/volto', `${coreLocation}/packages/volto/src`],
          ['@plone/volto-slate', `${coreLocation}/packages/volto-slate/src`],
          ['@plone/registry', `${coreLocation}/packages/registry/src`],
          ['@kitconcept/volto-light-theme', './packages/volto-light-theme/src'],
          ...addonAliases,
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
};
