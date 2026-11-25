import { useRef } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import type { Content } from '@plone/types';

type FormState = {
  content: {
    data: Content | null;
    get?: { error?: unknown };
  };
};

/**
 * Returns `state.content.data`, but keeps the last loaded content while
 * Volto resets it to `null` before fetching a new page (e.g. when leaving
 * the control panel, contents, sharing or history views). This avoids the
 * header, footer and logo falling back to their defaults for a moment.
 * When the content request failed, `null` is returned as usual, so error
 * pages keep using `errorContext`.
 */
export function useStickyContent(): Content {
  const content = useSelector<FormState, Content | null>(
    (state) => state.content.data,
    shallowEqual,
  );
  const hasError = useSelector<FormState, boolean>(
    (state) => !!state.content.get?.error,
  );
  const lastContent = useRef<Content | null>(content);

  if (content) {
    lastContent.current = content;
    return content;
  }

  return (hasError ? content : lastContent.current) as Content;
}
