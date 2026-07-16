/**
 * OVERRIDE Footer.jsx
 * REASON: VLT resolves the footer through the component registry so a project
 * can swap it via `config.settings.vlt.components.footer` instead of shadowing
 * this file. To replace it, register your own utility and flip the setting.
 */

import { getVLTComponent } from '@kitconcept/volto-light-theme/helpers/settings';

const Footer = (props) => {
  const FooterComponent = getVLTComponent('footer');
  return <FooterComponent {...props} />;
};

export default Footer;
