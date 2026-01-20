import type { ConfigType } from '@plone/registry';
import Theming from '../components/Theming/Theming';
import FooterLogos from '../components/Footer/slots/FooterLogos';
import FollowUsLogoAndLinks from '../components/Footer/slots/FollowUsLogoAndLinks';
import Colophon from '../components/Footer/slots/Colophon';
import StickyMenu from '../components/StickyMenu/StickyMenu';
import Anontools from '../components/Anontools/Anontools';

export default function install(config: ConfigType) {
  config.registerSlotComponent({
    slot: 'aboveHeader',
    name: 'Theming',
    component: Theming,
  });

  config.registerSlotComponent({
    slot: 'aboveHeader',
    name: 'StickyMenu',
    component: StickyMenu,
  });

  config.registerSlotComponent({
    slot: 'headerTools',
    name: 'Anontools',
    component: Anontools,
  });

  config.registerSlotComponent({
    name: 'footerLogos',
    slot: 'preFooter',
    component: FooterLogos,
  });

  config.registerSlotComponent({
    name: 'PostFooterFollowUsLogoAndLinks',
    slot: 'postFooter',
    component: FollowUsLogoAndLinks,
  });

  config.registerSlotComponent({
    name: 'Colophon',
    slot: 'postFooter',
    component: Colophon,
  });

  return config;
}
