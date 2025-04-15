import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import { Container } from '@plone/components';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/liveData';
import LinkList from './LinkList';
import IconLinkList from './IconLinkList';
import type { SiteFooterSettings } from '../../types';
import type { Content } from '@plone/types';
import { FormattedMessage } from 'react-intl';

const FollowUsPostFooterLogoAndLinks = ({ content }: { content: Content }) => {
  const has_enhanced_footer = useLiveData<
    SiteFooterSettings['has_enhanced_footer']
  >(content, 'voltolighttheme.footer', 'has_enhanced_footer');

  const followus_links = useLiveData<SiteFooterSettings['followus_links']>(
    content,
    'voltolighttheme.footer',
    'followus_links',
  );

  const footer_links = useLiveData<SiteFooterSettings['footer_links']>(
    content,
    'voltolighttheme.footer',
    'footer_links',
  );

  const footer_logo = useLiveData<SiteFooterSettings['footer_logo']>(
    content,
    'voltolighttheme.footer',
    'footer_logo',
  );

  return (
    <>
      {has_enhanced_footer ? (
        <Container className="default follow-us-links-and-logo">
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
          <div className="footer-logo">
            {/* @ts-ignore */}
            <ConditionalLink
              condition={content?.footer_logo_link}
              to={content?.footer_logo_link}
            >
              <img
                src={
                  footer_logo?.data
                    ? `data:${footer_logo['content-type']};base64,${footer_logo.data}`
                    : footer_logo?.download
                }
                alt="Sponsor Logo"
              />
            </ConditionalLink>
          </div>
        </Container>
      ) : null}
    </>
  );
};

export default FollowUsPostFooterLogoAndLinks;
