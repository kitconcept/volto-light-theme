import type { BlocksFormData } from '@plone/types';

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

function getAlignmentValue(align: string | undefined): string {
  if (align === 'left') return 'var(--align-left)';
  if (align === 'right') return 'var(--align-right)';
  return 'var(--align-center)';
}

export function migrateToVLT8FloatingBlocks(data: BlocksFormData) {
  for (const block of visitBlocks(data.blocks)) {
    if (block['@type'] === 'image') {
      const align = block?.align;
      const isFloating = align === 'left' || align === 'right';
      const alignmentValue = getAlignmentValue(align);

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
      const alignmentValue = getAlignmentValue(align);

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
        'blockWidth:noprefix': isFloating
          ? blockWidthValue
          : block?.styles?.['blockWidth:noprefix'] ?? blockWidthValue,
      };

      delete block.align;
    }
  }
}
