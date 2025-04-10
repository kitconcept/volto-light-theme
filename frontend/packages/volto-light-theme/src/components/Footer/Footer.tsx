import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useSelector, shallowEqual } from 'react-redux';
import Logo from '@plone/volto/components/theme/Logo/Logo';
import { Container } from '@plone/components';
import SlotRenderer from '@plone/volto/components/theme/SlotRenderer/SlotRenderer';
import ColumnLinks from './ColumnLinks';
import type { Content } from '@plone/types';
import type { SiteFooterSettings } from '../../types';
import SimpleFooter from './SimpleFooter';

type FormState = {
  content: {
    data: Content;
  };
  form: {
    global: Content;
  };
};

const Footer = () => {
  const intl = useIntl();
  const content = useSelector<FormState, Content>(
    (state) => state.content.data,
    shallowEqual,
  );

  const footerSettings = useSelector<FormState, SiteFooterSettings>(
    (state) =>
      state.content.data?.['@components']?.inherit?.['voltolighttheme.footer']
        ?.data,
  );
  const footerLinks = footerSettings?.footer_links;

  return (
    <footer id="footer">
      <SlotRenderer name="preFooter" content={content} />

      <Container className="footer">
        {/* If there's not set footer_address then we show the simple footer */}
        {!footerSettings?.footer_address ? (
          <SimpleFooter footerLinks={footerLinks} />
        ) : (
          <Container className="default">
            <div className="footer-grid">
              <div className="address-column">
                <Logo />
                <p
                  style={{ whiteSpace: 'pre-line' }}
                  dangerouslySetInnerHTML={{
                    __html: footerSettings.footer_address,
                  }}
                />
              </div>
              {footerSettings?.footer_column_left && (
                <div className="address-left">
                  <ColumnLinks links={footerSettings.footer_column_left} />
                </div>
              )}
              {footerSettings?.footer_column_middle && (
                <div className="address-middle">
                  <ColumnLinks links={footerSettings.footer_column_middle} />
                </div>
              )}
              {footerSettings?.footer_column_right && (
                <div className="address-right">
                  <ColumnLinks links={footerSettings.footer_column_right} />
                </div>
              )}
            </div>
          </Container>
        )}
      </Container>

      <SlotRenderer name="postFooter" content={content} />
    </footer>
  );
};

export default Footer;
