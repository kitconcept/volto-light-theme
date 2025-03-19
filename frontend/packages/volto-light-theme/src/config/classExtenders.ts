import type { ConfigType } from '@plone/registry';
import { getPreviousNextBlock } from '@plone/volto/helpers/Blocks/Blocks';
import { getCurrentStyleByName } from '../helpers/helpers';

export default function install(config: ConfigType) {
  // Register custom StyleWrapper ClassNames
  config.settings.styleClassNameExtenders = [
    ({ block, content, data, classNames }) => {
      let styles = [];
      const [previousBlock, nextBlock] = getPreviousNextBlock({
        content,
        block,
      });

      // Inject a class depending of which type is the next block
      if (nextBlock?.['@type']) {
        styles.push(`next--is--${nextBlock['@type']}`);
      }

      // Inject a class depending if previous is the same type of block
      if (data?.['@type'] === previousBlock?.['@type']) {
        styles.push('previous--is--same--block-type');
      }

      // Inject a class depending if next is the same type of block
      if (data?.['@type'] === nextBlock?.['@type']) {
        styles.push('next--is--same--block-type');
      }

      // Inject a class depending if it's the first of block type
      if (data?.['@type'] !== previousBlock?.['@type']) {
        styles.push('is--first--of--block-type');
      }

      // Inject a class depending if it's the last of block type
      if (data?.['@type'] !== nextBlock?.['@type']) {
        styles.push('is--last--of--block-type');
      }

      // Inject a class depending if it has a headline
      if (data?.headline || previousBlock?.['@type'] === 'heading') {
        styles.push('has--headline');
      }

      // Given a StyleWrapper defined `backgroundColor` style
      const previousColor = previousBlock?.theme || 'default';

      const currentColor = data?.theme || 'default';

      const nextColor = nextBlock?.theme || 'default';

      // Inject a class depending if the previous block has the same `backgroundColor`
      if (currentColor === previousColor) {
        styles.push('previous--has--same--backgroundColor');
      } else if (currentColor !== previousColor) {
        styles.push('previous--has--different--backgroundColor');
      }

      // Inject a class depending if the next block has the same `backgroundColor`
      if (currentColor === nextColor) {
        styles.push('next--has--same--backgroundColor');
      } else if (currentColor !== nextColor) {
        styles.push('next--has--different--backgroundColor');
      }

      return [...classNames, ...styles];
    },
  ];

  // Blocks width convenience classes injection
  config.settings.styleClassNameExtenders.push(
    ({ data, classNames }: { data: any; classNames: Array<string> }) => {
      const currentBlockWidth =
        getCurrentStyleByName(
          config.blocks.widths,
          'blockWidth:noprefix',
          data,
        ) || 'default';
      if (currentBlockWidth) {
        return [...classNames, `has--block-width--${currentBlockWidth}`];
      }
      return classNames;
    },
  );

  config.settings.styleClassNameExtenders.push(
    ({ data, classNames }: { data: any; classNames: Array<string> }) => {
      const currentBlockBackgroundColor = data?.theme || 'default';
      if (currentBlockBackgroundColor) {
        // This has intentionally a different class name than in `VLT3`
        return [
          ...classNames,
          `has--background-color--${currentBlockBackgroundColor}`,
        ];
      }
      return classNames;
    },
  );

  return config;
}
