/**
 * OVERRIDE SearchWidget.jsx
 * REASON: VLT resolves the search widget through the component registry so a
 * project can swap it via `config.settings.vlt.components.searchWidget` instead
 * of shadowing this file. To replace it, register your own utility and flip the
 * setting.
 */

import { getVLTComponent } from '@kitconcept/volto-light-theme/helpers/settings';

const SearchWidget = (props) => {
  const SearchWidgetComponent = getVLTComponent('searchWidget');
  return <SearchWidgetComponent {...props} />;
};

export default SearchWidget;
