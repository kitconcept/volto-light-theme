import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import { Container } from '@plone/components';
import cx from 'classnames';
import type { SiteFooterSettings } from '../../types';

type LogosContainerProps = {
  logos: SiteFooterSettings['footer_logos'];
  logos_size: SiteFooterSettings['footer_logos_size'];
  logos_container_width: SiteFooterSettings['footer_logos_container_width'];
};

const LogosContainer = (props: LogosContainerProps) => {
  const { logos, logos_size, logos_container_width } = props;

  return (
    <Container className={cx({ [logos_container_width]: 1 })}>
      <ul
        className={cx('logos-container', {
          [logos_size]: logos_size,
        })}
      >
        {logos && Array.isArray(logos)
          ? logos.map((logo) => {
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
              if (logo?.href?.length > 0) {
                logoInfo.hrefTitle = logo.href[0]['title'];
                logoInfo.href = flattenToAppURL(logo.href[0]['@id']);
              }
              if (logo?.logo && logo.logo[0]?.image_scales) {
                logoInfo.logoHref = logo.logo[0]['@id'];
                logoInfo.srcAlt = logo['alt'];
                logoInfo.src = `${flattenToAppURL(logoInfo.logoHref)}/${logo.logo[0].image_scales[logo.logo[0].image_field][0].download}`;
              } else if (logo?.logo && logo.logo[0]) {
                logoInfo.logoHref = logo.logo[0]['@id'];
                logoInfo.srcAlt = logo['alt'];
                logoInfo.src = `${flattenToAppURL(logoInfo.logoHref)}/@@images/image`;
              }

              if (!logoInfo.src) return null;

              return (
                <li className="item" key={logo['@id']}>
                  {/* @ts-ignore */}
                  <ConditionalLink
                    condition={logoInfo.href}
                    to={logoInfo.href}
                    title={logoInfo.hrefTitle || logoInfo.srcAlt}
                    openLinkInNewTab={logo.openInNewTab}
                  >
                    <img src={logoInfo.src} alt={logoInfo.srcAlt} />
                  </ConditionalLink>
                </li>
              );
            })
          : null}
      </ul>
    </Container>
  );
};

export default LogosContainer;
