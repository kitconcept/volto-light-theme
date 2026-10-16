import type { Locator } from '@playwright/test';
import { expect, test } from '../../test';
import { login } from '../../login';

function occurrences(container: Locator) {
  return container.locator('.occurences .list > .item');
}

async function choose(container: Locator, selector: string, option: string) {
  await container.locator(selector).click();
  await container
    .locator('.react-select__menu')
    .getByText(option, { exact: true })
    .click();
}

async function date(container: Locator, selector: string, value: string) {
  await container.locator(selector).fill(value);
  await container.locator(selector).press('Tab');
}

async function endAfter(modal: Locator, count: number) {
  await modal.locator('#recurrenceEndsCount').check({ force: true });
  await modal.locator('#count').fill(String(count));
  await expect(occurrences(modal)).toHaveCount(count);
}

async function excludeAndInclude(modal: Locator) {
  const last = occurrences(modal).last();
  await last.locator('.exclude-button').click();
  await expect(last.locator('.content:not(.right)')).toHaveClass(
    /\bexcluded\b/,
  );
  await last.locator('.include-button').click();
  await expect(last.locator('.content:not(.right)')).not.toHaveClass(
    /\bexcluded\b/,
  );
}

async function saveRecurrence(modal: Locator, count: number) {
  await modal.locator('.button.save').click();
  await expect(modal).toBeHidden();
  await expect(
    occurrences(modal.page().locator('#default-recurrence')),
  ).toHaveCount(count);
}

