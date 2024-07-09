const fs = require('fs');

module.exports = {
  setupNodeEvents: (on, config) => {
    on('after:spec', (spec, results) => {
      if (!results.tests) {
        // eslint-disable-next-line no-console
        console.warn('Cannot collect test results in interactive mode.');
        return;
      }
      results.tests.forEach((t) => {
        const log = {
          fileName: spec.relative,
          testTitle: t.title.join(' '),
          ts: new Date().toISOString(),
          state: t.state,
        };
        if (['passed', 'failed'].includes(log.state)) {
          fs.appendFileSync(
            config.env.cumulativeReport,
            JSON.stringify(log) + '\n',
          );
        }
      });
    });
  },
};
