const { defineConfig } = require('cypress');
const path = require('path');

const projectRootPath = path.resolve('.');
console.log(path.join(projectRootPath, './cypress/support/e2e.js'));

module.exports = defineConfig({
  viewportWidth: 1280,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: path.join(projectRootPath, './cypress/support/e2e.js'),
    setupNodeEvents(on, config) {
      on('task', {
        table(message) {
          console.table(message);
          return null;
        },
      });
    },
  },
});
