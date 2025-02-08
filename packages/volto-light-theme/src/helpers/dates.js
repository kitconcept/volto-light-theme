import { parseISO } from 'date-fns';

const LONG_DATE_FORMAT = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const parseDateFromCatalog = (value) => {
  if (value.startsWith('1969')) {
    return null;
  }
  return parseISO(value);
};

export const formatDateRange = ({
  start,
  end,
  format = LONG_DATE_FORMAT,
  locale = 'default',
}) => {
  const formatter = new Intl.DateTimeFormat(locale || 'default', format);
  return formatter.formatRange(start, end);
};
