import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { Container } from '@plone/components';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

const Copyright = () => {
  const intl = useIntl();

  return (
    <Container className="default copyright">
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
              <a className="item" href="https://plone.org/foundation">
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
                href="https://www.gnu.org/licenses/old-licenses/lgpl-2.0.html"
              >
                <FormattedMessage
                  id="GNU GPL license"
                  defaultMessage="GNU GPL v2 license"
                />
              </a>
            ),
          }}
        />
      </div>
    </Container>
  );
};

export default Copyright;
