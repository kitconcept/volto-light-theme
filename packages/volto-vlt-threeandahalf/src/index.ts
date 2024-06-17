import type { ConfigType } from '@plone/registry';
import { composeSchema, getPreviousNextBlock } from '@plone/volto/helpers';
import { defaultStylingSchema } from '@kitconcept/volto-light-theme/components/Blocks/schema';
import BackgroundColorWidget from './components/Widgets/BackgroundColorWidget';
import BlockWidthWidget from './components/Widgets/BlockWidthWidget';
import BlockAlignmentWidget from './components/Widgets/BlockAlignmentWidget';
import { imageBlockSchemaEnhancer } from './components/Blocks/Image/schema';
import { getCurrentStyleByName } from './helpers';
import type { AvailableBlocks } from '@plone/types';
import '@plone/components/dist/basic.css';

export type StyleDefinition =
  | {
      name: string;
      label: string;
      style: Record<`--${string}`, string>;
    }
  | {
      name: string;
      label: string;
      style: undefined;
    };

// We extend the block types with the custom ones
declare module '@plone/types' {
  export interface SettingsConfig {
    backgroundColors: Array<StyleDefinition>;
    blockWidths: Array<StyleDefinition>;
  }

  export interface BlockConfigBase {
    colors?: StyleDefinition[];
  }

  export interface WidgetsConfigByWidget {
    BackgroundColorWidget: React.ComponentType<any>;
    blockWidth: React.ComponentType<any>;
    blockAlignment: React.ComponentType<any>;
  }
}

const applyConfig = (config: ConfigType) => {
  config.settings.backgroundColors = [
    {
      style: {
        '--background-color': '#fff',
      },
      name: 'white',
      label: 'White',
    },
    {
      style: {
        '--background-color': '#ecebeb',
        '--background-color-inverse': '#fff',
      },
      name: 'grey',
      label: 'Grey',
    },
  ];

  config.settings.blockWidths = [
    {
      style: {
        '--block-width': 'var(--narrow-container-width)',
      },
      name: 'narrow',
      label: 'Narrow',
    },
    {
      style: {
        '--block-width': 'var(--default-container-width)',
      },
      name: 'default',
      label: 'Default',
    },
    {
      style: {
        '--block-width': 'var(--layout-container-width)',
      },
      name: 'layout',
      label: 'Layout',
    },
    {
      style: {
        '--block-width': '100%',
      },
      name: 'full',
      label: 'Full Width',
    },
  ];

  config.widgets.widget.BackgroundColorWidget = BackgroundColorWidget;
  config.widgets.widget.blockWidth = BlockWidthWidget;
  config.widgets.widget.blockAlignment = BlockAlignmentWidget;

  // This removes the `CLASSNAMES_RESET` classes coming from vlr that are now wrong
  // and calculates them again
  config.settings.styleClassNameExtenders.push(
    ({ block, content, data, classNames }) => {
      const [previousBlock, nextBlock] = getPreviousNextBlock({
        content,
        block,
      });
      const CLASSNAMES_RESET = [
        'previous--has--same--backgroundColor',
        'previous--has--different--backgroundColor',
        'next--has--same--backgroundColor',
        'next--has--different--backgroundColor',
      ];
      classNames = classNames.filter(
        (className) => !CLASSNAMES_RESET.includes(className),
      );

      // Given a StyleWrapper defined `backgroundColor` style
      const previousColor =
        getCurrentStyleByName(
          config.settings.backgroundColors,
          'backgroundColor:noprefix',
          previousBlock,
        ) || 'transparent';

      const currentColor =
        getCurrentStyleByName(
          config.settings.backgroundColors,
          'backgroundColor:noprefix',
          data,
        ) || 'transparent';
      const nextColor =
        getCurrentStyleByName(
          config.settings.backgroundColors,
          'backgroundColor:noprefix',
          nextBlock,
        ) || 'transparent';

      // Inject a class depending if the previous block has the same `backgroundColor`
      if (currentColor === previousColor) {
        classNames.push('previous--has--same--backgroundColor');
      } else if (currentColor !== previousColor) {
        classNames.push('previous--has--different--backgroundColor');
      }

      // Inject a class depending if the next block has the same `backgroundColor`
      if (currentColor === nextColor) {
        classNames.push('next--has--same--backgroundColor');
      } else if (currentColor !== nextColor) {
        classNames.push('next--has--different--backgroundColor');
      }
      return classNames;
    },
  );

  // Blocks width convenience classes injection
  config.settings.styleClassNameExtenders.push(
    ({ data, classNames }: { data: any; classNames: Array<string> }) => {
      const currentBlockWidth =
        getCurrentStyleByName(
          config.settings.blockWidths,
          'blockWidth:noprefix',
          data,
        ) || 'default';
      if (currentBlockWidth) {
        return [...classNames, `has--block-width--${currentBlockWidth}`];
      }
      return classNames;
    },
  );

  config.settings.styleClassNameExtenders.push(
    ({ data, classNames }: { data: any; classNames: Array<string> }) => {
      const currentBlockWidth =
        getCurrentStyleByName(
          config.settings.blockWidths,
          'backgroundColor:noprefix',
          data,
        ) || 'transparent';
      if (currentBlockWidth) {
        // This has intentionally a different class name than in `vlt3`
        return [...classNames, `has--background-color--${currentBlockWidth}`];
      }
      return classNames;
    },
  );

  // @ts-ignore
  Object.keys(config.blocks.blocksConfig).forEach((block: AvailableBlocks) => {
    if (config.blocks.blocksConfig[block].colors) {
      config.blocks.blocksConfig[block].colors =
        config.settings.backgroundColors;
    }
  });

  config.blocks.blocksConfig.image = {
    ...config.blocks.blocksConfig.image,
    schemaEnhancer: composeSchema(
      config.blocks.blocksConfig.image.schemaEnhancer,
      defaultStylingSchema,
      imageBlockSchemaEnhancer,
    ),
  };

  return config;
};

export default applyConfig;
