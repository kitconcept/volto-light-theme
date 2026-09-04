import type { ConfigType } from '@plone/registry';
import { getPreviousNextBlock } from '@plone/volto/helpers/Blocks/Blocks';

type StyleClassNameConverter = (
  name: string,
  value: unknown,
  prefix?: string,
) => string | null;

/**
 * Style fields whose value is a token literal (`narrow`, `left`, `l`) that a
 * `styleFieldDefinition` utility resolves at runtime into CSS custom
 * properties.
 *
 * They are declared with the `:noprefix` marker suffix, which core turns into
 * a class name equal to the raw token (`narrow`, `left`, `l`). We suppress
 * that and emit a single `has--<alias>--<token>` class per field from the
 * extender below instead.
 */
const STYLE_TOKEN_FIELDS: Record<string, { alias: string; fallback?: string }> =
  {
    blockWidth: { alias: 'block-width', fallback: 'default' },
    align: { alias: 'block-alignment' },
    size: { alias: 'media-size' },
  };

export default function install(config: ConfigType) {
  const converters = config.settings.styleClassNameConverters as Record<
    string,
    StyleClassNameConverter
  >;
  config.settings.styleClassNameConverters = {
    ...converters,
    noprefix: (name: string, value: unknown, prefix?: string) =>
      Object.prototype.hasOwnProperty.call(STYLE_TOKEN_FIELDS, name)
        ? null
        : converters.noprefix(name, value, prefix), // call original converter from core
  };

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

  // Convenience classes injection for the token style fields (block width,
  // alignment, and media size). We keep only these classnames and supress the bare token classnames.
  config.settings.styleClassNameExtenders.push(
    ({ data, classNames }: { data: any; classNames: Array<string> }) => [
      ...classNames,
      ...Object.entries(STYLE_TOKEN_FIELDS).flatMap(
        ([field, { alias, fallback }]) => {
          const stored = data?.styles?.[`${field}:noprefix`];

          if (stored != null && typeof stored !== 'string') return [];
          const token = stored || fallback;
          return token ? [`has--${alias}--${token}`] : [];
        },
      ),
    ],
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
