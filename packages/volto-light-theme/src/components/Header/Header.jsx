// SemanticUI-free pre-@plone/components
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Container } from '@plone/components';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import { useIntl, defineMessages } from 'react-intl';
import config from '@plone/volto/registry';
import cx from 'classnames';
import IntranetSearchWidget from '../SearchWidget/IntranetSearchWidget';

import {
  Anontools,
  LanguageSelector,
  Logo,
  Navigation,
  SearchWidget,
  UniversalLink,
} from '@plone/volto/components';

const messages = defineMessages({
  siteLabel: {
    id: 'siteLabel',
    defaultMessage: ' ',
  },
});

const InternetHeader = ({ pathname, siteLabel, token, siteAction }) => {
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
            {siteAction &&
              siteAction.map((item) => (
                <UniversalLink key={item.url} href={item.url}>
                  {item.title}
                </UniversalLink>
              ))}
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

const IntranetHeader = ({ pathname, siteLabel, token, siteAction }) => {
  return (
    <>
      <div className="header">
        <div className="tools-wrapper">
          <LanguageSelector />

          <div className="tools">
            {!token && <Anontools />}
            {siteAction &&
              siteAction.map((item) => (
                <UniversalLink href={item.url}>{item.title}</UniversalLink>
              ))}
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
  let siteLabel = config.settings.siteLabel;
  const intranetHeader = config.settings.intranetHeader;
  const token = useSelector((state) => state.userSession.token);
  const siteAction = useSelector(
    (state) => state.content.data?.['@components']?.actions?.site_actions,
  );
  const intl = useIntl();
  const translatedSiteLabel = intl.formatMessage(messages.siteLabel);

  siteLabel =
    siteLabel &&
    (translatedSiteLabel !== 'siteLabel' && translatedSiteLabel !== ' '
      ? translatedSiteLabel
      : siteLabel);

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
            siteAction={siteAction}
          />
        ) : (
          <InternetHeader
            pathname={pathname}
            siteLabel={siteLabel}
            token={token}
            siteAction={siteAction}
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
