import { Container } from '@plone/components';
import Copyright from './Copyright';
import Logo from '../../Logo/Logo';
import type { Content } from '@plone/types';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/liveData';
import type { SiteHeaderSettings } from '../../../types';

const Colophon = ({ content }: { content: Content }) => {
  const logo = useLiveData<SiteHeaderSettings['logo']>(
    content,
    'voltolighttheme.header',
    'logo',
  );
  console.log(logo);
  return (
    <Container className="colophon">
      <div className="powered-by">Powered by Plone & Light Theme</div>
      <Copyright />
      {!logo && <Logo />}
    </Container>
  );
};

export default Colophon;
