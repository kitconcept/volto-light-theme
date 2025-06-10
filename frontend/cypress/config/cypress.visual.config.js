const { defineConfig } = require('cypress');
const baseConfig = require('../../cypress.config.js');
const {
  initPlugin: initVisualRegressionPlugin,
} = require('@frsource/cypress-plugin-visual-regression-diff/dist/plugins');
const path = require('path');
const cumulativeTestRun = require('../support/visual/cumulative-test-run');
const getCumulativeState = require('../support/visual/get-cumulative-state');

// Bypassing Cypress's scheme for env vars, in order to have the same
// value as an env var, as well as passable to the getCumulativeState function.
const cumulativeReport =
  process.env.cypress_cumulativeReport ||
  path.resolve(__dirname, 'cumulative.report');

module.exports = defineConfig(
  Object.assign({}, baseConfig, {
    e2e: Object.assign({}, baseConfig.e2e, {
      // Needed for after:spec event, used by cumulative result collection
      experimentalInteractiveRunEvents: true,
      setupNodeEvents(on, config) {
        // visual regression testing
        initVisualRegressionPlugin(on, config);
        // support cumulative test run
        cumulativeTestRun.setupNodeEvents(on, config);
        return {
          ...require('../plugins/index.js')(on, config),
          browsers: config.browsers.filter((b) => b.name === 'firefox'),
        };
      },
      specPattern: 'cypress/tests/visual/**/*.cy.{js,jsx,ts,tsx}',
      // a11 tests require a site root without /en
      baseUrl: 'http://localhost:3000/',
    }),
    env: {
      API: 'plone',
      visual: true,
      a11y: true,
      API_PATH: 'http://localhost:8080/Plone',
      pluginVisualRegressionImagesPath: path.resolve(
        __dirname,
        '../__image_snapshots__',
      ),
      pluginVisualRegressionDiffConfig: { includeAA: false, threshold: 0.01 },
      pluginVisualRegressionMaxDiffThreshold: 0.5,
      // pluginVisualRegressionUpdateImages: true,
      // Setting this to true enables cumulative testing, which will skip tests
      // that have previously passed. The state is saved into the cumulative.report
      // file.
      enableCumulative: false,
      cumulativeReport,
      cumulativeState: getCumulativeState(cumulativeReport),
    },
  }),
);
