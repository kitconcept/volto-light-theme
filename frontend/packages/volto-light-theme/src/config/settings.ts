import type { ConfigType } from '@plone/registry';

declare module '@plone/types' {
  export interface SettingsConfig {
    slate: {
      useLinkedHeadings: boolean;
    };
  }
}

type apiExpanderInherit = {
  match: string;
  GET_CONTENT: string[];
  querystring:
    | { [key: string]: string }
    | ((
        config,
        querystring: { config: ConfigType; querystring: object },
      ) => { [key: string]: string });
};

export default function install(config: ConfigType) {
  const EXPANDERS_INHERIT_BEHAVIORS =
    'voltolighttheme.header,voltolighttheme.theme,voltolighttheme.footer,kitconcept.footer,kitconcept.sticky_menu';
  config.settings.enableAutoBlockGroupingByBackgroundColor = true;
  config.settings.navDepth = 3;
  config.settings.slate.useLinkedHeadings = false;
  config.settings.contentMetadataTagsImageField = 'preview_image';
  config.settings.querystringSearchGet = true;

  config.settings.slidingSearchAnimation = true;
  config.settings.openExternalLinkInNewTab = true;

  config.settings.blockModel = 2;

  config.settings.apiExpanders = [
    ...config.settings.apiExpanders,
    {
      match: '',
      GET_CONTENT: ['inherit'],
      querystring: (config, querystring) => {
        if (querystring['expand.inherit.behaviors']) {
          return {
            'expand.inherit.behaviors': querystring[
              'expand.inherit.behaviors'
            ].concat(',', EXPANDERS_INHERIT_BEHAVIORS),
          };
        } else {
          return {
            'expand.inherit.behaviors': EXPANDERS_INHERIT_BEHAVIORS,
          };
        }
      },
    } as apiExpanderInherit,
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
