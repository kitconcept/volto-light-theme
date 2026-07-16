/**
 * OVERRIDE LanguageSelector.tsx
 * REASON: VLT resolves the language selector through the component registry so
 * a project can swap it via `config.settings.vlt.components.languageSelector`
 * instead of shadowing this file. To replace it, register your own utility and
 * flip the setting.
 */

import { getVLTComponent } from '@kitconcept/volto-light-theme/helpers/settings';

const LanguageSelector = (props) => {
  const LanguageSelectorComponent = getVLTComponent('languageSelector');
  return <LanguageSelectorComponent {...props} />;
};

export default LanguageSelector;
