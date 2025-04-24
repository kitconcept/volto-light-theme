import { useSelector, shallowEqual } from 'react-redux';
import Logo from '@plone/volto/components/theme/Logo/Logo';
import { Container } from '@plone/components';
import SlotRenderer from '@plone/volto/components/theme/SlotRenderer/SlotRenderer';
import ColumnLinks from './ColumnLinks';
import type { Content } from '@plone/types';
import type { SiteFooterSettings } from '../../types';
import SimpleFooter from './SimpleFooter';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/liveData';

type FormState = {
  content: {
    data: Content;
  };
  form: {
    global: Content;
  };
};

const Footer = () => {
  const content = useSelector<FormState, Content>(
    (state) => state.content.data,
    shallowEqual,
  );

  const footer_links = useLiveData<SiteFooterSettings['footer_links']>(
    content,
    'voltolighttheme.footer',
    'footer_links',
  );

  return (
    <footer id="footer">
      <SlotRenderer name="preFooter" content={content} />
      <SlotRenderer name="footer" content={content} />
      <Container className="post-footer">
        <SlotRenderer name="postFooter" content={content} />
      </Container>
      {/* <Container className="footer">
        {!has_enhanced_footer ? (
          <SimpleFooter content={content} footer_links={footer_links} />
        ) : (
          <Container className="default">
            <div className="footer-grid">
              <div className="address-column">
                <Logo />
                <p
                  style={{ whiteSpace: 'pre-line' }}
                  dangerouslySetInnerHTML={{
                    __html: footer_address,
                  }}
                />
              </div>

              {footer_column_left && (
                <div className="address-left">
                  {footer_column_left_header && (
                    <h2>{footer_column_left_header}</h2>
                  )}
                  <ColumnLinks links={footer_column_left} />
                </div>
              )}

              {footer_column_middle && (
                <div className="address-middle">
                  {footer_column_middle_header && (
                    <h2>{footer_column_middle_header}</h2>
                  )}
                  <ColumnLinks links={footer_column_middle} />
                </div>
              )}

              {footer_column_right && (
                <div className="address-right">
                  {footer_column_right_header && (
                    <h2>{footer_column_right_header}</h2>
                  )}
                  <ColumnLinks links={footer_column_right} />
                </div>
              )}
            </div>
          </Container>
        )}
      </Container> */}
    </footer>
  );
};

export default Footer;
