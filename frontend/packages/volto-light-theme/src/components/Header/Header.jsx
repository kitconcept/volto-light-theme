// SemanticUI-free pre-@plone/components
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container } from '@plone/components';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import { useIntl, defineMessages } from 'react-intl';
import config from '@plone/volto/registry';
import cx from 'classnames';
import IntranetSearchWidget from '../SearchWidget/IntranetSearchWidget';
import isEmpty from 'lodash/isEmpty';
import {
  setSidebarTab,
  setMetadataFocus,
} from '@plone/volto/actions/sidebar/sidebar';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

import Anontools from '@plone/volto/components/theme/Anontools/Anontools';
import LanguageSelector from '@plone/volto/components/theme/LanguageSelector/LanguageSelector';
import Logo from '@plone/volto/components/theme/Logo/Logo';
import Navigation from '@plone/volto/components/theme/Navigation/Navigation';
import SearchWidget from '@plone/volto/components/theme/SearchWidget/SearchWidget';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';

import SlotRenderer from '@plone/volto/components/theme/SlotRenderer/SlotRenderer';

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
      </div>
    </>
  );
};

const IntranetHeader = ({ pathname, siteLabel, token }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const dispatch = useDispatch();

  const headerSettings = useSelector(
    (state) =>
      state.content.data?.['@components']?.inherit?.['voltolighttheme.header']
        ?.data,
  );
  const formData = useSelector((state) => state.form.global);

  const intranetFlag =
    !isEmpty(formData) && formData.intranet_flag
      ? formData?.intranet_flag || siteLabel
      : headerSettings?.intranet_flag || siteLabel;

  const complementary_logo =
    !isEmpty(formData) && formData?.complementary_logo?.data
      ? `data:${formData.complementary_logo['content-type']};base64,${formData.complementary_logo.data}`
      : headerSettings?.complementary_logo?.download;

  const headerActions =
    !isEmpty(formData) && formData?.header_actions
      ? formData.header_actions
      : headerSettings?.header_actions;

  const pointToSidebar = (fieldSetName, fieldId) => {
    dispatch(setSidebarTab(0));
    dispatch(setMetadataFocus(fieldSetName, fieldId));
  };

  return (
    <>
      <div className="header">
        <div className="tools-wrapper">
          <LanguageSelector />

          <div className="tools">
            {!token && <Anontools />}
            {headerActions &&
              Array.isArray(headerActions) &&
              headerActions.map((item) => (
                <UniversalLink key={item['@id']} href={item.href?.[0]['@id']}>
                  {item.title}
                </UniversalLink>
              ))}
          </div>
          {siteLabel &&
            isClient &&
            (!isEmpty(formData) ? (
              <Button
                className="intranet-flag"
                onPress={() =>
                  pointToSidebar('header customizations', 'intranet_flag')
                }
              >
                <p>{intranetFlag}</p>
              </Button>
            ) : (
              <div className="intranet-flag">
                <p>{intranetFlag}</p>
              </div>
            ))}
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
          <div className="complementary-logo">
            {complementary_logo && (
              <img
                src={flattenToAppURL(complementary_logo)}
                alt="complementary logo"
              />
            )}
          </div>
          <MobileNavigation pathname={pathname} />
        </div>
        <Navigation pathname={pathname} />
      </div>
    </>
  );
};

const Header = (props) => {
  const { pathname } = props;
  let siteLabel = config.settings.siteLabel;
  const intranetHeader = config.settings.intranetHeader;
  const token = useSelector((state) => state.userSession.token);
  const content = useSelector((state) => state.content.data);
  const siteAction = useSelector(
    (state) => state.content.data?.['@components']?.actions?.site_actions,
  );
  const navRoot = useSelector((state) => state.navroot?.data?.navroot);
  const intl = useIntl();
  const translatedSiteLabel = intl.formatMessage(messages.siteLabel);

  siteLabel =
    siteLabel &&
    (translatedSiteLabel !== 'siteLabel' && translatedSiteLabel !== ' '
      ? translatedSiteLabel
      : siteLabel);

  return (
    <>
      <SlotRenderer name="aboveHeader" content={content} navRoot={navRoot} />
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
    </>
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
