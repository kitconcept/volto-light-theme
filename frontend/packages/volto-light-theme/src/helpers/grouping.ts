import isEmpty from 'lodash/isEmpty';
import type { BlocksData } from '@plone/types';

export function groupByBGColor(
  blocks: BlocksData['blocks'],
  blocks_layout: BlocksData['blocks_layout'],
) {
  const result: Array<Array<string>> = [];
  let currentArr: Array<string> = [];
  let currentBGColor: string;

  // Guard in case the block layout is empty or corrupted for some reason
  if (blocks_layout.items.length === 0 || isEmpty(blocks)) {
    return [];
  }

  blocks_layout.items.forEach((blockId) => {
    let currentBlockColor = blocks[blockId]?.theme || 'default';
    if (currentBlockColor !== currentBGColor) {
      currentBGColor = currentBlockColor;
      // write it only if the array has some block inside
      if (currentArr.length > 0) {
        result.push(currentArr);
        currentArr = [];
      }
    }

    currentArr.push(blockId);
  });
  result.push(currentArr);
  return result;
}
