import type { BlocksFormData, ObjectBrowserItem } from '@plone/types';

export const buildTeaserItem = (
  data: BlocksFormData | { '@id'?: string; overwrite?: boolean } | null,
  href: Partial<ObjectBrowserItem>,
) => {
  const { '@id': _id, ...filteredData } = data || {};

  if (!data?.overwrite) {
    return href || {};
  }

  const keysToUnset =
    href && typeof href === 'object'
      ? Object.keys(href).filter(
          (key) => key !== '@id' && !(key in filteredData),
        )
      : [];

  const undefinedOverrides = Object.fromEntries(
    keysToUnset.map((key) => [key, undefined]),
  );

  return { ...(href || {}), ...undefinedOverrides, ...filteredData };
};
