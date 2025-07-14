import type { ConfigType } from '@plone/registry';

import { defineMessages } from 'react-intl';
import { Container } from '@plone/components';

import EventView from './components/Theme/EventView';

import { migrateToVLT6ColorAndWidthModel } from './transforms/to6';

import installSettings from './config/settings';
import installBlocks from './config/blocks';
import installClassExtenders from './config/classExtenders';
import installWidgets from './config/widgets';
import installSlots from './config/slots';
import installSummary from './config/summary';

import '@plone/components/dist/basic.css';

import type {
  CustomInheritBehavior,
  SiteHeaderSettings,
  SiteThemeSettings,
  SiteFooterSettings,
  StickyMenuSettings,
  PloneGobrSocialMediaSettings,
} from './types';

defineMessages({
  Press: {
    id: 'Press',
    defaultMessage: 'Press',
  },
  Sitemap: {
    id: 'Sitemap',
    defaultMessage: 'Sitemap',
  },
  List: {
    id: 'List',
    defaultMessage: 'List',
  },
  listWithImages: {
    id: 'List with images',
    defaultMessage: 'List with images',
  },
});

declare module '@plone/types' {
  export interface Content {
    footer_logos_container_width: string;
    footer_logos_size: string;
    post_footer_logo_link: string;
  }

  export interface Expanders {
    inherit: {
      'voltolighttheme.header': CustomInheritBehavior<SiteHeaderSettings>;
      'voltolighttheme.theme': CustomInheritBehavior<SiteThemeSettings>;
      'voltolighttheme.footer': CustomInheritBehavior<SiteFooterSettings>;
      'kitconcept.sticky_menu': CustomInheritBehavior<StickyMenuSettings>;
      'kitconcept.footer': CustomInheritBehavior<SiteFooterSettings>;
      'plonegovbr.socialmedia.settings': CustomInheritBehavior<PloneGobrSocialMediaSettings>;
    };
  }

  export interface ObjectBrowserItem {
    contact_email: string;
    contact_phone: string;
    contact_room: string;
    contact_website: string;
    contact_building: string;
  }
}

const applyConfig = (config: ConfigType) => {
  installSettings(config);
  installBlocks(config);
  installClassExtenders(config);
  installWidgets(config);
  installSlots(config);
  installSummary(config);

  // Register a custom Container component from @plone/components
  config.registerComponent({
    name: 'Container',
    component: Container,
  });

  config.registerUtility({
    name: 'migrateToVLT6ColorAndWidthModel',
    type: 'transform',
    dependencies: { reducer: 'content' },
    method: migrateToVLT6ColorAndWidthModel,
  });

  config.views.contentTypesViews.Event = EventView;

  return config;
};

export default applyConfig;
