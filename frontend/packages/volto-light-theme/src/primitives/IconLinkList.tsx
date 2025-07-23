import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import type { iconLink } from '../types';

type IconLinkListProps = {
  iconLinks: Array<iconLink>;
};

const IconLinkList = (props: IconLinkListProps) => {
  const { iconLinks } = props;

  return (
    <ul>
      {iconLinks && Array.isArray(iconLinks)
        ? iconLinks.map((item) => {
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

            // If the item has title, always set it
            itemInfo.title = item
              ? item?.title || item?.href?.[0]?.['title'] || ''
              : '';
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
              <li className="item" key={item['@id']}>
                {/* @ts-ignore */}
                <ConditionalLink
                  condition={itemInfo.href}
                  to={itemInfo.href}
                  title={itemInfo.hrefTitle || itemInfo.srcAlt}
                  openLinkInNewTab={item.openInNewTab}
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
  );
};

export default IconLinkList;
