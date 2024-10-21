import type { BlocksFormData } from '@plone/types';
import config from '@plone/volto/registry';

function* visitBlocks(blocks) {
  for (const key in blocks) {
    if (blocks.hasOwnProperty(key)) {
      const block = blocks[key];
      yield block;
      if (block.blocks) {
        yield* visitBlocks(block.blocks);
      }
    }
  }
}

export function migrateToVLT6ColorAndWidthModel(data: BlocksFormData) {
  const NORMALIZED_WIDTHS = [
    ...config.settings.blockWidths,
    {
      style: {
        '--block-width': 'var(--default-container-width)',
      },
      name: 'wide',
      label: 'Default',
    },
  ];

  for (const block of visitBlocks(data.blocks)) {
    if (block?.styles?.backgroundColor) {
      block.styles['backgroundColor:noprefix'] =
        config.settings.backgroundColors.find(
          (color) => color.name === block.styles.backgroundColor,
        )?.style;
      delete block.styles.backgroundColor;
      console.log(block);
    }

    if (block?.styles?.buttonAlign) {
      block.styles['blockWidth:noprefix'] = NORMALIZED_WIDTHS.find(
        (width) => width.name === block.styles.buttonAlign,
      )?.style;
      delete block.styles.buttonAlign;
      console.log(block);
    }
  }
}
