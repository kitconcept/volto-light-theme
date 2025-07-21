import { BlocksConfigMerger } from './BlocksConfigMerger';

const baseBlocksConfig = {
  teaser: {
    restricted: false,
    variations: [
      { id: 'variation1', label: 'Variation 1' },
      { id: 'variation2', label: 'Variation 2' },
      { id: 'variation3', label: 'Variation 3' },
    ],
    themes: [],
  },
  gridBlock: {
    restricted: false,
    variations: [
      { id: 'variationA', label: 'Variation A' },
      { id: 'variationB', label: 'Variation B' },
    ],
    themes: [],
  },
};

const mergerDSL = {
  teaser: {
    disable: true,
    variations: ['variation1', 'variation2'],
    themes: [
      {
        style: {
          '--theme-color': '#fff',
          '--theme-high-contrast-color': '#ecebeb',
          '--theme-foreground-color': '#000',
          '--theme-low-contrast-foreground-color': '#555555',
        },
        name: 'default',
        label: 'Default',
      },
    ],
  },
  gridBlock: {
    variations: ['variationB'],
  },
  description: {
    disable: true,
  },
};

describe('BlocksConfigMerger', () => {
  it('disables the block if disable is true', () => {
    const result = BlocksConfigMerger(baseBlocksConfig, mergerDSL);
    expect(result.teaser.restricted).toBe(true);
  });

  it('filters variations according to mergerDSL', () => {
    const result = BlocksConfigMerger(baseBlocksConfig, mergerDSL);
    expect(result.teaser.variations.map((v) => v.id)).toEqual([
      'variation1',
      'variation2',
    ]);
    expect(result.gridBlock.variations.map((v) => v.id)).toEqual([
      'variationB',
    ]);
  });

  it('assigns themes from mergerDSL', () => {
    const result = BlocksConfigMerger(baseBlocksConfig, mergerDSL);
    expect(result.teaser.themes).toEqual([
      {
        style: {
          '--theme-color': '#fff',
          '--theme-high-contrast-color': '#ecebeb',
          '--theme-foreground-color': '#000',
          '--theme-low-contrast-foreground-color': '#555555',
        },
        name: 'default',
        label: 'Default',
      },
    ]);
  });

  it('does not modify blocks not present in mergerDSL', () => {
    const result = BlocksConfigMerger(baseBlocksConfig, mergerDSL);
    expect(result.teaser.variations.length).toBe(2);
    expect(result.gridBlock.restricted).toBe(false);
  });

  it('ignores blocks in mergerDSL that do not exist in blocksConfig', () => {
    const result = BlocksConfigMerger(baseBlocksConfig, mergerDSL);
    expect(result.description).toBeUndefined();
  });

  it('does not mutate the original blocksConfig', () => {
    const original = JSON.parse(JSON.stringify(baseBlocksConfig));
    BlocksConfigMerger(baseBlocksConfig, mergerDSL);
    expect(baseBlocksConfig).toEqual(original);
  });
});
