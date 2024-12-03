// SemanticUI-free pre-@plone/components
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { useSelector, shallowEqual } from 'react-redux';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import Logo from '@plone/volto/components/theme/Logo/Logo';
import { Container } from '@plone/components';
import { flattenToAppURL, addAppURL } from '@plone/volto/helpers/Url/Url';
import config from '@plone/volto/registry';
import FooterLogos from './FooterLogos';

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
  const { lang, siteActions = [] } = useSelector(
    (state) => ({
      lang: state.intl.locale,
      siteActions: state.actions?.actions?.site_actions,
    }),
    shallowEqual,
  );
  const navroot = useSelector((state) => state.navroot.data.navroot);
  const footerLinks = navroot?.footer_links;
  const footerLogos = navroot?.footer_logos;

  return (
    <footer id="footer">
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
        <ul className="footer-links">
          {!isEmpty(footerLinks?.blocks)
            ? footerLinks.blocks_layout.items.map((itemId) => {
                const link = footerLinks.blocks[itemId];
                const title = link.title || link.href[0]['title'];
                const href = flattenToAppURL(link.href[0]['@id']);

                if (!href) return null;

                return (
                  <li className="item" key={href}>
                    <UniversalLink href={href}>{title}</UniversalLink>
                  </li>
                );
              })
            : siteActions?.length
              ? siteActions.map((item) => (
                  <li className="item" key={item.id}>
                    <UniversalLink
                      className="item"
                      href={
                        settings.isMultilingual
                          ? `/${lang}/${
                              item.url
                                ? flattenToAppURL(item.url)
                                : addAppURL(item.id)
                            }`
                          : item.url
                            ? flattenToAppURL(item.url)
                            : addAppURL(item.id)
                      }
                    >
                      {item?.title}
                    </UniversalLink>
                  </li>
                ))
              : null}
        </ul>
        <FooterLogos logos={footerLogos} />
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
