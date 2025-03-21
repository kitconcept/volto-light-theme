import isEmpty from 'lodash/isEmpty';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import type { SiteFooterSettings } from '../../types';

type FooterLinksProps = { links: SiteFooterSettings['footer_links'] };

const FooterLinks = (props: FooterLinksProps) => {
  const { links } = props;

  return (
    <ul className="footer-links">
      {links && Array.isArray(links)
        ? links.map((link) => {
            if (isEmpty(link) || !link.href) return null;

            const title = link.title || link.href[0]['title'];
            const href = flattenToAppURL(link.href[0]?.['@id']);

            if (!href) return null;

            return (
              <li className="item" key={href}>
                <UniversalLink href={href} openLinkInNewTab={undefined}>
                  {title}
                </UniversalLink>
              </li>
            );
          })
        : null}
    </ul>
  );
};

export default FooterLinks;
