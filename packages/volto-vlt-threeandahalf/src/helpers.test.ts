import { getCurrentStyleByName } from './helpers';

describe('getCurrentStyleByName', () => {
  const styleDefinitions = [
    {
      style: { color: 'red' },
      name: 'Red',
      label: 'Red',
    },
    {
      style: { color: 'blue' },
      name: 'Blue',
      label: 'Blue',
    },
  ];

  it('should return the current block color when it exists in style definitions', () => {
    const fieldName = 'color';
    const block = {
      styles: {
        color: { color: 'red' },
      },
    };

    const result = getCurrentStyleByName(styleDefinitions, fieldName, block);

    expect(result).toBe('Red');
  });

  it('should return undefined when the current block style does not exist in style definitions', () => {
    const fieldName = 'color';
    const block = {
      styles: {
        color: { color: 'green' },
      },
    };

    const result = getCurrentStyleByName(styleDefinitions, fieldName, block);

    expect(result).toBeUndefined();
  });

  it('should return undefined when the block styles object is undefined', () => {
    const fieldName = 'color';
    const block = {};

    const result = getCurrentStyleByName(styleDefinitions, fieldName, block);

    expect(result).toBeUndefined();
  });
});
