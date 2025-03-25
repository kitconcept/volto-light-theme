import type { BlocksData } from '@plone/types';

export function groupByBGColor(
  blocks: BlocksData['blocks'],
  blocks_layout: BlocksData['blocks_layout'],
) {
  const result = [];
  let currentArr: string[] = [];
  let currentBGColor: string;

  blocks_layout.items.forEach((blockId) => {
    let currentBlockColor =
      blocks[blockId]?.styles?.backgroundColor ?? 'transparent';

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
