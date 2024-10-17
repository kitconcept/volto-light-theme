import type { ConfigType } from '@plone/registry';
import type { StyleDefinition } from '../index';

import { composeSchema } from '@plone/volto/helpers/Extensions';
import {
  defaultStylingSchema,
  removeStylingSchema,
} from '../components/Blocks/schema';
import { teaserSchemaEnhancer } from '../components/Blocks/Teaser/schema';
import { videoBlockSchemaEnhancer } from '../components/Blocks/Video/schema';
import { gridTeaserDisableStylingSchema } from '@plone/volto/components/manage/Blocks/Teaser/schema';
import { gridImageDisableSizeAndPositionHandlersSchema } from '@plone/volto/components/manage/Blocks/Image/schema';
import { disableBgColorSchema } from '../components/Blocks/disableBgColorSchema';

import TopSideFacets from '../components/Blocks/Search/TopSideFacets';

import GridListingBlockTemplate from '../components/Blocks/Listing/GridTemplate';
import { ButtonStylingSchema } from '../components/Blocks/Button/schema';

import { imageBlockSchemaEnhancer } from '../components/Blocks/Image/schema';
import { ImageBlockDataAdapter } from '../components/Blocks/Image/adapter';

import { AccordionSchemaEnhancer } from '../components/Blocks/Accordion/schema';

import { searchBlockSchemaEnhancer } from '../components/Blocks/Search/schema';

import gridSVG from './icons/block_icn_grid.svg';
import accordionSVG from './icons/block_icn_accordion.svg';
import descriptionSVG from '@plone/volto/icons/description.svg';

import { tocBlockSchemaEnhancer } from '../components/Blocks/Toc/schema';
import { mapsBlockSchemaEnhancer } from '../components/Blocks/Maps/schema';
import { sliderBlockSchemaEnhancer } from '../components/Blocks/Slider/schema';
import EventMetadataView from '../components/Blocks/EventMetadata/View';

declare module '@plone/types' {
  export interface BlocksConfigData {
    introduction: BlockConfigBase;
    heading: BlockConfigBase;
    __button: BlockConfigBase;
    separator: BlockConfigBase;
    slider: BlockConfigBase;
    eventMetadata: BlockConfigBase;
    accordion: BlockConfigBase;
    hero: BlockConfigBase;
    slateTable: BlockConfigBase;
  }
  export interface BlockConfigBase {
    colors?: StyleDefinition[];
    allowedBlocks?: string[];
    allowed_headline_tags?: string[][];
    dataAdapter?: any;
    unwantedButtons?: string[];
    imageScale?: string;
    allowed_headings?: string[][];
  }
  export interface BlocksFormData {
    headline: string;
    styles: string;
  }
}

export default function install(config: ConfigType) {
  // Initial block for event content type
  config.blocks.initialBlocks = {
    Event: [
      { '@type': 'title' },
      { '@type': 'eventMetadata', fixed: true, required: true },
      { '@type': 'slate' },
    ],
  };

  // No required blocks (eg. Title)
  config.blocks.requiredBlocks = [
    ...config.blocks.requiredBlocks,
    'eventMetadata',
  ];

  // Remove Hero Block (No longer in Volto 18)
  // TODO: Remove already?
  if (config.blocks.blocksConfig?.hero) {
    config.blocks.blocksConfig.hero.restricted = true;
  }

  // Default Blocks configuration

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
    colors: config.settings.backgroundColors,
    schemaEnhancer: composeSchema(
      AccordionSchemaEnhancer,
      defaultStylingSchema,
    ),
    sidebarTab: 1,
  };

  config.blocks.blocksConfig.slateTable = {
    ...config.blocks.blocksConfig.slateTable,
    schemaEnhancer: defaultStylingSchema,
    colors: config.settings.backgroundColors,
  };

  config.blocks.blocksConfig.listing = {
    ...config.blocks.blocksConfig.listing,
    colors: config.settings.backgroundColors,
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
    schemaEnhancer: composeSchema(
      defaultStylingSchema,
      imageBlockSchemaEnhancer,
    ),
    dataAdapter: ImageBlockDataAdapter,
  };

  // Accordion internal `blocksConfig` amendments
  // We cloneDeep the blocksConfig to avoid modifying the original object
  // in subsequent modifications of the accordion block config
  config.blocks.blocksConfig.accordion.blocksConfig = structuredClone(
    config.blocks.blocksConfig,
  );

  config.blocks.blocksConfig.accordion.blocksConfig.teaser.schemaEnhancer =
    composeSchema(teaserSchemaEnhancer, disableBgColorSchema);

  config.blocks.blocksConfig.gridBlock.colors =
    config.settings.backgroundColors;
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
  config.blocks.blocksConfig.gridBlock.blocksConfig.image.dataAdapter =
    ImageBlockDataAdapter;

  config.blocks.blocksConfig.gridBlock.blocksConfig.teaser.schemaEnhancer =
    composeSchema(gridTeaserDisableStylingSchema, teaserSchemaEnhancer);

  config.blocks.blocksConfig.gridBlock.blocksConfig.listing.allowed_headline_tags =
    [['h2', 'h2']];

  console.log(
    config.blocks.blocksConfig.gridBlock.blocksConfig.listingschemaEnhancer,
  );
  config.blocks.blocksConfig.gridBlock.blocksConfig.listingschemaEnhancer =
    removeStylingSchema;
  console.log(
    config.blocks.blocksConfig.gridBlock.blocksConfig.listingvariations,
  );
  config.blocks.blocksConfig.gridBlock.blocksConfig.listingvariations = [];

  config.blocks.blocksConfig.introduction = {
    ...config.blocks.blocksConfig.introduction,
    unwantedButtons: ['heading-three', 'blockquote'],
  };

  config.blocks.blocksConfig.slate = {
    ...config.blocks.blocksConfig.slate,
    colors: config.settings.backgroundColors,
    schemaEnhancer: defaultStylingSchema,
    sidebarTab: 1,
  };

  config.blocks.blocksConfig.teaser = {
    ...config.blocks.blocksConfig.teaser,
    group: 'teasers',
    imageScale: 'larger',
    colors: config.settings.backgroundColors,
    schemaEnhancer: composeSchema(defaultStylingSchema, teaserSchemaEnhancer),
  };

  config.blocks.blocksConfig.video = {
    ...config.blocks.blocksConfig.video,
    colors: config.settings.backgroundColors,
    schemaEnhancer: composeSchema(
      defaultStylingSchema,
      videoBlockSchemaEnhancer,
    ),
  };
  config.blocks.blocksConfig.maps = {
    ...config.blocks.blocksConfig.maps,
    colors: config.settings.backgroundColors,
    schemaEnhancer: composeSchema(
      defaultStylingSchema,
      mapsBlockSchemaEnhancer,
    ),
  };

  config.blocks.blocksConfig.heading = {
    ...config.blocks.blocksConfig.heading,
    sidebarTab: 0,
    allowed_headings: [['h2', 'h2']],
    colors: config.settings.backgroundColors,
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
    colors: config.settings.backgroundColors,
  };

  config.blocks.blocksConfig.eventMetadata = {
    id: 'eventMetadata',
    title: 'EventMetadata',
    icon: descriptionSVG,
    group: 'common',
    view: EventMetadataView,
    edit: EventMetadataView,
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
      colors: config.settings.backgroundColors,
    };
  }

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
}
