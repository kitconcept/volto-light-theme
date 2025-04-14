import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import Logo from '@plone/volto/components/theme/Logo/Logo';
import LinkList from './LinkList';
import type { SiteFooterSettings } from '../../types';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

type SimpleFooterProps = {
  footerLinks: SiteFooterSettings['footer_links'];
};

const SimpleFooter = (props: SimpleFooterProps) => {
  const intl = useIntl();
  return (
    <>
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
      <LinkList links={props.footerLinks} />
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
      </div>{' '}
    </>
  );
};

export default SimpleFooter;
