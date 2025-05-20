import { Container } from '@plone/components';
import Copyright from './Copyright';
import Logo from '../../Logo/Logo';
import type { Content } from '@plone/types';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/useLiveData';
import type { SiteFooterSettings, SiteHeaderSettings } from '../../../types';

const Colophon = ({ content }: { content: Content }) => {
  const logo = useLiveData<SiteHeaderSettings['logo']>(
    content,
    'voltolighttheme.header',
    'logo',
  );

  const footer_colophon_text = useLiveData<
    SiteFooterSettings['footer_colophon_text']
  >(content, 'voltolighttheme.footer', 'footer_colophon_text');

  return (
    <Container className="colophon">
      {footer_colophon_text ? (
        <>{footer_colophon_text}</>
      ) : (
        <>
          <div className="powered-by">
            Powered by Plone and Volto Light Theme
          </div>
          <Copyright />
          {!logo && <Logo />}
        </>
      )}
    </Container>
  );
};

export default Colophon;
