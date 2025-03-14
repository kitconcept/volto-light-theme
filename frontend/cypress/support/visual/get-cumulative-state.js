const fs = require('fs');

module.exports = (cumulativeReport) => {
  const result = {};
  if (fs.existsSync(cumulativeReport)) {
    fs.readFileSync(cumulativeReport, 'utf-8')
      .split(/\r?\n/)
      .forEach((line) => {
        if (line) {
          const { fileName, testTitle, state } = JSON.parse(line);
          if (state === 'passed') {
            let l1 = result[fileName];
            if (!l1) {
              l1 = result[fileName] = {};
            }
            l1[testTitle] = true;
          }
        }
      });
  }
  return result;
};
