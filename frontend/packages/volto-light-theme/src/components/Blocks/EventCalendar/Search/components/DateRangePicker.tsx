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
import Icon from '@plone/volto/components/theme/Icon/Icon';
import CalendarSVG from '@plone/volto/icons/calendar.svg';
import ClearSVG from '@plone/volto/icons/clear.svg';

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
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <span aria-hidden="true">–</span>
        <DateInput slot="end">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button slot="trigger">
          <Icon name={CalendarSVG} color="#000" />
        </Button>
        {dateRange?.start && (
          <button className="reset-date-range" onClick={onResetDateRange}>
            <Icon name={ClearSVG} color="#000" size="30px" />
          </button>
        )}
      </Group>

      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover>
        <Dialog>
          <RangeCalendar>
            <header>
              <Button slot="previous">◀</Button>
              <Heading />
              <Button slot="next">▶</Button>
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
