import React from 'react';
import {
  Button,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DateRangePicker as RACDateRangePicker,
  type DateRangePickerProps as RACDateRangePickerProps,
  DateSegment,
  type DateValue,
  Dialog,
  FieldError,
  Group,
  Heading,
  Label,
  Popover,
  RangeCalendar,
  Text,
  type ValidationResult,
} from 'react-aria-components';
import cx from 'classnames';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import CalendarSVG from '@plone/volto/icons/calendar.svg';
import ClearSVG from '@plone/volto/icons/clear.svg';
import LeftArrowSVG from '@plone/volto/icons/left-key.svg';
import RightArrowSVG from '@plone/volto/icons/right-key.svg';

export interface DateRangePickerProps<T extends DateValue>
  extends RACDateRangePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  onResetDateRange: () => void;
  dateRange?: { start: DateValue; end: DateValue } | null;
}

export function DateRangePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  onResetDateRange,
  dateRange,
  ...props
}: DateRangePickerProps<T>) {
  return (
    <RACDateRangePicker {...props}>
      <Label>{label}</Label>
      <Group>
        <DateInput slot="start">
          {(segment) => (
            <DateSegment
              segment={segment}
              {...(segment.isPlaceholder && {
                'aria-valuenow': 0,
              })}
            />
          )}
        </DateInput>
        <span aria-hidden="true">–</span>
        <DateInput slot="end">
          {(segment) => (
            <DateSegment
              segment={segment}
              {...(segment.isPlaceholder && {
                'aria-valuenow': 0,
              })}
            />
          )}
        </DateInput>
        <button
          className={cx('reset-date-range', { visibility: dateRange?.start })}
          onClick={onResetDateRange}
          aria-label="Clear date range"
        >
          <Icon name={ClearSVG} color="#000" size="30px" />
        </button>
        <Button slot="trigger">
          <Icon name={CalendarSVG} color="#000" />
        </Button>
      </Group>

      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover offset={0}>
        <Dialog>
          <RangeCalendar>
            <header>
              <Button slot="previous">
                <Icon name={LeftArrowSVG} />
              </Button>
              <Heading />
              <Button slot="next">
                <Icon name={RightArrowSVG} />
              </Button>
            </header>
            <CalendarGrid>
              {(date) => <CalendarCell date={date} />}
            </CalendarGrid>
          </RangeCalendar>
        </Dialog>
      </Popover>
    </RACDateRangePicker>
  );
}
