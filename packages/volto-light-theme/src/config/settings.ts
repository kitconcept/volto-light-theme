import type { ConfigType } from '@plone/registry';

declare module '@plone/types' {
  export interface SettingsConfig {
    slate: {
      useLinkedHeadings: boolean;
    };
    userDefinedControlPanelColors: string[];
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
  config.settings.userDefinedControlPanelColors = [
    'accent_color',
    'accent_foreground_color',
    'primary_color',
    'primary_foreground_color',
    'secondary_color',
    'secondary_foreground_color',
  ];
  config.settings.colorPairMap = {
    primary_color: 'primary_foreground_color',
    primary_foreground_color: 'primary_color',
    secondary_color: 'secondary_foreground_color',
    secondary_foreground_color: 'secondary_color',
    accent_color: 'accent_foreground_color',
    accent_foreground_color: 'accent_color',
  };

  return config;
}
