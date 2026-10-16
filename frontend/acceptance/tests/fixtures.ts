import path from 'node:path';

export function fixturePath(filename: string) {
  return path.resolve(__dirname, '../fixtures', filename);
}
