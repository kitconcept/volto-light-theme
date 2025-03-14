const fs = require('fs');
const path = require('path');

const summarize = (cumulativeReport, cumulativeSummary) => {
  const result = {};
  if (fs.existsSync(cumulativeReport)) {
    fs.closeSync(fs.openSync(cumulativeSummary, 'w'));
    fs.readFileSync(cumulativeReport, 'utf-8')
      .split(/\r?\n/)
      .forEach((line) => {
        if (line) {
          const { fileName, testTitle, state, ts } = JSON.parse(line);
          if (state !== 'pending') {
            let l1 = result[fileName];
            if (!l1) {
              l1 = result[fileName] = {};
            }
            l1[testTitle] = { state, ts };
          }
        }
      });
    let array = [];
    for (const fileName in result) {
      const l1 = result[fileName];
      for (const testTitle in l1) {
        const { state, ts } = l1[testTitle];
        array.push({ fileName, testTitle, state, ts });
      }
    }
    array.sort((logA, logB) => {
      if (logA.fileName < logB.fileName) {
        return -1;
      } else if (logA.fileName > logB.fileName) {
        return +1;
      } else if (logA.testTitle < logB.testTitle) {
        return -1;
      } else if (logA.testTitle > logB.testTitle) {
        return +1;
      } else {
        return 0;
      }
    });
    for (const log of array) {
      fs.appendFileSync(cumulativeSummary, JSON.stringify(log) + '\n');
    }
  } else {
    throw new Error(`Report file not found [${cumulativeReport}]`);
  }
};

const cumulativeReport =
  process.env.cypress_cumulativeReport ||
  path.resolve(__dirname, '..', '..', 'config', 'cumulative.report');
const cumulativeSummary =
  process.env.cypress_cumulativeSummaryReport ||
  cumulativeReport + '-summary.report';

summarize(cumulativeReport, cumulativeSummary);
