/**
 * OVERRIDE Header.jsx
 * REASON: VLT resolves the header through the component registry so a project
 * can swap it via `config.settings.vlt.components.header` instead of shadowing
 * this file. To replace it, register your own utility and flip the setting.
 */

import { getVLTComponent } from '@kitconcept/volto-light-theme/helpers/settings';

const Header = (props) => {
  const HeaderComponent = getVLTComponent('header');
  return <HeaderComponent {...props} />;
};

export default Header;
