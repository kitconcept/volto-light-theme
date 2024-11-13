// SemanticUI-free pre-@plone/components
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

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

const Logo = () => {
  const intl = useIntl();
  const site = useSelector((state) => state.site.data);
  const navroot = useSelector((state) => state.navroot.data);
  const navRootPath = flattenToAppURL(navroot?.navroot?.['@id']) || '/';
  const navRootLogo = navroot?.navroot?.logo?.download || null;
  const navRootLogoWidth = navroot?.navroot?.logo?.width || null;
  const navRootLogoHeight = navroot?.navroot?.logo?.height || null;

  return (
    <Link to={navRootPath} aria-label={intl.formatMessage(messages.home)}>
      <img
        src={
          navRootLogo
            ? flattenToAppURL(navRootLogo)
            : site['plone.site_logo']
              ? flattenToAppURL(site['plone.site_logo'])
              : LogoImage
        }
        width={navRootLogoWidth}
        height={navRootLogoHeight}
        alt={
          intl.formatMessage(messages.logoOf) + ' ' + site['plone.site_title']
        }
        title={
          intl.formatMessage(messages.logoOf) + ' ' + site['plone.site_title']
        }
      />
    </Link>
  );
};

export default Logo;
