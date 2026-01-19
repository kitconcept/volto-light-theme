import { Container } from '@plone/components';
import Copyright from './Copyright';
import Logo from '../../Logo/Logo';
import type { Content } from '@plone/types';
import isString from 'lodash/isString';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/useLiveData';
import type { SiteFooterSettings, SiteHeaderSettings } from '../../../types';
import config from '@plone/volto/registry';
import { createParagraph } from '@plone/volto-slate/utils';

const Colophon = ({ content }: { content: Content }) => {
  const logo = useLiveData<SiteHeaderSettings['logo']>(
    content,
    'voltolighttheme.header',
    'logo',
  );

  const getValue = (value) => {
    // Previously this was a text field
    if (isString(value)) {
      return [createParagraph(value)];
    }
    return value;
  };

  const footer_colophon_text = useLiveData<
    SiteFooterSettings['footer_colophon_text']
  >(content, 'voltolighttheme.footer', 'footer_colophon_text');
  const RenderSlateToHtml = config.widgets.views.widget.slate_richtext;

  return (
    <Container className="colophon">
      {footer_colophon_text ? (
        <RenderSlateToHtml value={getValue(footer_colophon_text)} />
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
