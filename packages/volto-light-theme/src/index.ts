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

import '@plone/components/dist/basic.css';

defineMessages({
  Press: {
    id: 'Press',
    defaultMessage: 'Press',
  },
  Sitemap: {
    id: 'Sitemap',
    defaultMessage: 'Sitemap',
  },
});

const applyConfig = (config: ConfigType) => {
  installSettings(config);
  installBlocks(config);
  installClassExtenders(config);
  installWidgets(config);
  installSlots(config);

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