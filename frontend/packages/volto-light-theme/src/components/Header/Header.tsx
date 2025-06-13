// SemanticUI-free pre-@plone/components
import { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Button, Container } from '@plone/components';
import isEmpty from 'lodash/isEmpty';
import cx from 'classnames';

import {
  setSidebarTab,
  setMetadataFocus,
} from '@plone/volto/actions/sidebar/sidebar';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import LanguageSelector from '@plone/volto/components/theme/LanguageSelector/LanguageSelector';
import Logo from '@plone/volto/components/theme/Logo/Logo';
import Navigation from '@plone/volto/components/theme/Navigation/Navigation';
import SearchWidget from '@plone/volto/components/theme/SearchWidget/SearchWidget';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import SlotRenderer from '@plone/volto/components/theme/SlotRenderer/SlotRenderer';

import { useLiveData } from '@kitconcept/volto-light-theme/helpers/useLiveData';

import MobileNavigation from '../MobileNavigation/MobileNavigation';
import IntranetSearchWidget from '../SearchWidget/IntranetSearchWidget';

import type { SiteHeaderSettings } from '../../types';
import type { Content } from '@plone/types';

type FormState = {
  content: {
    data: Content;
  };
  navroot: {
    data: {
      navroot: Content;
    };
  };
  form: {
    global: Content;
  };
};

const InternetHeader = ({ pathname, content }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const dispatch = useDispatch();

  const formData = useSelector<FormState, Content>(
    (state) => state.form.global,
  );

  const intranet_flag = useLiveData<SiteHeaderSettings['intranet_flag']>(
    content,
    'voltolighttheme.header',
    'intranet_flag',
  );

  const header_actions = useLiveData<SiteHeaderSettings['header_actions']>(
    content,
    'voltolighttheme.header',
    'header_actions',
  );

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
            <SlotRenderer name="headerTools" content={content} />

            {header_actions &&
              Array.isArray(header_actions) &&
              header_actions.map((item) => (
                <UniversalLink
                  key={item['@id']}
                  href={item.href?.[0]['@id']}
                  openLinkInNewTab={item.openInNewTab}
                >
                  {item.title}
                </UniversalLink>
              ))}
          </div>
          {intranet_flag &&
            isClient &&
            (!isEmpty(formData) ? (
              <Button
                className="intranet-flag"
                onPress={() =>
                  pointToSidebar('header customizations', 'intranet_flag')
                }
              >
                <p>{intranet_flag}</p>
              </Button>
            ) : (
              <div className="intranet-flag">
                <p>{intranet_flag}</p>
              </div>
            ))}
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

const IntranetHeader = ({ pathname, content }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const dispatch = useDispatch();

  const formData = useSelector<FormState, Content>(
    (state) => state.form.global,
  );

  const intranet_flag = useLiveData<SiteHeaderSettings['intranet_flag']>(
    content,
    'voltolighttheme.header',
    'intranet_flag',
  );

  const complementary_logo = useLiveData<
    SiteHeaderSettings['complementary_logo']
  >(content, 'voltolighttheme.header', 'complementary_logo');

  const complementaryLogoSrc = complementary_logo?.data
    ? `data:${complementary_logo['content-type']};base64,${complementary_logo.data}`
    : flattenToAppURL(complementary_logo?.download);

  const header_actions = useLiveData<SiteHeaderSettings['header_actions']>(
    content,
    'voltolighttheme.header',
    'header_actions',
  );

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
            <SlotRenderer name="headerTools" content={content} />

            {header_actions &&
              Array.isArray(header_actions) &&
              header_actions.map((item) => (
                <UniversalLink
                  key={item['@id']}
                  href={item.href?.[0]['@id']}
                  openLinkInNewTab={item.openInNewTab}
                >
                  {item.title}
                </UniversalLink>
              ))}
          </div>
          {intranet_flag &&
            isClient &&
            (!isEmpty(formData) ? (
              <Button
                className="intranet-flag"
                onPress={() =>
                  pointToSidebar('header customizations', 'intranet_flag')
                }
              >
                <p>{intranet_flag}</p>
              </Button>
            ) : (
              <div className="intranet-flag">
                <p>{intranet_flag}</p>
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
          <MobileNavigation pathname={pathname} />
          <div className="complementary-logo">
            {complementary_logo && (
              <img src={complementaryLogoSrc} alt="complementary logo" />
            )}
          </div>
        </div>
        <Navigation pathname={pathname} />
      </div>
    </>
  );
};

const Header = (props) => {
  const { pathname } = props;
  const content = useSelector<FormState, Content>(
    (state) => state.content.data,
    shallowEqual,
  );

  const navRoot = useSelector<FormState, Content>(
    (state) => state.navroot?.data?.navroot,
  );

  const has_intranet_header = useLiveData<
    SiteHeaderSettings['has_intranet_header']
  >(content, 'voltolighttheme.header', 'has_intranet_header');

  return (
    <>
      <SlotRenderer name="aboveHeader" content={content} navRoot={navRoot} />
      <header
        className={cx('header-wrapper', {
          'intranet-header': has_intranet_header,
        })}
      >
        <Container layout>
          {has_intranet_header ? (
            <IntranetHeader pathname={pathname} content={content} />
          ) : (
            <InternetHeader pathname={pathname} content={content} />
          )}
        </Container>
      </header>
      <SlotRenderer name="belowHeader" content={content} navRoot={navRoot} />
    </>
  );
};

export default Header;
