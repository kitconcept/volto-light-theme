/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';

import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { UniversalLink, Logo } from '@plone/volto/components';
import Container from '@kitconcept/volto-light-theme/components/Atoms/Container/Container';
import config from '@plone/volto/registry';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl }) => {
  const { settings } = config;
  const lang = useSelector((state) => state.intl.locale);
  return (
    <footer id="footer">
      <Container layout className="footer">
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
        <ul>
          {/* wrap in div for a11y reasons: listitem role cannot be on the <a> element directly */}
          <li className="item">
            <UniversalLink
              className="item"
              href={settings.isMultilingual ? `/${lang}/sitemap` : '/sitemap'}
            >
              <FormattedMessage id="Site Map" defaultMessage="Site Map" />
            </UniversalLink>
          </li>
          <li className="item">
            <UniversalLink
              className="item"
              href={
                settings.isMultilingual
                  ? `/${lang}/accesibility-info`
                  : '/accesibility-info'
              }
            >
              <FormattedMessage
                id="Accessibility"
                defaultMessage="Accessibility"
              />
            </UniversalLink>
          </li>
          <li className="item">
            <UniversalLink
              className="item"
              href={
                settings.isMultilingual
                  ? `/${lang}/contact-form`
                  : '/contact-form'
              }
            >
              <FormattedMessage id="Contact" defaultMessage="Contact" />
            </UniversalLink>
          </li>
        </ul>
        <div className="logo">
          <Logo />
        </div>
        <a className="item powered-by" href="https://plone.org">
          <FormattedMessage
            id="Powered by Plone & Python"
            defaultMessage="Powered by Plone & Python"
          />
        </a>
      </Container>
    </footer>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);
