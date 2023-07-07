/**
 * OVERRIDE View.jsx
 * REASON: The theme's vertical spacing rules ask for a custom gap between
 * consecutive same-color listing blocks when the second one does not have a headline,
 * so a class 'no-headline' was added. This customization could be removed when Firefox
 * offers support for :has() pseudo-class.
 * To override it, override the @kitconcept/volto-light-theme one instead of
 * this one.
 */

import View from '../../../../../../components/Blocks/Listing/View';

export default View;
