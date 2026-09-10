/**
 * OVERRIDE LanguageSelector.tsx
 * REASON: VLT resolves the language selector through the component registry so
 * a project can swap it via `config.settings.vlt.components.languageSelector`
 * instead of shadowing this file. To replace it, register your own utility and
 * flip the setting.
 * FILE: https://github.com/plone/volto/blob/19.3.0/packages/volto/src/components/theme/LanguageSelector/LanguageSelector.tsx
 * FILE VERSION: Volto 19.3.0
 * DATE: 2026-02-09
 */

import { getVLTComponent } from '@kitconcept/volto-light-theme/helpers/settings';

const LanguageSelector = (props) => {
  const LanguageSelectorComponent = getVLTComponent('languageSelector');
  return <LanguageSelectorComponent {...props} />;
};

export default LanguageSelector;
