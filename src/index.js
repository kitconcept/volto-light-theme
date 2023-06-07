import { defineMessages } from 'react-intl';

import { composeSchema, getPreviousNextBlock } from '@plone/volto/helpers';
import { defaultStylingSchema } from './components/Blocks/schema';
import { teaserSchemaEnhancer } from './components/Blocks/Teaser/schema';
// eslint-disable-next-line import/no-unresolved
import { gridTeaserDisableStylingSchema } from '@kitconcept/volto-blocks-grid/components/Teaser/schema';

import ContainerQueriesPolyfill from './components/CQPolyfill';
import Container from './components/Atoms/Container/Container';
import TopSideFacets from './components/Blocks/Search/TopSideFacets';

import gridSVG from './icons/block_icn_grid.svg';
import { ButtonStylingSchema } from './components/Blocks/Button/schema';

const BG_COLORS = [
  { name: 'transparent', label: 'Transparent' },
  { name: 'grey', label: 'Grey' },
];

defineMessages({
  Press: {
    id: 'Press',
    defaultMessage: 'Press',
  },
  Sitemap: {
    id: 'Sitemap',
    defaultMessage: 'Sitemap',
  },
});

const applyConfig = (config) => {
  config.settings.enableAutoBlockGroupingByBackgroundColor = true;

  // No required blocks (eg. Title)
  config.blocks.requiredBlocks = [];

  // Register custom Container component
  config.registerComponent({
    name: 'Container',
    component: Container,
  });

  config.settings.apiExpanders = [
    ...config.settings.apiExpanders,
    {
      match: '',
      GET_CONTENT: ['breadcrumbs', 'navigation', 'actions', 'types'],
    },
  ];

  // Register custom StyleWrapper ClassNames
  config.settings.styleClassNameExtenders = [
    ({ block, content, data, classNames }) => {
      let styles = [];
      const [previousBlock, nextBlock] = getPreviousNextBlock({
        content,
        block,
      });

      // Inject a class depending of which type is the next block
      if (nextBlock?.['@type']) {
        styles.push(`next--is--${nextBlock['@type']}`);
      }

      // Inject a class depending if previous is the same type of block
      if (data?.['@type'] === previousBlock?.['@type']) {
        styles.push('previous--is--same--block-type');
      }

      // Inject a class depending if next is the same type of block
      if (data?.['@type'] === nextBlock?.['@type']) {
        styles.push('next--is--same--block-type');
      }

      // Inject a class depending if it's the first of block type
      if (data?.['@type'] !== previousBlock?.['@type']) {
        styles.push('is--first--of--block-type');
      }

      // Inject a class depending if it's the last of block type
      if (data?.['@type'] !== nextBlock?.['@type']) {
        styles.push('is--last--of--block-type');
      }

      // Given a StyleWrapper defined `backgroundColor` style
      const previousColor =
        previousBlock?.styles?.backgroundColor ?? 'transparent';
      const currentColor = data?.styles?.backgroundColor ?? 'transparent';
      const nextColor = nextBlock?.styles?.backgroundColor ?? 'transparent';

      // Inject a class depending if the previous block has the same `backgroundColor`
      if (currentColor === previousColor) {
        styles.push('previous--has--same--backgroundColor');
      } else if (currentColor !== previousColor) {
        styles.push('previous--has--different--backgroundColor');
      }

      // Inject a class depending if the next block has the same `backgroundColor`
      if (currentColor === nextColor) {
        styles.push('next--has--same--backgroundColor');
      } else if (currentColor !== nextColor) {
        styles.push('next--has--different--backgroundColor');
      }

      return [...classNames, ...styles];
    },
  ];

  config.settings.slidingSearchAnimation = true;

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

  config.blocks.blocksConfig.slate = {
    ...config.blocks.blocksConfig.slate,
    colors: BG_COLORS,
    schemaEnhancer: defaultStylingSchema,
    sidebarTab: 1,
  };

  config.blocks.blocksConfig.teaser = {
    ...config.blocks.blocksConfig.teaser,
    group: 'teasers',
    imageScale: 'larger',
    colors: BG_COLORS,
    schemaEnhancer: teaserSchemaEnhancer,
  };

  config.blocks.blocksConfig.heading = {
    ...config.blocks.blocksConfig.heading,
    sidebarTab: 0,
    allowed_headings: [['h2', 'h2']],
  };

  config.blocks.blocksConfig.search.variations = [
    {
      id: 'facetsTopSide',
      title: 'Facets on top',
      view: TopSideFacets,
      isDefault: true,
    },
  ];
  config.blocks.blocksConfig.__button = {
    ...config.blocks.blocksConfig.__button,
    schemaEnhancer: ButtonStylingSchema,
    colors: BG_COLORS,
  };

  return config;
};

export default applyConfig;
