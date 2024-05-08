import { defineMessages } from 'react-intl';
import { cloneDeep, find } from 'lodash';

import { composeSchema, getPreviousNextBlock } from '@plone/volto/helpers';
import {
  defaultStylingSchema,
  removeStylingSchema,
} from './components/Blocks/schema';
import { teaserSchemaEnhancer } from './components/Blocks/Teaser/schema';
import { videoBlockSchemaEnhancer } from './components/Blocks/Video/schema';
import { gridTeaserDisableStylingSchema } from '@plone/volto/components/manage/Blocks/Teaser/schema';
import { gridImageDisableSizeAndPositionHandlersSchema } from '@plone/volto/components/manage/Blocks/Image/schema';
import { disableBgColorSchema } from './components/Blocks/disableBgColorSchema';
import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';

import ContainerQueriesPolyfill from './components/CQPolyfill';
import { Container } from '@plone/components';
import TopSideFacets from './components/Blocks/Search/TopSideFacets';

import GridListingBlockTemplate from './components/Blocks/Listing/GridTemplate';
import { ButtonStylingSchema } from './components/Blocks/Button/schema';

import { imageBlockSchemaEnhancer } from './components/Blocks/Image/schema';
import { ImageBlockDataAdapter } from './components/Blocks/Image/adapter';

import { AccordionSchemaEnhancer } from './components/Blocks/Accordion/schema';

import { searchBlockSchemaEnhancer } from './components/Blocks/Search/schema';

import gridSVG from './icons/block_icn_grid.svg';
import accordionSVG from './icons/block_icn_accordion.svg';
import descriptionSVG from '@plone/volto/icons/description.svg';
import EventView from './components/Theme/EventView';
import { tocBlockSchemaEnhancer } from './components/Blocks/Toc/schema';
import { mapsBlockSchemaEnhancer } from './components/Blocks/Maps/schema';
import { sliderBlockSchemaEnhancer } from './components/Blocks/Slider/schema';
import EventMetadataView from './components/Blocks/EventMetadata/View';
import BlockWidthWidget from './components/Widgets/BlockWidthWidget';

import {
  ImagefullIcon,
  ImagerightIcon,
  ImagefitIcon,
  BoldIcon,
  LinkIcon,
  ItalicIcon,
  ImageleftIcon,
  BackgroundIcon,
} from '@plone/components';

