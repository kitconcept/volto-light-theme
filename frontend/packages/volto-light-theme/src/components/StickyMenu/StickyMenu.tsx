import type { Content } from '@plone/types';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import type { StickyMenuSettings } from '../../types';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/useLiveData';

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
      <ul>
        {menuData && Array.isArray(menuData)
          ? menuData.map((item) => {
              const itemInfo: {
                title: string;
                hrefTitle: string;
                href: string;
                itemHref: string;
                src: string;
                srcAlt: string;
              } = {
                title: '',
                hrefTitle: '',
                href: '',
                itemHref: '',
                src: '',
                srcAlt: '',
              };
              if (item?.href?.length > 0) {
                itemInfo.title = item.title || item.href[0]['title'];
                itemInfo.href = flattenToAppURL(item.href[0]['@id']);
              }
              if (item?.icon && item.icon[0]?.image_scales) {
                itemInfo.itemHref = item.icon[0]['@id'];
                itemInfo.srcAlt = item['alt'];
                itemInfo.src = `${flattenToAppURL(itemInfo.itemHref)}/${item.icon[0].image_scales[item.icon[0].image_field][0].download}`;
              } else if (item?.icon && item.icon[0]) {
                itemInfo.itemHref = item.icon[0]['@id'];
                itemInfo.srcAlt = item['alt'];
                itemInfo.src = `${flattenToAppURL(itemInfo.itemHref)}/@@images/image`;
              }

              if (!itemInfo.src) return null;

              return (
                <li className="item" key={itemInfo['@id']}>
                  {/* @ts-ignore */}
                  <ConditionalLink
                    condition={itemInfo.href}
                    to={itemInfo.href}
                    title={itemInfo.hrefTitle || itemInfo.srcAlt}
                  >
                    <div className="image-wrapper">
                      <img src={itemInfo.src} alt={itemInfo.srcAlt} />
                    </div>
                    <span>{itemInfo.title}</span>
                  </ConditionalLink>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default StickyMenu;
