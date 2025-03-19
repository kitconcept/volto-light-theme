import React from 'react';
import LanguageSelector from '@plone/volto/components/theme/LanguageSelector/LanguageSelector';

export const MobileToolsFooter = () => (
  <ul className="mobile-tools">
    <li>
      <LanguageSelector fullLabel={true} />
    </li>
  </ul>
);
