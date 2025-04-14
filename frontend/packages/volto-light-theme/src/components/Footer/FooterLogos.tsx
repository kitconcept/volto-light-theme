import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import { useSelector, shallowEqual } from 'react-redux';
import { Container } from '@plone/components';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/liveData';
import cx from 'classnames';
import type { Content } from '@plone/types';
import type { SiteFooterSettings } from '../../types';

type FormState = {
  content: {
    data: Content;
  };
  form: {
    global: Content;
  };
};

const FooterLogos = () => {
  const content = useSelector<FormState, Content>(
    (state) => state.content.data,
    shallowEqual,
  );

  const footer_logos = useLiveData<SiteFooterSettings['footer_logos']>(
    content,
    'voltolighttheme.footer',
    'footer_logos',
  );

  const footer_logos_size = useLiveData<
    SiteFooterSettings['footer_logos_size']
  >(content, 'voltolighttheme.footer', 'footer_logos_size');
  const footer_logos_container_width = useLiveData<
    SiteFooterSettings['footer_logos_container_width']
  >(content, 'voltolighttheme.footer', 'footer_logos_container_width');

  return (
    <Container className={cx({ [footer_logos_container_width]: 1 })}>
      <ul
        className={cx('footer-logos', {
          [footer_logos_size]: footer_logos_size,
        })}
      >
        {footer_logos && Array.isArray(footer_logos)
          ? footer_logos.map((logo) => {
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

export default FooterLogos;
