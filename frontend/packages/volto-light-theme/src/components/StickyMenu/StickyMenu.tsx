import type { Content } from '@plone/types';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import type { StickyMenuSettings } from '../../types';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/useLiveData';
import IconLinkList from '@kitconcept/volto-light-theme/primitives/IconLinkList';

const StickyMenu = ({ content }: { content: Content }) => {
  const menuData = useLiveData<StickyMenuSettings['sticky_menu']>(
    content,
    'kitconcept.sticky_menu',
    'sticky_menu',
  );

  const sticky_menu_color = useLiveData<
    StickyMenuSettings['sticky_menu_color']
  >(content, 'kitconcept.sticky_menu', 'sticky_menu_color');

  const sticky_menu_foreground_color = useLiveData<
    StickyMenuSettings['sticky_menu_foreground_color']
  >(content, 'kitconcept.sticky_menu', 'sticky_menu_foreground_color');

  return (
    <div
      className="sticky-menu"
      style={
        {
          '--sticky-menu-color': sticky_menu_color,
          '--sticky-menu-foreground-color': sticky_menu_foreground_color,
        } as React.CSSProperties
      }
    >
      <IconLinkList iconLinks={menuData} />
    </div>
  );
};

export default StickyMenu;
