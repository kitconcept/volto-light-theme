import type { StyleDefinition } from '@plone/types';
import { v4 as uuid } from 'uuid';
import find from 'lodash/find';

/**
 * Generate empty blocks blocks/blocks_layout pair given the type
 * (could be empty, if not type given) and the number of blocks
 * @function blocksFormGenerator
 * @param number How many blocks to generate of the type (could be "empty", if no type provided)
 * @param type The type of the blocks
 * @return  pair filled with the generated blocks
 */
export function blocksFormGenerator(number: number, type: string, data: any) {
  const idMap = [...Array(number).keys()].map(() => uuid());
  const start = {
    blocks: {},
    blocks_layout: { items: idMap },
  };

  return {
    ...start,
    ...data,
    blocks: Object.fromEntries(
      start.blocks_layout.items.map((item) => [
        item,
        { '@type': type || 'empty' },
      ]),
    ),
  };
}

export function getCurrentStyleByName(
  styleDefinitions: Array<StyleDefinition>,
  fieldName: string,
  block: any,
) {
  let currentBlockColor;
  let currentBlockStyle = block?.styles?.[fieldName];
  // Find in color definitions the current style value
  if (currentBlockStyle) {
    const foundStyle = find(styleDefinitions, {
      style: currentBlockStyle,
    });
    currentBlockColor = foundStyle?.name;
  }

  return currentBlockColor;
}
