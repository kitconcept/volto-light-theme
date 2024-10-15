import type { ConfigType } from '@plone/registry';
import Theming from '../components/Theming/Theming';

export default function install(config: ConfigType) {
  config.registerSlotComponent({
    slot: 'aboveContent',
    name: 'Theming',
    component: Theming,
  });

  return config;
}
