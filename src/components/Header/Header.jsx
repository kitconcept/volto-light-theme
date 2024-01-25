// SemanticUI-free pre-@plone/components
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Container from '@kitconcept/volto-light-theme/components/Atoms/Container/Container';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl, defineMessages } from 'react-intl';
import config from '@plone/volto/registry';
import cx from 'classnames';
import IntranetSearchWidget from '../SearchWidget/IntranetSearchWidget';

import {
  Anontools,
  LanguageSelector,
  Logo,
  Navigation,
  SearchWidget,
} from '@plone/volto/components';

const messages = defineMessages({
  siteLabel: {
    id: 'siteLabel',
    defaultMessage: '',
  },
});

const InternetHeader = ({ pathname, siteLabel, token }) => {
  return (
    <>
      <div className="header">
        <div className="logo-nav-wrapper">
          <div className="logo">
            <Logo />
          </div>
          <Navigation pathname={pathname} />
          <MobileNavigation pathname={pathname} />
          <div className="search-wrapper navigation-desktop">
            <div className="search">
              <SearchWidget />
            </div>
          </div>
        </div>
        <div className="tools-wrapper">
          <LanguageSelector />

          <div className="tools">
            {!token && <Anontools />}

            <Link aria-label="sitemap" to="/sitemap">
              <FormattedMessage id="Sitemap" defaultMessage="Sitemap" />
            </Link>
            <a href="https://github.com/kitconcept/volto-light-theme">GitHub</a>
          </div>
          {siteLabel && (
            <div className="intranet">
              <p>{siteLabel}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const IntranetHeader = ({ pathname, siteLabel, token }) => {
  return (
    <>
      <div className="header">
        <div className="tools-wrapper">
          <LanguageSelector />

          <div className="tools">
            {!token && <Anontools />}

            <Link aria-label="sitemap" to="/sitemap">
              <FormattedMessage id="Sitemap" defaultMessage="Sitemap" />
            </Link>
            <a href="https://github.com/kitconcept/volto-light-theme">GitHub</a>
          </div>
          {siteLabel && (
            <div className="intranet">
              <p>{siteLabel}</p>
            </div>
          )}
        </div>
        <div className="logo-nav-wrapper">
          <div className="logo">
            <Logo />
          </div>
          <div className="search-wrapper">
            <div className="search">
              <IntranetSearchWidget />
            </div>
          </div>
          <Navigation pathname={pathname} />
          <MobileNavigation pathname={pathname} />
        </div>
      </div>
    </>
  );
};

const Header = (props) => {
  const { pathname } = props;
  const siteLabel = config.settings.siteLabel;
  const intranetHeader = config.settings.intranetHeader;
  const token = useSelector((state) => state.userSession.token);
  const intl = useIntl();
  const translatedSiteLabel = intl.formatMessage(messages.siteLabel);
  console.log(translatedSiteLabel, 'this is translatedSiteLabel');

  return (
    <header
      className={cx('header-wrapper', { 'intranet-header': intranetHeader })}
    >
      <Container layout>
        {intranetHeader ? (
          <IntranetHeader
            pathname={pathname}
            siteLabel={siteLabel}
            token={token}
          />
        ) : (
          <InternetHeader
            pathname={pathname}
            siteLabel={siteLabel}
            token={token}
          />
        )}
      </Container>
    </header>
  );
};

Header.propTypes = {
  token: PropTypes.string,
  pathname: PropTypes.string.isRequired,
};

Header.defaultProps = {
  token: null,
};

export default Header;
