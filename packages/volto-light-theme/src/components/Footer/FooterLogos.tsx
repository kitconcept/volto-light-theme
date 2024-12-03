import isEmpty from 'lodash/isEmpty';
import { flattenToAppURL, addAppURL } from '@plone/volto/helpers/Url/Url';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import type { BlocksData } from '@plone/types';

type FooterLogosProps = { logos: BlocksData };

const FooterLogos = (props: FooterLogosProps) => {
  const { logos } = props;

  return (
    <ul className="footer-logos">
      {!isEmpty(logos?.blocks)
        ? logos.blocks_layout.items.map((itemId) => {
            const logo = logos.blocks[itemId];
            const logoInfo: {
              hrefTitle: string;
              href: string;
              logoHref: string;
              src: string;
              srcAlt: string;
            } = {
              hrefTitle: '',
              href: '',
              logoHref: '',
              src: '',
              srcAlt: '',
            };
            if (logo?.href) {
              logoInfo.hrefTitle = logo.href[0]['title'];
              logoInfo.href = flattenToAppURL(logo.href[0]['@id']);
            }
            if (logo?.logo && logo.logo[0]?.image_scales) {
              logoInfo.logoHref = logo.logo[0]['@id'];
              logoInfo.srcAlt = logo['alt'];
              logoInfo.src = `${flattenToAppURL(logoInfo.logoHref)}/${logo.logo[0].image_scales[logo.logo[0].image_field][0].download}`;
            }

            if (!logoInfo.src) return null;

            return (
              <li className="item" key={logoInfo.href}>
                {/* @ts-ignore */}
                <ConditionalLink
                  condition={logoInfo.href}
                  to={logoInfo.href}
                  title={logoInfo.hrefTitle || logoInfo.srcAlt}
                >
                  <img src={logoInfo.src} alt={logoInfo.srcAlt} />
                </ConditionalLink>
              </li>
            );
          })
        : null}
    </ul>
  );
};

export default FooterLogos;
