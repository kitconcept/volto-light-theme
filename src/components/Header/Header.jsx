// SemanticUI-free pre-@plone/components
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Container from '@kitconcept/volto-light-theme/components/Atoms/Container/Container';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
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

const InternetHeader = (props) => {
  const { pathname } = props;
  const intranetName = config.settings.intranetName;
  const token = useSelector((state) => state.userSession.token);
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
          {intranetName && (
            <div className="intranet">
              <p>{intranetName}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const IntranetHeader = (props) => {
  const { pathname } = props;
  const intranetName = config.settings.intranetName;
  const token = useSelector((state) => state.userSession.token);
  return (
    <>
      <div className="header">
        <div className="tools-wrapper">
          <LanguageSelector />

          <div className="tools">
            <UniversalLink
              aria-label="BfS Homepage"
              href="https://www.bfs.de/DE/home/home_node.html"
            >
              <FormattedMessage
                id="Plone Homepage"
                defaultMessage="Plone Homepage"
              />
            </UniversalLink>
            {!token && (
              <>
                <Anontools />
                {/* <Link aria-label="register" to="/register">
                    <FormattedMessage
                      id="Register"
                      defaultMessage="Registration"
                    />
                  </Link> */}
              </>
            )}
            {token && (
              <>
                <UniversalLink aria-label="Logout" href="/logout">
                  <FormattedMessage id="Logout" defaultMessage="Logout" />
                </UniversalLink>
              </>
            )}
          </div>
          <div className="intranet">
            <p>
              <b>Plone</b> Intranet
            </p>
          </div>
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
  const intranetName = config.settings.intranetName;
  const token = useSelector((state) => state.userSession.token);

  return (
    <header
      className={cx('header-wrapper', { 'intranet-header': intranetName })}
    >
      <Container layout>
        {intranetName ? (
          <IntranetHeader {...props} />
        ) : (
          <InternetHeader {...props} />
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
