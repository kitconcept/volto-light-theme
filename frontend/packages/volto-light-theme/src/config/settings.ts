import type { ConfigType } from '@plone/registry';

declare module '@plone/types' {
  export interface SettingsConfig {
    slate: {
      useLinkedHeadings: boolean;
    };
  }
}

export default function install(config: ConfigType) {
  config.settings.enableAutoBlockGroupingByBackgroundColor = true;
  config.settings.navDepth = 3;
  config.settings.slate.useLinkedHeadings = false;
  config.settings.contentMetadataTagsImageField = 'preview_image';
  config.settings.querystringSearchGet = true;

  config.settings.slidingSearchAnimation = true;
  config.settings.openExternalLinkInNewTab = true;

  config.settings.apiExpanders = [
    ...config.settings.apiExpanders,
    {
      match: '',
      GET_CONTENT: ['inherit'],
      querystring: {
        'expand.inherit.behaviors':
          'voltolighttheme.header,voltolighttheme.theme,voltolighttheme.footer',
      },
    },
  ];

  config.settings.colorMap = {
    primary_color: {
      colorPair: 'primary_foreground_color',
      default: '#ffffff',
    },
    primary_foreground_color: {
      colorPair: 'primary_color',
      default: '#000000',
    },
    secondary_color: {
      colorPair: 'secondary_foreground_color',
      default: '#ecebeb',
    },
    secondary_foreground_color: {
      colorPair: 'secondary_color',
      default: '#000000',
    },
    accent_color: { colorPair: 'accent_foreground_color', default: '#ecebeb' },
    accent_foreground_color: { colorPair: 'accent_color', default: '#ffffff' },
  };

  return config;
}
