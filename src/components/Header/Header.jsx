// SemanticUI-free pre-@plone/components
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Container from '@kitconcept/volto-light-theme/components/Atoms/Container/Container';
import MobileNavigation from '../MobileNavigation/MobileNavigation';

import {
  Anontools,
  LanguageSelector,
  Logo,
  Navigation,
  SearchWidget,
  UniversalLink,
} from '@plone/volto/components';

const Header = (props) => {
  const { pathname } = props;
  const token = useSelector((state) => state.userSession.token);
  const siteAction = useSelector(
    (state) => state.content.data?.['@components']?.actions?.site_actions,
  );

  return (
    <header className="header-wrapper">
      <Container layout>
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
          </div>
        </div>
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
