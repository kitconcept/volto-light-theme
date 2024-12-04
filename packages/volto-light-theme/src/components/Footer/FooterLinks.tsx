import isEmpty from 'lodash/isEmpty';
import { addAppURL, flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import type { BlocksData } from '@plone/types';
import config from '@plone/volto/registry';

type FooterLinksProps = { links: BlocksData; siteActions: any; lang: string };

const FooterLinks = (props: FooterLinksProps) => {
  const { lang, links, siteActions } = props;

  return (
    <ul className="footer-links">
      {!isEmpty(links?.blocks)
        ? links.blocks_layout.items.map((itemId) => {
            const link = links.blocks[itemId];
            const title = link.title || link.href[0]['title'];
            const href = flattenToAppURL(link.href[0]['@id']);

            if (!href) return null;

            return (
              <li className="item" key={href}>
                <UniversalLink href={href}>{title}</UniversalLink>
              </li>
            );
          })
        : siteActions?.length
          ? siteActions.map((item) => (
              <li className="item" key={item.id}>
                <UniversalLink
                  className="item"
                  href={
                    config.settings.isMultilingual
                      ? `/${lang}/${
                          item.url
                            ? flattenToAppURL(item.url)
                            : addAppURL(item.id)
                        }`
                      : item.url
                        ? flattenToAppURL(item.url)
                        : addAppURL(item.id)
                  }
                >
                  {item?.title}
                </UniversalLink>
              </li>
            ))
          : null}
    </ul>
  );
};

export default FooterLinks;
