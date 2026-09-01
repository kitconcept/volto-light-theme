import type { BlocksFormData, StyleDefinition } from '@plone/types';
import config from '@plone/volto/registry';

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

function alignmentLiteral(align: string | undefined): string {
  if (align === 'left') return 'left';
  if (align === 'right') return 'right';
  return 'center';
}

// The block alignments can be overridden per block, falling back to the global
// definitions, the same way themes work.
function alignmentsFor(block: any): StyleDefinition[] {
  return (
    config.blocks.blocksConfig?.[block['@type']]?.alignments ||
    config.blocks.alignments ||
    []
  );
}

// Pre-VLT8 the resolved CSS object was stored in the style field
// (e.g. `{ '--block-width': 'var(--narrow-container-width)' }`). VLT8 stores
// only the token literal (`narrow`) and resolves it at runtime through the
// `styleFieldDefinition` utility.
function normalizeStyleField(
  block: any,
  fieldName: string,
  definitions: StyleDefinition[],
) {
  const value = block?.styles?.[fieldName];
  if (!value || typeof value !== 'object') return;

  const match = definitions.find((definition) =>
    Object.entries(definition.style ?? {}).every(
      ([key, css]) => value[key] === css,
    ),
  );
  if (match) {
    block.styles[fieldName] = match.name;
  }
}

// Migrates the legacy `align` field of a media block to the `align:noprefix` /
// `blockWidth:noprefix` style literals. `sizeAware` images keep a narrow width
// while floating unless they are large; videos and maps always go to default.
function migrateMediaBlock(block: any, sizeAware: boolean) {
  const align = block?.align;
  const isFloating = align === 'left' || align === 'right';
  const isLarge =
    block?.styles?.['size:noprefix'] === 'var(--size-large)' ||
    block?.size === 'l';

  const isWide = align === 'wide' || (isFloating && (!sizeAware || isLarge));
  const width = isWide ? 'default' : align === 'full' ? 'full' : 'narrow';

  block.styles = {
    ...block?.styles,
    'align:noprefix':
      block?.styles?.['align:noprefix'] ?? alignmentLiteral(align),
    // While floating, the width is driven by the adapter, so it always wins;
    // otherwise an explicit width already on the block is kept.
    'blockWidth:noprefix': isFloating
      ? width
      : block?.styles?.['blockWidth:noprefix'] ?? width,
  };

  // Migrates the legacy `size` field to `size:noprefix`, resolved to the
  // `--media-size` CSS variable just like width & alignment.
  if (sizeAware) {
    const size =
      block?.size ??
      (block.styles['size:noprefix'] === 'var(--size-large)' ? 'l' : undefined);
    if (size) {
      block.styles['size:noprefix'] = size;
    }
    delete block.size;
  }

  delete block.align;
}

export function migrateToVLT8FloatingBlocks(data: BlocksFormData) {
  const widths = config.blocks.widths || [];

  for (const block of visitBlocks(data.blocks)) {
    // Rewrite any CSS object left over from before VLT8 to its token literal.
    normalizeStyleField(block, 'align:noprefix', alignmentsFor(block));
    normalizeStyleField(block, 'blockWidth:noprefix', widths);

    if (block['@type'] === 'image') {
      migrateMediaBlock(block, true);
    }

    if (block['@type'] === 'video' || block['@type'] === 'maps') {
      migrateMediaBlock(block, false);
    }

    // The button's legacy `inneralign` becomes the `align:noprefix` literal.
    if (block['@type'] === '__button') {
      if (block.inneralign) {
        block.styles = {
          ...block.styles,
          'align:noprefix':
            block.styles?.['align:noprefix'] ?? block.inneralign,
        };
      }
      delete block.inneralign;
    }
  }
}
