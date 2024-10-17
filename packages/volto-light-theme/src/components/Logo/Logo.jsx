// SemanticUI-free pre-@plone/components
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import { toBackendLang } from '@plone/volto/helpers/Utils/Utils';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

const messages = defineMessages({
  site: {
    id: 'Site',
    defaultMessage: 'Site',
  },
  homepage: {
    id: 'Back to homepage',
    defaultMessage: 'Back to homepage',
  },
});

const Logo = () => {
  const { settings } = config;
  const lang = useSelector((state) => state.intl.locale);
  const intl = useIntl();
  const site = useSelector((state) => state.site.data);

  return (
    <UniversalLink
      href={settings.isMultilingual ? `/${toBackendLang(lang)}` : '/'}
      title={intl.formatMessage(messages.site)}
    >
      <img
        src={
          site['plone.site_logo']
            ? flattenToAppURL(site['plone.site_logo'])
            : LogoImage
        }
        alt={intl.formatMessage(messages.homepage)}
        title={intl.formatMessage(messages.homepage)}
      />
    </UniversalLink>
  );
};

export default Logo;
