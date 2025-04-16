// SemanticUI-free pre-@plone/components
import { defineMessages, useIntl } from 'react-intl';
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/liveData';
import type { SiteHeaderSettings } from '../../types';
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

const Logo = () => {
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

  const logoSrc = logo?.data
    ? `data:${logo['content-type']};base64,${logo.data}`
    : flattenToAppURL(logo?.download);

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
