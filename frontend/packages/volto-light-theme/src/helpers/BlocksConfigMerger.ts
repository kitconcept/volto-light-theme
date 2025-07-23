import type { BlocksConfig } from '@plone/types';
import cloneDeep from 'lodash/cloneDeep';
import type { MutatorDSL } from '../types';

// Utility type for deep recursive Partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : DeepPartial<T[P]>
    : T[P];
};

export function BlocksConfigMerger(
  blocksConfig: DeepPartial<BlocksConfig['blocksConfig']>,
  merger: MutatorDSL,
): BlocksConfig['blocksConfig'] {
  const mergedConfig = cloneDeep(blocksConfig);

  Object.entries(merger).forEach(([blockId, dsl]) => {
    if (!mergedConfig[blockId]) return;

    // 1. Disable block
    if (dsl.disable) {
      mergedConfig[blockId]!.restricted = true;
    }

    // 2. Filter variations
    if (Array.isArray(dsl.variations) && mergedConfig[blockId]!.variations) {
      mergedConfig[blockId]!.variations = mergedConfig[
        blockId
      ]!.variations!.filter((v) => dsl.variations!.includes(v.id));
    }

    // 3. Assign themes
    if (Array.isArray(dsl.themes)) {
      mergedConfig[blockId]!.themes = dsl.themes;
    }
  });

  return mergedConfig as BlocksConfig['blocksConfig'];
}
