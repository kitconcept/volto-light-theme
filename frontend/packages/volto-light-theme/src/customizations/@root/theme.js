/**
 * OVERRIDE theme.js
 * REASON: Enable the escape hatch to use SCSS as the theme entry point so VLT
 * can override the Semantic UI theme with `@kitconcept/volto-light-theme/theme/main.scss`.
 * FILE: https://github.com/plone/volto/blob/19.3.0/packages/volto/src/theme.js
 * FILE VERSION: Volto 19.3.0
 * DATE: 2022-12-14
 */

// This customization allows to enable the scape hatch to use
// SCSS as a theme to override the SemanticUI theme.
import 'semantic-ui-less/semantic.less';
import '@plone/volto/../theme/themes/pastanaga/extras/extras.less';
import '@kitconcept/volto-light-theme/theme/main.scss';
