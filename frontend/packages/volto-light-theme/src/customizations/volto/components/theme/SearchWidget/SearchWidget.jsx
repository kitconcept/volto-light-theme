/**
 * OVERRIDE SearchWidget.jsx
 * REASON: VLT resolves the search widget through the component registry so a
 * project can swap it via `config.settings.vlt.components.searchWidget` instead
 * of shadowing this file. To replace it, register your own utility and flip the
 * setting.
 * FILE: https://github.com/plone/volto/blob/19.3.0/packages/volto/src/components/theme/SearchWidget/SearchWidget.jsx
 * FILE VERSION: Volto 19.3.0
 * DATE: 2022-11-03
 */

import { getVLTComponent } from '@kitconcept/volto-light-theme/helpers/settings';

const SearchWidget = (props) => {
  const SearchWidgetComponent = getVLTComponent('searchWidget');
  return <SearchWidgetComponent {...props} />;
};

export default SearchWidget;
