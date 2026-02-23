import * as React from 'react';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';

const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

export const smartTextRenderer = (smartText) => {
  if (!smartText) return null;

  linkPattern.lastIndex = 0;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkPattern.exec(smartText)) !== null) {
    if (match.index > lastIndex) {
      parts.push(smartText.slice(lastIndex, match.index));
    }

    const [, text, href] = match;

    parts.push({
      type: 'link',
      text: text.trim(),
      href: href.trim(),
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < smartText.length) {
    parts.push(smartText.slice(lastIndex));
  }

  return parts.map((part, index) => {
    if (typeof part === 'string') {
      const segments = part.split(/\r\n|\r|\n/);

      return (
        <React.Fragment key={`text-${index}`}>
          {segments.map((segment, segmentIndex) => (
            <React.Fragment key={`text-${index}-${segmentIndex}`}>
              {segment}
              {segmentIndex < segments.length - 1 ? <br /> : null}
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    }

    return (
      <UniversalLink href={part.href} key={`link-${index}`}>
        {part.text}
      </UniversalLink>
    );
  });
};
