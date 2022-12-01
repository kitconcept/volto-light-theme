import { defaultStylingSchema } from './components/Blocks/schema';
import {
  gridTeaserDisableStylingSchema,
  teaserSchemaEnhancer,
} from './components/Blocks/Teaser/schema';
import gridSVG from './icons/block_icn_grid.svg';

const BG_COLORS = [
  { name: 'transparent', label: 'Transparent' },
  { name: 'grey', label: 'Grey' },
];

const applyConfig = (config) => {
  config.settings = {
    ...config.settings,
    slidingSearchAnimation: true,
  };

  config.blocks.blocksConfig.__grid = {
    ...config.blocks.blocksConfig.__grid,
    colors: BG_COLORS,
    schemaEnhancer: defaultStylingSchema,
    icon: gridSVG,
    gridAllowedBlocks: ['teaser', 'image', 'slate'],
    // One could customize the blocks inside the grid like this:
    blocksConfig: {
      ...config.blocks.blocksConfig,
      teaser: {
        ...config.blocks.blocksConfig.teaser,
        schemaEnhancer: gridTeaserDisableStylingSchema,
      },
    },
  };

  config.blocks.blocksConfig.teaser = {
    ...config.blocks.blocksConfig.teaser,
    group: 'teasers',
    imageScale: 'larger',
    colors: BG_COLORS,
    schemaEnhancer: teaserSchemaEnhancer,
  };

  return config;
};

export default applyConfig;
