import type { Content } from '@plone/types';
import isEmpty from 'lodash/isEmpty';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import { useSelector } from 'react-redux';
import { Container } from '@plone/components';
import cx from 'classnames';

type FormState = {
  content: {
    data: Content;
  };
  form: {
    global: Content;
  };
  navroot: {
    data: {
      navroot: Content;
    };
  };
};

const FooterLogos = () => {
  const navroot = useSelector<FormState, Content>(
    (state) => state.navroot.data.navroot,
  );
  const formState = useSelector<FormState, Content>(
    (state) => state.form.global,
  );
  const logos = formState?.footer_logos || navroot?.footer_logos;
  const logosSize = formState?.footer_logos_size || navroot?.footer_logos_size;
  const footer_logos_container_width =
    formState?.footer_logos_container_width ||
    navroot?.footer_logos_container_width;
  console.log(logos);
  return (
    <Container className={cx({ [footer_logos_container_width]: 1 })}>
      <ul
        className={cx('footer-logos', {
          [logosSize]: logosSize,
        })}
      >
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
              if (logo?.href?.length > 0) {
                logoInfo.hrefTitle = logo.href[0]['title'];
                logoInfo.href = flattenToAppURL(logo.href[0]['@id']);
              }
              if (logo?.logo && logo.logo[0]?.image_scales) {
                logoInfo.logoHref = logo.logo[0]['@id'];
                logoInfo.srcAlt = logo['alt'];
                logoInfo.src = `${flattenToAppURL(logoInfo.logoHref)}/${logo.logo[0].image_scales[logo.logo[0].image_field][0].download}`;
              } else if (logo?.logo) {
                logoInfo.logoHref = logo.logo[0]['@id'];
                logoInfo.srcAlt = logo['alt'];
                logoInfo.src = `${flattenToAppURL(logoInfo.logoHref)}/@@images/image`;
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
    </Container>
  );
};

export default FooterLogos;
