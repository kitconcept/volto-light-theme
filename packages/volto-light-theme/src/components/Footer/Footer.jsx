// SemanticUI-free pre-@plone/components
import React from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useSelector, shallowEqual } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Logo from '@plone/volto/components/theme/Logo/Logo';
import { Container } from '@plone/components';
import SlotRenderer from '@plone/volto/components/theme/SlotRenderer/SlotRenderer';
import FooterLinks from './FooterLinks';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

const Footer = () => {
  const intl = useIntl();
  const {
    content,
    lang,
    siteActions = [],
  } = useSelector(
    (state) => ({
      lang: state.intl.locale,
      siteActions: state.actions?.actions?.site_actions,
      content: state.content.data,
    }),
    shallowEqual,
  );
  const location = useLocation();
  const footerSettings = useSelector(
    (state) =>
      state.content.data?.['@components']?.['voltolighttheme.footer']?.data,
  );
  const footerLinks = footerSettings?.footer_links;

  return (
    <footer id="footer">
      <SlotRenderer name="preFooter" content={content} location={location} />

      <Container className="footer">
        <div className="footer-message">
          <FormattedMessage
            id="The {plonecms} is {copyright} 2000-{current_year} by the {plonefoundation} and friends."
            defaultMessage="The {plonecms} is {copyright} 2000-{current_year} by the {plonefoundation} and friends."
            values={{
              plonecms: (
                <FormattedMessage
                  id="Plone{reg} Open Source CMS/WCM"
                  defaultMessage="Plone{reg} Open Source CMS/WCM"
                  values={{ reg: <sup>®</sup> }}
                />
              ),
              copyright: (
                <abbr title={intl.formatMessage(messages.copyright)}>©</abbr>
              ),
              current_year: new Date().getFullYear(),
              plonefoundation: (
                <a className="item" href="http://plone.org/foundation">
                  <FormattedMessage
                    id="Plone Foundation"
                    defaultMessage="Plone Foundation"
                  />
                </a>
              ),
            }}
          />{' '}
          <br />
          <FormattedMessage
            id="Distributed under the {license}."
            defaultMessage="Distributed under the {license}."
            values={{
              license: (
                <a
                  className="item"
                  href="http://creativecommons.org/licenses/GPL/2.0/"
                >
                  <FormattedMessage
                    id="GNU GPL license"
                    defaultMessage="GNU GPL license"
                  />
                </a>
              ),
            }}
          />
        </div>
        <FooterLinks
          links={footerLinks}
          siteActions={siteActions}
          lang={lang}
        />
        <div className="logo">
          <Logo />
        </div>
        <a className="item powered-by" href="https://plone.org">
          <FormattedMessage
            id="Powered by Plone & Python"
            defaultMessage="Powered by Plone & Python"
          />
        </a>
        <br />
        <div className="footer-branding">
          Made with{' '}
          <span role="img" aria-label="love" style={{ color: 'red' }}>
            ❤️
          </span>{' '}
          by kitconcept
        </div>
      </Container>

      <SlotRenderer name="postFooter" content={content} location={location} />
    </footer>
  );
};

export default Footer;
