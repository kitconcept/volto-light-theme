import type { ConfigType } from '@plone/registry';
import type { StyleDefinition } from '../index';

declare module '@plone/types' {
  export interface SettingsConfig {
    slate: {
      useLinkedHeadings: boolean;
    };
    backgroundColors: Array<StyleDefinition>;
    blockWidths: Array<StyleDefinition>;
  }
}

export default function install(config: ConfigType) {
  config.settings.enableAutoBlockGroupingByBackgroundColor = true;
  config.settings.navDepth = 3;
  config.settings.enableFatMenu = true;
  config.settings.slate.useLinkedHeadings = false;
  config.settings.contentMetadataTagsImageField = 'preview_image';
  config.settings.querystringSearchGet = true;

  config.settings.siteLabel = '';
  config.settings.intranetHeader = false;

  config.settings.slidingSearchAnimation = true;
  config.settings.openExternalLinkInNewTab = true;

  return config;
}
