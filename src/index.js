import { defaultStylingSchema } from './components/Blocks/schema';
import { separatorStyleEnhancer } from './components/Blocks/Separator/schema';
import {
  gridTeaserDisableStylingSchema,
  teaserSchemaEnhancer,
} from './components/Blocks/Teaser/schema';
import ContainerQueriesPolyfill from './components/CQPolyfill';
import Container from './components/Atoms/Container/Container';

import gridSVG from './icons/block_icn_grid.svg';

const BG_COLORS = [
  { name: 'transparent', label: 'Transparent' },
  { name: 'grey', label: 'Grey' },
];

const applyConfig = (config) => {
  // Register custom Container component
  config.registerComponent({
    name: 'Container',
    component: Container,
  });

  config.settings = {
    ...config.settings,
    slidingSearchAnimation: true,
  };

  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '',
      component: ContainerQueriesPolyfill,
    },
  ];

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

  config.blocks.blocksConfig.separator = {
    ...config.blocks.blocksConfig.separator,
    schemaEnhancer: defaultStylingSchema,
    sidebarTab: 1,
  };

  return config;
};

export default applyConfig;
