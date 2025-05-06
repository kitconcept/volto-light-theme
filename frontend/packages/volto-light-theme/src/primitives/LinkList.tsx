import isEmpty from 'lodash/isEmpty';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import type { Link } from '../types';

type LinksProps = { links: Array<Link> };

const LinkList = (props: LinksProps) => {
  const { links } = props;

  return (
    <ul>
      {links && Array.isArray(links)
        ? links.map((link) => {
            if (isEmpty(link) || !link.href) return null;

            const title = link.title || link.href[0]['title'];
            const href = flattenToAppURL(link.href[0]?.['@id']);

            if (!href) return null;

            return (
              <li className="item" key={href}>
                <UniversalLink href={href} openLinkInNewTab={link.openInNewTab}>
                  {title}
                </UniversalLink>
              </li>
            );
          })
        : null}
    </ul>
  );
};

export default LinkList;
