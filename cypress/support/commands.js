import '@plone/volto/cypress/add-commands';

// Print cypress-axe violations to the terminal
function printAccessibilityViolations(violations) {
  cy.task(
    'table',
    violations.map(({ id, impact, description, nodes }) => ({
      impact,
      description: `${description} (${id})`,
      nodes: nodes.length,
    })),
  );
}

Cypress.Commands.add(
  'checkAccessibility',
  (subject, { skipFailures = false } = {}) => {
    cy.checkA11y(subject, null, printAccessibilityViolations, skipFailures);
  },
  {
    prevSubject: 'optional',
  },
);
