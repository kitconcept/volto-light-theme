import find from 'lodash/find';

export function isEqual(x: any, y: any): boolean {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length &&
        ok(x).every((key) => isEqual(x[key], y[key]))
    : x === y;
}

type StyleDefinition = {
  style: Record<string, string>;
  name: string;
  label: string;
};

export function getCurrentStyleByName(
  styleDefinitions: Array<StyleDefinition>,
  fieldName: string,
  block: any,
) {
  let currentBlockColor;
  let currentBlockStyle = block?.styles?.[fieldName];
  // Find in color definitions the current style value
  if (currentBlockStyle) {
    const foundStyle = find(styleDefinitions, {
      style: currentBlockStyle,
    });
    currentBlockColor = foundStyle?.name;
  }

  return currentBlockColor;
}

export * from './grouping';
