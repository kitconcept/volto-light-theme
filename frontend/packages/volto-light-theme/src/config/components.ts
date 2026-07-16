import type { ComponentType } from 'react';
import type { ConfigType } from '@plone/registry';
import type { ComponentSlot } from '../helpers/settings';

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import LanguageSelector from '../components/LanguageSelector/LanguageSelector';
import Logo from '../components/Logo/Logo';
import MobileNavigation from '../components/MobileNavigation/MobileNavigation';
import Navigation from '../components/Navigation/Navigation';
import SearchWidget from '../components/SearchWidget/SearchWidget';
import Tags from '../components/Tags/Tags';

// The theme's own implementation for every swappable structural component,
// registered under the `vlt` name. Keying by `ComponentSlot` makes TypeScript
// require an entry here whenever a slot is added to `VLTSettings`.
const components: Record<ComponentSlot, ComponentType<any>> = {
  breadcrumbs: Breadcrumbs,
  footer: Footer,
  header: Header,
  languageSelector: LanguageSelector,
  logo: Logo,
  mobileNavigation: MobileNavigation,
  navigation: Navigation,
  searchWidget: SearchWidget,
  tags: Tags,
};

function registerComponents(config: ConfigType) {
  for (const [type, method] of Object.entries(components)) {
    config.registerUtility({ name: 'vlt', type, method });
  }
}

export default function install(config: ConfigType) {
  registerComponents(config);
  return config;
}
