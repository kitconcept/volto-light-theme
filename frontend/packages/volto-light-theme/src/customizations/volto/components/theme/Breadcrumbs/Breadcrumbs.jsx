/**
 * OVERRIDE Breadcrumbs.jsx
 * REASON: VLT resolves the breadcrumbs through the component registry so a
 * project can swap it via `config.settings.vlt.components.breadcrumbs` instead
 * of shadowing this file. To replace it, register your own utility and flip the
 * setting.
 */

import { getVLTComponent } from '@kitconcept/volto-light-theme/helpers/settings';

const Breadcrumbs = (props) => {
  const BreadcrumbsComponent = getVLTComponent('breadcrumbs');
  return <BreadcrumbsComponent {...props} />;
};

export default Breadcrumbs;
