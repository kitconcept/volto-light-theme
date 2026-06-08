import type { BlocksFormData } from '@plone/types';

function* visitBlocks(blocks: any): Generator<any> {
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
          (block.styles?.buttonAlign === 'wide' ? 'default' : 'narrow'),
      };

      delete block.styles.buttonAlign;
    }

    if (block['@type'] === 'separator') {
      block.styles = {
        ...block.styles,
        shortLine:
          block.styles?.['shortLine'] ?? block?.styles?.align === 'left',
        'align:noprefix': block.styles?.['align:noprefix'] ?? 'left',
        'blockWidth:noprefix':
          block.styles?.['blockWidth:noprefix'] ??
          (block.styles?.align === 'full' ? 'default' : 'narrow'),
      };

      delete block.styles.align;
    }
  }
}
