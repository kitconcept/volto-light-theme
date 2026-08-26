/**
 * OVERRIDE Tags.jsx
 * REASON: VLT resolves the tags through the component registry so a project can
 * swap it via `config.settings.vlt.components.tags` instead of shadowing this
 * file. To replace it, register your own utility and flip the setting.
 */

import { getVLTComponent } from '@kitconcept/volto-light-theme/helpers/settings';

const Tags = (props) => {
  const TagsComponent = getVLTComponent('tags');
  return <TagsComponent {...props} />;
};

export default Tags;
