import type { ConfigType } from '@plone/registry';
import NewsItemSummary from '../components/Summary/NewsItemSummary';
import EventSummary from '../components/Summary/EventSummary';
import FileSummary from '../components/Summary/FileSummary';
import PersonSummary from '../components/Summary/PersonSummary';

export default function install(config: ConfigType) {
  config.registerComponent({
    name: 'Summary',
    component: NewsItemSummary,
    dependencies: ['News Item'],
  });
  config.registerComponent({
    name: 'Summary',
    component: EventSummary,
    dependencies: ['Event'],
  });
  config.registerComponent({
    name: 'Summary',
    component: FileSummary,
    dependencies: ['File'],
  });
  config.registerComponent({
    name: 'Summary',
    component: PersonSummary,
    dependencies: ['Person'],
  });

  return config;
}
