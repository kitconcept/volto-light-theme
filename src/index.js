import { defineMessages } from 'react-intl';

import { composeSchema, getPreviousNextBlock } from '@plone/volto/helpers';
import { defaultStylingSchema } from './components/Blocks/schema';
import { teaserSchemaEnhancer } from './components/Blocks/Teaser/schema';
import { gridTeaserDisableStylingSchema } from '@plone/volto/components/manage/Blocks/Teaser/schema';

import ContainerQueriesPolyfill from './components/CQPolyfill';
import Container from './components/Atoms/Container/Container';
import TopSideFacets from './components/Blocks/Search/TopSideFacets';

import GridListingBlockTemplate from './components/Blocks/Listing/GridTemplate';
import { ButtonStylingSchema } from './components/Blocks/Button/schema';

import { AccordionSchemaEnhancer } from './components/Blocks/Accordion/schema';

import gridSVG from './icons/block_icn_grid.svg';
import accordionSVG from './icons/block_icn_accordion.svg';
import EventView from './components/Theme/EventView';

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
  config.settings.navDepth = 3;

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
      GET_CONTENT: ['breadcrumbs', 'actions', 'types'],
    },
    {
      match: '',
      GET_CONTENT: ['navigation'],
      querystring: {
        'expand.navigation.depth': config.settings.navDepth,
      },
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

      // Inject a class depending if it has a headline
      if (data?.headline || previousBlock?.['@type'] === 'heading') {
        styles.push('has--headline');
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

  config.blocks.blocksConfig.accordion = {
    ...config.blocks.blocksConfig.accordion,
    mostUsed: true,
    icon: accordionSVG,
    allowedBlocks: ['slate', 'teaser', 'image', 'listing', 'slateTable'],
    colors: BG_COLORS,
    schemaEnhancer: composeSchema(
      AccordionSchemaEnhancer,
      defaultStylingSchema,
    ),
    sidebarTab: 1,
  };

  config.blocks.blocksConfig.accordion.blocksConfig = {
    ...config.blocks.blocksConfig,
    teaser: {
      ...config.blocks.blocksConfig.teaser,
      schemaEnhancer: composeSchema(
        gridTeaserDisableStylingSchema,
        teaserSchemaEnhancer,
      ),
    },
  };

  config.blocks.blocksConfig.gridBlock = {
    ...config.blocks.blocksConfig.gridBlock,
    colors: BG_COLORS,
    schemaEnhancer: defaultStylingSchema,
    icon: gridSVG,
    gridAllowedBlocks: ['teaser', 'image', 'slate'],
    // One could customize the blocks inside the grid like this:
    blocksConfig: {
      ...config.blocks.blocksConfig,
      slate: {
        ...config.blocks.blocksConfig.slate,
        // Slate in grids must have an extra wrapper with the `slate` className
        view: (props) => {
          const EnhancedSlateViewComponent =
            config.blocks.blocksConfig.slate.view;
          return (
            <div className="slate">
              <EnhancedSlateViewComponent {...props} />
            </div>
          );
        },
      },
      teaser: {
        ...config.blocks.blocksConfig.teaser,
        schemaEnhancer: composeSchema(
          gridTeaserDisableStylingSchema,
          teaserSchemaEnhancer,
        ),
      },
    },
  };

  config.blocks.blocksConfig.introduction = {
    ...config.blocks.blocksConfig.introduction,
    unwantedButtons: ['heading-three', 'blockquote'],
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
    schemaEnhancer: composeSchema(defaultStylingSchema, teaserSchemaEnhancer),
  };

  config.blocks.blocksConfig.heading = {
    ...config.blocks.blocksConfig.heading,
    sidebarTab: 0,
    allowed_headings: [['h2', 'h2']],
    colors: BG_COLORS,
    schemaEnhancer: defaultStylingSchema,
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

  // Check if the separator is present before enhancing it
  if (config.blocks.blocksConfig.separator.id) {
    config.blocks.blocksConfig.separator = {
      ...config.blocks.blocksConfig.separator,
      schemaEnhancer: composeSchema(
        config.blocks.blocksConfig.separator.schemaEnhancer,
        defaultStylingSchema,
      ),
      colors: BG_COLORS,
    };
  }

  config.blocks.blocksConfig.listing = {
    ...config.blocks.blocksConfig.listing,
    colors: BG_COLORS,
    schemaEnhancer: defaultStylingSchema,
    allowed_headline_tags: [['h2', 'h2']],
    variations: [
      ...config.blocks.blocksConfig.listing.variations,
      {
        id: 'grid',
        title: 'Grid',
        template: GridListingBlockTemplate,
      },
    ],
  };
  config.views.contentTypesViews.Event = EventView;

  return config;
};

export const withContainerQueryPolyfill = (config) => {
  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '',
      component: ContainerQueriesPolyfill,
    },
  ];

  return config;
};

export default applyConfig;
