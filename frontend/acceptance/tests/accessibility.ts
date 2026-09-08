import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';
import type { RunOptions, SerialFrameSelector } from 'axe-core';

type AccessibilityCheckOptions = {
  include?: SerialFrameSelector[];
  exclude?: SerialFrameSelector[];
  axeOptions?: RunOptions;
  disabledRules?: string[];
};

export async function expectNoAccessibilityViolations(
  page: Page,
  options: AccessibilityCheckOptions = {},
) {
  const builder = new AxeBuilder({ page });

  for (const selector of options.include ?? []) {
    builder.include(selector);
  }

  for (const selector of options.exclude ?? []) {
    builder.exclude(selector);
  }

  if (options.axeOptions) {
    builder.options(options.axeOptions);
  }

  if (options.disabledRules?.length) {
    builder.disableRules(options.disabledRules);
  }

  const { violations } = await builder.analyze();

  const violationSummary = violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    description: violation.description,
    help: violation.help,
    nodes: violation.nodes.map((node) => ({
      target: node.target,
      failureSummary: node.failureSummary,
    })),
  }));

  expect(violationSummary).toEqual([]);
}
