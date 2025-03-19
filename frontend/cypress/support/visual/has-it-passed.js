const getFullTitle = (test) =>
  test.parent.root ? test.title : `${getFullTitle(test.parent)} ${test.title}`;

const hasItPassed = (fileName, currentTest) => {
  const enableCumulative = Cypress.env('enableCumulative');
  if (enableCumulative) {
    const cumulativeState = Cypress.env('cumulativeState');
    const result = cumulativeState[fileName]?.[getFullTitle(currentTest)];
    return !!result;
  } else {
    return false;
  }
};

export default hasItPassed;
