/**
 * OVERRIDE DefaultTemplate.jsx
 * REASON: This was going to be removed when
 * https://github.com/plone/volto/pull/4848 was merged.
 * However, as per decission of the Volto Team, the team
 * will explore changing the headings inside a listing to a
 * better semantically structure, using no headings at all.
 * So, decission by Víctor (19/07/2023) to freeze this for now in the theme
 * still using h2 and change it (if appropiate) when the change is made.
 * To override it, override the @kitconcept/volto-light-theme one instead of
 * this one.
 * FILE: https://github.com/plone/volto/blob/19.3.0/packages/volto/src/components/manage/Blocks/Listing/DefaultTemplate.jsx
 * FILE VERSION: Volto 19.3.0
 * DATE: 2023-01-19
 */

import DefaultTemplate from '../../../../../../components/Blocks/Listing/DefaultTemplate';

export default DefaultTemplate;
