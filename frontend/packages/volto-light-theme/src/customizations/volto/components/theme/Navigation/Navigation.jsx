/**
 * OVERRIDE Navigation.jsx
 * REASON: VLT resolves the navigation through the component registry so a
 * project can swap it via `config.settings.vlt.components.navigation` instead
 * of shadowing this file. To replace it, register your own utility and flip the
 * setting.
 */

import { getVLTComponent } from '@kitconcept/volto-light-theme/helpers/settings';

const Navigation = (props) => {
  const NavigationComponent = getVLTComponent('navigation');
  return <NavigationComponent {...props} />;
};

export default Navigation;