test.describe('Recurrence widget', () => {
  test.use({ timezoneId: 'UTC' });

  test.beforeEach(async ({ page }) => {
    // Keep the source's 2020 additional dates valid for the no-past-dates picker.
    await page.clock.setFixedTime(new Date('2020-05-01T12:00:00Z'));
    await login(page);
    await page.goto('/');
    await page.locator('#toolbar-add').click();
    await page.locator('#toolbar-add-event').click();
    await page.locator('#field-title').fill('Test recurrence');
    await date(page.locator('body'), '#start-date', '05/04/2020');
    await page.locator('#start-time').press('ArrowDown');
    await page.locator('.rc-time-picker-panel-input').fill('01:00 AM');
    await page.locator('.rc-time-picker-panel-input').press('Escape');
    await date(page.locator('body'), '#end-date', '05/16/2020');
    await page.locator('#end-time').press('ArrowDown');
    await page.locator('.rc-time-picker-panel-input').fill('01:00 AM');
    await page.locator('.rc-time-picker-panel-input').press('Escape');
    await page.locator('#default-recurrence .button.edit-recurrence').click();
    await expect(occurrences(page.locator('.modal'))).toHaveCount(13);
  });

  test('Test the default. Daily recurrence', async ({ page }) => {
    const modal = page.locator('.modal');
    for (const [interval, count] of [
      [2, 7],
      [3, 5],
      [1, 13],
    ]) {
      await modal.locator('#interval').fill(String(interval));
      await expect(occurrences(modal)).toHaveCount(count);
    }
    await endAfter(modal, 3);
    await modal.locator('#recurrenceEndsUntil').check({ force: true });
    await expect(occurrences(modal)).toHaveCount(13);
    await date(modal, '#addDate-date', '05/20/2020');
    await expect(occurrences(modal)).toHaveCount(14);
    await excludeAndInclude(modal);
    await saveRecurrence(modal, 14);
  });

  test('Test Monday and Friday recurrence', async ({ page }) => {
    const modal = page.locator('.modal');
    await choose(modal, '.field .react-select-container', 'Monday and Friday');
    await expect(occurrences(modal)).toHaveCount(4);
    await endAfter(modal, 2);
    await excludeAndInclude(modal);
    await saveRecurrence(modal, 2);
  });

  test('Test Weekday recurrence', async ({ page }) => {
    const modal = page.locator('.modal');
    await choose(modal, '.field .react-select-container', 'Weekday');
    await expect(occurrences(modal)).toHaveCount(10);
    await endAfter(modal, 6);
    await expect(
      occurrences(modal).last().locator('.content:not(.right)'),
    ).toContainText('Monday');
    await excludeAndInclude(modal);
    await saveRecurrence(modal, 6);
  });

  test('Test Weekly recurrence', async ({ page }) => {
    const modal = page.locator('.modal');
    await choose(modal, '.field .react-select-container', 'Weekly');
    await modal.locator('.byday-field .ui.button.active').click();
    await modal
      .locator('.byday-field')
      .getByRole('button', { name: 'Tue', exact: true })
      .click();
    await expect(occurrences(modal)).toHaveCount(2);
    await modal
      .locator('.byday-field')
      .getByRole('button', { name: 'Wed', exact: true })
      .click();
    await expect(occurrences(modal)).toHaveCount(4);
    await endAfter(modal, 6);
    await expect(
      occurrences(modal).last().locator('.content:not(.right)'),
    ).toContainText('Wednesday');
    await excludeAndInclude(modal);
    await saveRecurrence(modal, 6);
  });

  test('Test Monthly recurrence', async ({ page }) => {
    const modal = page.locator('.modal');
    await choose(modal, '.field .react-select-container', 'Monthly');
    await expect(modal.locator('#bymonthday')).toHaveValue('4');
    await expect(
      occurrences(modal).last().locator('.content:not(.right)'),
    ).toContainText('Monday, May 4');
    await modal.locator('#bymonthday').fill('6');
    await expect(
      occurrences(modal).last().locator('.content:not(.right)'),
    ).toContainText('Wednesday, May 6,');
    await modal.locator('#monthly-byweekday').check({ force: true });
    await choose(modal, '#weekdayOfTheMonthIndex', 'First');
    await choose(modal, '#weekdayOfTheMonth', 'Sunday');
    await expect(occurrences(modal)).toHaveCount(0);
    await choose(modal, '#weekdayOfTheMonth', 'Wednesday');
    await expect(occurrences(modal)).toHaveCount(1);
    await date(modal, '#until-date', '07/31/2020');
    await expect(occurrences(modal)).toHaveCount(3);
    await modal.locator('#recurrenceEndsCount').check({ force: true });
    await expect(occurrences(modal)).toHaveCount(1);
    await endAfter(modal, 2);
    await endAfter(modal, 6);
    await expect(
      occurrences(modal).last().locator('.content:not(.right)'),
    ).toContainText('Wednesday, October 7');
    await excludeAndInclude(modal);
    await date(modal, '#addDate-date', '10/08/2020');
    await expect(
      occurrences(modal).last().locator('.content:not(.right)'),
    ).toContainText('Thursday, October 8');
    await saveRecurrence(modal, 7);
  });

  test('Test Yearly recurrence', async ({ page }) => {
    const modal = page.locator('.modal');
    await choose(modal, '.field .react-select-container', 'Yearly');
    await date(modal, '#until-date', '12/31/2030');
    await expect(occurrences(modal)).toHaveCount(11);
    await modal.locator('#interval').fill('2');
    await expect(occurrences(modal)).toHaveCount(6);
    await modal.locator('#interval').fill('3');
    await expect(occurrences(modal)).toHaveCount(4);
    await modal.locator('#interval').fill('2');
    await modal.locator('#bymonthday').fill('6');
    await expect(occurrences(modal)).toHaveCount(6);
    await expect(
      occurrences(modal).last().locator('.content:not(.right)'),
    ).toContainText('Monday, May 6, 2030');
    await choose(modal, '.byyear-bymonthday #monthOfTheYear', 'January');
    await expect(occurrences(modal)).toHaveCount(5);
    await expect(
      occurrences(modal).first().locator('.content:not(.right)'),
    ).toContainText('Thursday, January 6, 2022');
    await expect(
      occurrences(modal).last().locator('.content:not(.right)'),
    ).toContainText('Sunday, January 6, 2030');
    await modal.locator('#yearly-byday').check({ force: true });
    await expect(occurrences(modal)).toHaveCount(6);
    await expect(
      occurrences(modal).first().locator('.content:not(.right)'),
    ).toContainText('Monday, May 4, 2020');
    await expect(
      occurrences(modal).last().locator('.content:not(.right)'),
    ).toContainText('Monday, May 6, 2030');
    await choose(modal, '#weekdayOfTheMonthIndex', 'Third');
    await expect(occurrences(modal)).toHaveCount(6);
    await expect(
      occurrences(modal).first().locator('.content:not(.right)'),
    ).toContainText('Monday, May 18, 2020');
    await expect(
      occurrences(modal).last().locator('.content:not(.right)'),
    ).toContainText('Monday, May 20, 2030');
    await choose(modal, '#weekdayOfTheMonth', 'Monday');
    await expect(occurrences(modal)).toHaveCount(6);
    await expect(
      occurrences(modal).first().locator('.content:not(.right)'),
    ).toContainText('Monday, May 18, 2020');
    await expect(
      occurrences(modal).last().locator('.content:not(.right)'),
    ).toContainText('Monday, May 20, 2030');
    await choose(modal, '.byyear-byday #monthOfTheYear', 'January');
    await expect(occurrences(modal)).toHaveCount(5);
    await expect(
      occurrences(modal).first().locator('.content:not(.right)'),
    ).toContainText('Monday, January 17, 2022');
    await expect(
      occurrences(modal).last().locator('.content:not(.right)'),
    ).toContainText('Monday, January 21, 2030');
    await endAfter(modal, 3);
    await endAfter(modal, 8);
    await excludeAndInclude(modal);
    await date(modal, '#addDate-date', '10/08/2040');
    await expect(
      occurrences(modal).last().locator('.content:not(.right)'),
    ).toContainText('Monday, October 8, 2040');
    await saveRecurrence(modal, 9);
  });
});
