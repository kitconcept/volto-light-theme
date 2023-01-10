import { composeSchema } from '@plone/volto/helpers';
import { defaultStylingSchema } from './components/Blocks/schema';
import { separatorStyleEnhancer } from './components/Blocks/Separator/schema';
import { teaserSchemaEnhancer } from './components/Blocks/Teaser/schema';
import { gridTeaserDisableStylingSchema } from '@kitconcept/volto-blocks-grid/components/Teaser/schema';

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
        schemaEnhancer: composeSchema(
          gridTeaserDisableStylingSchema,
          teaserSchemaEnhancer,
        ),
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
    schemaEnhancer: separatorStyleEnhancer,
    sidebarTab: 1,
  };

  config.blocks.blocksConfig.heading = {
    ...config.blocks.blocksConfig.heading,
    sidebarTab: 0,
    allowed_headings: [['h2', 'h2']],
  };

  return config;
};

export default applyConfig;
