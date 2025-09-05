import { useLiveData } from '@kitconcept/volto-light-theme/helpers/useLiveData';
import IconLinkList from '@kitconcept/volto-light-theme/primitives/IconLinkList';
import type { StickyMenuSettings } from '../../types';
import type { Content } from '@plone/types';
import { useLocation } from 'react-router-dom';

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

  const location = useLocation();

  const setting_page = [
    'historyview',
    'aliases',
    'sharing',
    'links-to-item',
    'controlpanel',
  ];
  const isSettingsPage = setting_page.some((page) =>
    location.pathname.includes(page),
  );

  return (
    <div
      className="sticky-menu"
      role="navigation"
      aria-label="Sticky menu"
      style={
        {
          '--sticky-menu-display': isSettingsPage ? 'none' : 'flex',
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
