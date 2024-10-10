const toNumber = (v) => {
  const i = isFinite(v) ? parseInt(v) : v;
  return i > 0 ? i : +Infinity;
};

const inRange = (index, rangeList) => {
  const n = parseInt(index);
  for (const rangeOrIndex of rangeList) {
    if (typeof rangeOrIndex !== 'object') {
      if (n === toNumber(rangeOrIndex)) {
        return true;
      }
    } else {
      if (n >= toNumber(rangeOrIndex[0]) && n < toNumber(rangeOrIndex[1])) {
        return true;
      }
    }
  }
  return false;
};

const rangeFilter = ({
  start = 0,
  length = +Infinity,
  exclude = [],
  include = [],
}) => (index) =>
  inRange(index, include) ||
  (index >= start && index < start + length && !inRange(index, exclude));

export default rangeFilter;
