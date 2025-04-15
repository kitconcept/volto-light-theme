import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import LinkList from './LinkList';
import IconLinkList from './IconLinkList';
import type { SiteFooterSettings } from '../../types';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/liveData';
import type { Content } from '@plone/types';

type SimpleFooterProps = {
  footer_links: SiteFooterSettings['footer_links'];
  content: Content;
};

const SimpleFooter = (props: SimpleFooterProps) => {
  const { content, footer_links } = props;

  const followus_links = useLiveData<SiteFooterSettings['followus_links']>(
    content,
    'voltolighttheme.footer',
    'followus_links',
  );

  return (
    <div className="followus-and-links">
      <div className="follow-us">
        <span>
          <FormattedMessage id="Follow us:" defaultMessage="Follow us:" />
        </span>
        <IconLinkList iconLinks={followus_links} />
      </div>
      <div className="footer-links">
        <LinkList links={footer_links} />
      </div>
    </div>
  );
};

export default SimpleFooter;
