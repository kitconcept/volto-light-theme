import config from '@plone/volto/registry';
import { findStyleByName } from '@plone/volto/helpers/Blocks/Blocks';
import isEmpty from 'lodash/isEmpty';

export function blockThemesEnhancer({ data, container }) {
  if (!data['@type']) return {};
  const blockConfig = config.blocks.blocksConfig[data['@type']];
  if (!blockConfig) return {};
  const blockStyleDefinitions =
    // We look up for the blockThemes in the block's config, then in the global config
    // We keep `colors` for BBB, but `themes` should be used
    blockConfig.themes || blockConfig.colors || config.blocks.themes || [];

  if (
    !isEmpty(container) &&
    container.theme &&
    (!data.theme || data.theme === 'default')
  ) {
    return findStyleByName(blockStyleDefinitions, container.theme);
  }
  if (data.theme) {
    return data.theme ? findStyleByName(blockStyleDefinitions, data.theme) : {};
  } else {
    // No theme, return default color
    return findStyleByName(config.blocks.themes, 'default');
  }
}

export function styleDefinitionsEnhancer({ data, container }) {
  let resultantStyles = {};
  Object.keys(data.styles || {}).forEach((fieldName) => {
    const styleFieldEnhancer = config.getUtility({
      type: 'styleFieldDefinition',
      name: fieldName,
    });

    if (styleFieldEnhancer.method) {
      resultantStyles = {
        ...resultantStyles,
        ...findStyleByName(
          styleFieldEnhancer.method({ data, container }),
          data.styles[fieldName],
        ),
      };
    }
  });

  return resultantStyles;
}
