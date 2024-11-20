import type { BlocksFormData } from '@plone/types';
import { findStyleByName } from '@plone/volto/helpers/Blocks/Blocks';

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
    ...config.blocks.widths,
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
      block.theme = block.styles.backgroundColor;
      delete block.styles.backgroundColor;
    }

    if (block?.styles?.buttonAlign) {
      block.styles['blockWidth:noprefix'] = findStyleByName(
        NORMALIZED_WIDTHS,
        block.styles.buttonAlign,
      );
      delete block.styles.buttonAlign;
    }

    if (
      block['@type'] === 'image' &&
      block?.align &&
      (block?.align === 'wide' || block?.align === 'full')
    ) {
      block.styles['blockWidth:noprefix'] = findStyleByName(
        NORMALIZED_WIDTHS,
        block.align,
      );
      block.align = 'center';
    }

    if (block['@type'] === 'image' && !block?.styles?.['blockWidth:noprefix']) {
      block.styles = {
        ...block.styles,
        'blockWidth:noprefix': findStyleByName(NORMALIZED_WIDTHS, 'default'),
      };
    }
  }
}
