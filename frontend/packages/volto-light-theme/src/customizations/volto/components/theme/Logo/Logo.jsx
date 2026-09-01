/**
 * OVERRIDE Logo.jsx
 * REASON: VLT resolves the logo through the component registry so a project can
 * swap it via `config.settings.vlt.components.logo` instead of shadowing this
 * file. To replace it, register your own utility and flip the setting.
 */

import { getVLTComponent } from '@kitconcept/volto-light-theme/helpers/settings';

const Logo = (props) => {
  const LogoComponent = getVLTComponent('logo');
  return <LogoComponent {...props} />;
};

export default Logo;
