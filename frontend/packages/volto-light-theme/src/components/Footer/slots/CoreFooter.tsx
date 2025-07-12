import { Container } from '@plone/components';
import Logo from '@plone/volto/components/theme/Logo/Logo';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/useLiveData';
import ColumnLinks from '../ColumnLinks';
import type { SiteFooterSettings } from '../../../types';
import type { Content } from '@plone/types';

const CoreFooter = ({ content }: { content: Content }) => {
  const footer_address = useLiveData<SiteFooterSettings['footer_address']>(
    content,
    'kitconcept.footer',
    'footer_address',
  );

  const footer_column_left_header = useLiveData<
    SiteFooterSettings['footer_column_left_header']
  >(content, 'kitconcept.footer', 'footer_column_left_header');
  const footer_column_left = useLiveData<
    SiteFooterSettings['footer_column_left']
  >(content, 'kitconcept.footer', 'footer_column_left');

  const footer_column_middle_header = useLiveData<
    SiteFooterSettings['footer_column_middle_header']
  >(content, 'kitconcept.footer', 'footer_column_middle_header');
  const footer_column_middle = useLiveData<
    SiteFooterSettings['footer_column_middle']
  >(content, 'kitconcept.footer', 'footer_column_middle');

  const footer_column_right_header = useLiveData<
    SiteFooterSettings['footer_column_right_header']
  >(content, 'kitconcept.footer', 'footer_column_right_header');
  const footer_column_right = useLiveData<
    SiteFooterSettings['footer_column_right']
  >(content, 'kitconcept.footer', 'footer_column_right');

  return (
    <Container className="main-footer">
      <Container className="default">
        <div className="footer-grid">
          <div className="address-column">
            {/* @ts-ignore the Logo definition is different from the Volto one */}
            <Logo isFooterLogo />
            <p
              style={{ whiteSpace: 'pre-line' }}
              dangerouslySetInnerHTML={{
                __html: footer_address,
              }}
            />
          </div>

          {footer_column_left && (
            <div className="column-left">
              {footer_column_left_header && (
                <h2>{footer_column_left_header}</h2>
              )}
              <ColumnLinks links={footer_column_left} />
            </div>
          )}

          {footer_column_middle && (
            <div className="column-middle">
              {footer_column_middle_header && (
                <h2>{footer_column_middle_header}</h2>
              )}
              <ColumnLinks links={footer_column_middle} />
            </div>
          )}

          {footer_column_right && (
            <div className="column-right">
              {footer_column_right_header && (
                <h2>{footer_column_right_header}</h2>
              )}
              <ColumnLinks links={footer_column_right} />
            </div>
          )}
        </div>
      </Container>
    </Container>
  );
};

export default CoreFooter;
