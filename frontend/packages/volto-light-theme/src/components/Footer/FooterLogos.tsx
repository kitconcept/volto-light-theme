import type { Content } from '@plone/types';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import { useSelector } from 'react-redux';
import { Container } from '@plone/components';
import cx from 'classnames';
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
  const formState = useSelector<FormState, Content>(
    (state) => state.form.global,
  );
  const footerSettings = useSelector<FormState, SiteFooterSettings>(
    (state) =>
      state.content.data?.['@components']?.inherit?.['voltolighttheme.footer']
        ?.data,
  );
  const logos = formState?.footer_logos || footerSettings?.footer_logos;
  const logosSize =
    formState?.footer_logos_size || footerSettings?.footer_logos_size;
  const footer_logos_container_width =
    formState?.footer_logos_container_width ||
    footerSettings?.footer_logos_container_width;

  return (
    <Container className={cx({ [footer_logos_container_width]: 1 })}>
      <ul
        className={cx('footer-logos', {
          [logosSize]: logosSize,
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
                <li className="item" key={logoInfo['@id']}>
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
