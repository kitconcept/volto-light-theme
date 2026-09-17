import React from 'react';
import LanguageSelector from '@plone/volto/components/theme/LanguageSelector/LanguageSelector';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import SlotRenderer from '@plone/volto/components/theme/SlotRenderer/SlotRenderer';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/useLiveData';

export const MobileToolsFooter = (props) => {
  const { content } = props;
  const header_actions = useLiveData(
    content,
    'voltolighttheme.header',
    'header_actions',
  );

  return (
    <>
      <div className="spacer"></div>
      <div className="mobile-tools">
        <div className="header-actions">
          <SlotRenderer name="headerTools" content={content} />

          {header_actions &&
            Array.isArray(header_actions) &&
            header_actions.map((item) => (
              <UniversalLink
                key={item['@id']}
                href={item.href?.[0]?.['@id']}
                openLinkInNewTab={item.openInNewTab}
              >
                {item.title}
              </UniversalLink>
            ))}
        </div>

        <LanguageSelector />
      </div>
    </>
  );
};
