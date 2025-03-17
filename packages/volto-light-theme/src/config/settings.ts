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
  config.settings.enableFatMenu = true;
  config.settings.slate.useLinkedHeadings = false;
  config.settings.contentMetadataTagsImageField = 'preview_image';
  config.settings.querystringSearchGet = true;

  config.settings.siteLabel = '';
  config.settings.intranetHeader = false;

  config.settings.slidingSearchAnimation = true;
  config.settings.openExternalLinkInNewTab = true;

  config.settings.apiExpanders = [
    ...config.settings.apiExpanders,
    {
      match: '',
      GET_CONTENT: ['inherit'],
      querystring: {
        'expand.inherit.behaviors':
          'kitconcept.sitecustomization.header,kitconcept.sitecustomization.theme,kitconcept.sitecustomization.footer',
      },
    },
  ];

  return config;
}
