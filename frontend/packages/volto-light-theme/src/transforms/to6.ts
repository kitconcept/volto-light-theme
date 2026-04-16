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

    if (block['@type'] === 'image') {
      const align = block?.align;
      const alignmentValue =
        align === 'left'
          ? 'var(--align-left)'
          : align === 'right'
            ? 'var(--align-right)'
            : 'var(--align-center)';

      const isFloating = align === 'left' || align === 'right';
      const isFloatingLarge =
        isFloating &&
        (block?.styles?.['size:noprefix'] === 'var(--size-large)' ||
          block?.size === 'l');

      const blockWidthValue =
        align === 'wide' || isFloatingLarge
          ? { '--block-width': 'var(--default-container-width)' }
          : align === 'full'
            ? { '--block-width': '100%' }
            : { '--block-width': 'var(--narrow-container-width)' };

      block.styles = {
        ...block?.styles,
        'align:noprefix': block?.styles?.['align:noprefix'] ?? {
          '--block-alignment': alignmentValue,
        },
        'blockWidth:noprefix': isFloating
          ? blockWidthValue
          : block?.styles?.['blockWidth:noprefix'] ?? blockWidthValue,
      };

      delete block.align;
    }

    if (block['@type'] === 'video' || block['@type'] === 'maps') {
      const align = block?.align;
      const isFloating = align === 'left' || align === 'right';

      const alignmentValue = isFloating
        ? align === 'left'
          ? 'var(--align-left)'
          : 'var(--align-right)'
        : 'var(--align-center)';

      const blockWidthValue =
        isFloating || align === 'wide'
          ? { '--block-width': 'var(--default-container-width)' }
          : align === 'full'
            ? { '--block-width': '100%' }
            : { '--block-width': 'var(--narrow-container-width)' };

      block.styles = {
        ...block?.styles,
        'align:noprefix': block?.styles?.['align:noprefix'] ?? {
          '--block-alignment': alignmentValue,
        },
        'blockWidth:noprefix': blockWidthValue,
      };

      delete block.align;
    }
  }
}
