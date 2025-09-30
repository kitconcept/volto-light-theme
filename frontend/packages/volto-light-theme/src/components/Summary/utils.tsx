import * as React from 'react';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';

const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

export const renderDescription = (description) => {
  if (!description) return null;

  linkPattern.lastIndex = 0;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkPattern.exec(description)) !== null) {
    if (match.index > lastIndex) {
      parts.push(description.slice(lastIndex, match.index));
    }

    const [, text, href] = match;

    parts.push({
      type: 'link',
      text: text.trim(),
      href: href.trim(),
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < description.length) {
    parts.push(description.slice(lastIndex));
  }

  return parts.map((part, index) => {
    if (typeof part === 'string') {
      return <React.Fragment key={`text-${index}`}>{part}</React.Fragment>;
    }

    return (
      <UniversalLink href={part.href} key={`link-${index}`}>
        {part.text}
      </UniversalLink>
    );
  });
};
