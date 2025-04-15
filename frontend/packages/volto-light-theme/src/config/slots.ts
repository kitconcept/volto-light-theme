import type { ConfigType } from '@plone/registry';
import Theming from '../components/Theming/Theming';
import FooterLogos from '../components/Footer/FooterLogos';
import FollowUsLogoAndLinks from '../components/Footer/FollowUsLogoAndLinks';
import Colophon from '../components/Footer/slots/Colophon';

export default function install(config: ConfigType) {
  config.registerSlotComponent({
    slot: 'aboveHeader',
    name: 'Theming',
    component: Theming,
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
