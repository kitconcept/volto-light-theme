type InputA = { title: string; token: string };
type InputB = { label: string; value: string };
type Normalized = { label: string; id: string };

export function normalizeList(
  arr: Array<InputA | InputB | string>,
): Normalized[] {
  return arr.map((item) => {
    if (typeof item === 'string') {
      return { label: item, id: item };
    } else if ('title' in item && 'token' in item) {
      return { label: item.title, id: item.token };
    } else if ('label' in item && 'value' in item) {
      return { label: item.label, id: item.value };
    }
    throw new Error('Invalid item shape');
  });
}

export function denormalizeList(arr: Normalized[]): string[] {
  return arr.map((item) => item.id);
}
