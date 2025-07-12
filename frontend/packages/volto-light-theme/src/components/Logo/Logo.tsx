// SemanticUI-free pre-@plone/components
import { defineMessages, useIntl } from 'react-intl';
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/useLiveData';
import type { SiteHeaderSettings, SiteFooterSettings } from '../../types';
import type { Content } from '@plone/types';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  logoOf: {
    id: 'Logo of',
    defaultMessage: 'Logo of',
  },
});

type FormState = {
  content: {
    data: Content;
  };
  navroot: {
    data: {
      navroot: Content;
    };
  };
  site: {
    data: Content['@components']['site'];
  };
  form: {
    global: Content;
  };
};

const Logo = ({ isFooterLogo }: { isFooterLogo: boolean }) => {
  const intl = useIntl();
  const site = useSelector<FormState, Content>((state) => state.site.data);
  const navroot = useSelector<FormState, Content>(
    (state) => state.navroot.data,
  );
  const navRootPath = flattenToAppURL(navroot?.navroot?.['@id']) || '/';

  const content = useSelector<FormState, Content>(
    (state) => state.content.data,
    shallowEqual,
  );

  const logo = useLiveData<SiteHeaderSettings['logo']>(
    content,
    'voltolighttheme.header',
    'logo',
  );

  const footer_main_logo_inversed = useLiveData<
    SiteFooterSettings['footer_main_logo_inversed']
  >(content, 'kitconcept.footer', 'footer_main_logo_inversed');

  const MainLogoSrc = logo?.data
    ? `data:${logo['content-type']};base64,${logo.data}`
    : flattenToAppURL(logo?.download);

  const InversedLogoSrc = footer_main_logo_inversed?.data
    ? `data:${footer_main_logo_inversed['content-type']};base64,${footer_main_logo_inversed.data}`
    : flattenToAppURL(footer_main_logo_inversed?.download);

  const logoSrc =
    isFooterLogo && InversedLogoSrc ? InversedLogoSrc : MainLogoSrc;

  const logoWidth = logo?.width || null;
  const logoHeight = logo?.height || null;

  return (
    <Link to={navRootPath} aria-label={intl.formatMessage(messages.home)}>
      <img
        src={
          logoSrc
            ? logoSrc
            : site['plone.site_logo']
              ? flattenToAppURL(site['plone.site_logo'])
              : LogoImage
        }
        width={logoWidth}
        height={logoHeight}
        alt={
          intl.formatMessage(messages.logoOf) + ' ' + site['plone.site_title']
        }
      />
    </Link>
  );
};

export default Logo;
