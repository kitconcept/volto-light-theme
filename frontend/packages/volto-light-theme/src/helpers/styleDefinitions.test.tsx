import { styleDefinitionsEnhancer } from './styleDefinitions';
import config from '@plone/volto/registry';

describe('styleDefinitionsEnhancer', () => {
  it('should enhance style definitions correctly', () => {
    const data = {
      styles: {
        backgroundColor: 'red',
        textColor: 'blue',
      },
    };

    config.registerUtility({
      type: 'styleFieldDefinition',
      name: 'backgroundColor',
      method: () => {
        return [
          { name: 'red', label: 'Red', style: { '--bg-color': 'red' } },
          { name: 'green', label: 'Green', style: { '--bg-color': 'green' } },
        ];
      },
    });

    const container = {};

    const result = styleDefinitionsEnhancer({ data, container });

    expect(result).toEqual({ '--bg-color': 'red' });
  });
});
