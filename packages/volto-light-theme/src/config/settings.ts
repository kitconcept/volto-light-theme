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

  // Default background colors
  config.settings.backgroundColors = [
    {
      style: {
        '--theme-color': '#fff',
        '--theme-high-contrast-color': '#ecebeb',
        '--theme-font-color': '#000',
        '--theme-low-contrast-font-color': '#bebebe',
      },
      name: 'default',
      label: 'Default',
    },
    {
      style: {
        '--theme-color': '#ecebeb',
        '--theme-high-contrast-color': '#fff',
        '--theme-font-color': '#000',
        '--theme-low-contrast-font-color': '#bebebe',
      },
      name: 'grey',
      label: 'Grey',
    },
  ];

  // Default block widths
  config.settings.blockWidths = [
    {
      style: {
        '--block-width': 'var(--narrow-container-width)',
      },
      name: 'narrow',
      label: 'Narrow',
    },
    {
      style: {
        '--block-width': 'var(--default-container-width)',
      },
      name: 'default',
      label: 'Default',
    },
    {
      style: {
        '--block-width': 'var(--layout-container-width)',
      },
      name: 'layout',
      label: 'Layout',
    },
    {
      style: {
        '--block-width': '100%',
      },
      name: 'full',
      label: 'Full Width',
    },
  ];

  return config;
}