const BG_COLORS = [
  { name: 'white', label: 'White' },
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

function getCurrentStyleName(colorDefinitions, block) {
  let currentBlockColor;
  let currentBlockStyle = block?.styles?.['backgroundColor:noprefix'];
  // Find in color definitions the current style value
  if (currentBlockStyle) {
    currentBlockColor = find(colorDefinitions, {
      style: currentBlockStyle,
    }).name;
  }

  return currentBlockColor;
}

const applyConfig = (config) => {
  config.settings.blockModel = 3;
  config.settings.enableAutoBlockGroupingByBackgroundColor = true;
  config.settings.navDepth = 3;
  config.settings.enableFatMenu = true;
  config.settings.slate.useLinkedHeadings = false;
  config.settings.contentMetadataTagsImageField = 'preview_image';

  config.settings.backgroundColors = [
    {
      style: {
        '--background-color': 'white',
      },
      name: 'white',
      label: 'Transparent',
    },
    {
      style: {
        '--background-color': '#ecebeb',
      },
      name: 'grey',
      label: 'Grey',
    },
  ];

  config.widgets.widget.blockWidth = BlockWidthWidget;

  // Initial block for event content type
  config.blocks.initialBlocks = {
    Event: [
      { '@type': 'title' },
      { '@type': 'eventMetadata', fixed: true, required: true },
      { '@type': 'slate' },
    ],
  };

  config.settings.siteLabel = '';
  config.settings.intranetHeader = false;

  // Remove Hero Block
  if (config.blocks.blocksConfig?.hero) {
    config.blocks.blocksConfig.hero.restricted = true;
  }

  // No required blocks (eg. Title)
  config.blocks.requiredBlocks = [
    ...config.blocks.requiredBlocks,
    'eventMetadata',
  ];

  // VLT uses the new button
  config.experimental.addBlockButton.enabled = true;

  // Register our custom Container component
  config.registerComponent({
    name: 'Container',
    component: Container,
  });

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
        previousBlock?.styles?.['backgroundColor:noprefix']?.[
          '--background-color'
        ] ?? 'white';
      const currentColor =
        data?.styles?.['backgroundColor:noprefix']?.['--background-color'] ??
        'white';
      const nextColor =
        nextBlock?.styles?.['backgroundColor:noprefix']?.[
          '--background-color'
        ] ?? 'white';

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

      // Convenience class for the current block's background color for not having to
      // rely on a style color selector
      if (getCurrentStyleName(config.settings.backgroundColors, data)) {
        styles.push(
          `has--backgroundColor--${getCurrentStyleName(
            config.settings.backgroundColors,
            data,
          )}`,
        );
      }

      return [...classNames, ...styles];
    },
  ];

  config.settings.slidingSearchAnimation = true;
  config.settings.openExternalLinkInNewTab = true;

  config.blocks.blocksConfig.title = {
    ...config.blocks.blocksConfig.title,
    category: 'heading',
    blockModel: 3,
  };

  config.blocks.blocksConfig.accordion = {
    ...config.blocks.blocksConfig.accordion,
    mostUsed: true,
    icon: accordionSVG,
    allowedBlocks: [
      'slate',
      'teaser',
      'image',
      'listing',
      'slateTable',
      'separator',
    ],
    colors: BG_COLORS,
    schemaEnhancer: composeSchema(
      AccordionSchemaEnhancer,
      defaultStylingSchema,
    ),
    sidebarTab: 1,
  };

  config.blocks.blocksConfig.slateTable = {
    ...config.blocks.blocksConfig.slateTable,
    schemaEnhancer: defaultStylingSchema,
    colors: BG_COLORS,
    sidebarTab: 1,
  };

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

  config.blocks.blocksConfig.image = {
    ...config.blocks.blocksConfig.image,
    schemaEnhancer: imageBlockSchemaEnhancer,
    dataAdapter: ImageBlockDataAdapter,
  };

  // Accordion internal `blocksConfig` amendments
  // We cloneDeep the blocksConfig to avoid modifying the original object
  // in subsequent modifications of the accordion block config
  config.blocks.blocksConfig.accordion.blocksConfig = cloneDeep(
    config.blocks.blocksConfig,
  );

  config.blocks.blocksConfig.accordion.blocksConfig.teaser.schemaEnhancer =
    composeSchema(teaserSchemaEnhancer, disableBgColorSchema);

  config.blocks.blocksConfig.gridBlock.colors = BG_COLORS;
  config.blocks.blocksConfig.gridBlock.schemaEnhancer = defaultStylingSchema;
  config.blocks.blocksConfig.gridBlock.icon = gridSVG;

  // Grids internal `blocksConfig` amendments
  // Slate in grids must have an extra wrapper with the `slate` className
  const OriginalSlateBlockView = config.blocks.blocksConfig.slate.view;
  config.blocks.blocksConfig.gridBlock.blocksConfig.slate.view = (props) => {
    return (
      <div className="slate">
        <OriginalSlateBlockView {...props} />
      </div>
    );
  };

  config.blocks.blocksConfig.gridBlock.blocksConfig.image.schemaEnhancer =
    composeSchema(
      imageBlockSchemaEnhancer,
      gridImageDisableSizeAndPositionHandlersSchema,
    );

  config.blocks.blocksConfig.gridBlock.blocksConfig.teaser.schemaEnhancer =
    composeSchema(gridTeaserDisableStylingSchema, teaserSchemaEnhancer);

  config.blocks.blocksConfig.gridBlock.blocksConfig.listing.allowed_headline_tags =
    [['h2', 'h2']];
  config.blocks.blocksConfig.gridBlock.blocksConfig.listingschemaEnhancer =
    removeStylingSchema;
  config.blocks.blocksConfig.gridBlock.blocksConfig.listingvariations = [];

  config.blocks.blocksConfig.introduction = {
    ...config.blocks.blocksConfig.introduction,
    unwantedButtons: ['heading-three', 'blockquote'],
  };

  config.blocks.blocksConfig.slate = {
    ...config.blocks.blocksConfig.slate,
    category: 'inline',
    colors: config.settings.backgroundColors,
    schemaEnhancer: defaultStylingSchema,
    sidebarTab: 1,
    blockModel: 3,
    toolbar: {
      buttons: {
        textFormatting: [
          {
            name: 'bold',
            icon: <BoldIcon />,
            label: 'Bold',
            isMenuShape: false,
          },
          {
            name: 'italic',
            icon: <ItalicIcon />,
            label: 'Italic',
            isMenuShape: false,
          },
          {
            name: 'link',
            icon: <LinkIcon />,
            label: 'Link',
            isMenuShape: false,
          },
        ],
        styling: [
          {
            name: 'backgroundColor',
            icon: <BackgroundIcon />,
            label: 'Background Color',
            isMenuShape: true,
            options: config.settings.backgroundColors,
          },
        ],
      },
    },
  };

  config.blocks.blocksConfig.teaser = {
    ...config.blocks.blocksConfig.teaser,
    group: 'teasers',
    imageScale: 'larger',
    colors: BG_COLORS,
    schemaEnhancer: composeSchema(defaultStylingSchema, teaserSchemaEnhancer),
  };

  config.blocks.blocksConfig.video = {
    ...config.blocks.blocksConfig.video,
    colors: BG_COLORS,
    schemaEnhancer: composeSchema(
      defaultStylingSchema,
      videoBlockSchemaEnhancer,
    ),
  };
  config.blocks.blocksConfig.maps = {
    ...config.blocks.blocksConfig.maps,
    colors: BG_COLORS,
    schemaEnhancer: composeSchema(
      defaultStylingSchema,
      mapsBlockSchemaEnhancer,
    ),
  };

  config.blocks.blocksConfig.heading = {
    ...config.blocks.blocksConfig.heading,
    sidebarTab: 0,
    allowed_headings: [['h2', 'h2']],
    colors: BG_COLORS,
    schemaEnhancer: defaultStylingSchema,
  };

  config.blocks.blocksConfig.search = {
    ...config.blocks.blocksConfig.search,
    schemaEnhancer: searchBlockSchemaEnhancer,
    variations: [
      {
        id: 'facetsTopSide',
        title: 'Facets on top',
        view: TopSideFacets,
        isDefault: true,
      },
    ],
  };

  config.blocks.blocksConfig.__button = {
    ...config.blocks.blocksConfig.__button,
    schemaEnhancer: ButtonStylingSchema,
    colors: BG_COLORS,
    blockModel: config.settings.blockModel,
    sidebarTab: 1,
    toolbar: {
      buttons: {
        styling: [
          {
            name: 'block-width',
            icon: <ImagefullIcon />,
            label: 'Block Width',
            isMenuShape: true,
            options: [
              {
                style: {
                  '--block-width': 'var(--narrow-container-width)',
                },
                name: 'narrow',
                label: 'Narrow',
                icon: <ImagefitIcon />,
              },
              {
                style: {
                  '--block-width': 'var(--default-container-width)',
                },
                name: 'default',
                label: 'Default',
                icon: <ImagefullIcon />,
              },
            ],
          },
          {
            name: 'alignment',
            icon: <ImagerightIcon />,
            label: 'Alignment',
            isMenuShape: true,
            options: [
              {
                style: {
                  '--block-align': 'left',
                },
                name: 'left',
                label: 'Left',
                icon: <ImageleftIcon />,
              },
              {
                style: {
                  '--block-align': 'center',
                },
                name: 'center',
                label: 'Center',
                icon: <ImagefitIcon />,
              },
              {
                style: {
                  '--block-align': 'right',
                },
                name: 'right',
                label: 'Right',
                icon: <ImagerightIcon />,
              },
            ],
          },
          {
            name: 'backgroundColor',
            icon: <BackgroundIcon />,
            label: 'Background Color',
            isMenuShape: true,
            options: config.settings.backgroundColors,
          },
        ],
      },
    },
  };

  config.blocks.blocksConfig.eventMetadata = {
    id: 'eventMetadata',
    title: 'EventMetadata',
    icon: descriptionSVG,
    group: 'common',
    view: EventMetadataView,
    edit: EventMetadataView,
    schema: BlockSettingsSchema,
    restricted: ({ properties, block }) =>
      properties['@type'] === 'Event' ? false : true,
    mostUsed: false,
    sidebarTab: 0,
  };

  // Check if the separator is present before enhancing it
  if (config.blocks.blocksConfig?.separator?.id) {
    config.blocks.blocksConfig.separator = {
      ...config.blocks.blocksConfig.separator,
      schemaEnhancer: composeSchema(
        config.blocks.blocksConfig.separator.schemaEnhancer,
        defaultStylingSchema,
      ),
      colors: BG_COLORS,
      blockModel: 3,
      category: 'separator',
    };
  }

  config.views.contentTypesViews.Event = EventView;

  // TOC Block
  config.blocks.blocksConfig.toc = {
    ...config.blocks.blocksConfig.toc,
    schemaEnhancer: composeSchema(tocBlockSchemaEnhancer, defaultStylingSchema),
    // remove horizontal variation
    variations: [config.blocks.blocksConfig.toc.variations[0]],
  };

  // Slider Block
  config.blocks.blocksConfig.slider = {
    ...config.blocks.blocksConfig.slider,
    schemaEnhancer: sliderBlockSchemaEnhancer,
  };

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
