const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1280,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    retries: {
      runMode: 2,
    },
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
