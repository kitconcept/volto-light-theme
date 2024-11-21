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
      if (block.styles.backgroundColor === 'transparent') {
        block.styles.backgroundColor = 'default';
      }
      block.theme = block.styles.backgroundColor;
      delete block.styles.backgroundColor;
    }

    if (block['@type'] === '__button') {
      block.styles = {
        ...block.styles,
        'blockWidth:noprefix':
          block.styles?.['blockWidth:noprefix'] ??
          findStyleByName(
            NORMALIZED_WIDTHS,
            `${block.styles?.buttonAlign === 'wide' ? 'default' : 'narrow'}`,
          ),
      };

      delete block.styles.buttonAlign;
    }

    if (block['@type'] === 'separator') {
      block.styles = {
        ...block.styles,
        shortLine:
          block.styles?.['shortLine'] ?? block?.styles?.align === 'left'
            ? true
            : false,
        'align:noprefix': block.styles?.['align:noprefix'] ?? {
          '--block-alignment': 'var(--align-left)',
        },
        'blockWidth:noprefix':
          block.styles?.['blockWidth:noprefix'] ??
          findStyleByName(
            NORMALIZED_WIDTHS,
            `${block.styles?.align === 'full' ? 'default' : 'narrow'}`,
          ),
      };

      delete block.styles.align;
    }

    if (
      block['@type'] === 'image' &&
      !['left', 'right'].includes(block?.align)
    ) {
      block.styles = {
        ...block.styles,
        'blockWidth:noprefix':
          block.styles?.['blockWidth:noprefix'] ??
          findStyleByName(
            NORMALIZED_WIDTHS,
            block?.align === 'wide'
              ? 'default'
              : block?.align === 'center'
                ? 'narrow'
                : block.align,
          ),
      };
      block.align = 'center';
    }
  }
}
