import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import { Container } from '@plone/components';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/useLiveData';
import LinkList from '../../../primitives/LinkList';
import type {
  PloneGobrSocialMediaSettings,
  SiteFooterSettings,
} from '../../../types';
import type { Content } from '@plone/types';
import SlotRenderer from '@plone/volto/components/theme/SlotRenderer/SlotRenderer';

const FollowUsPostFooterLogoAndLinks = ({ content }: { content: Content }) => {
  const social_links = useLiveData<
    PloneGobrSocialMediaSettings['social_links']
  >(content, 'plonegovbr.socialmedia.settings', 'social_links');

  const footer_links = useLiveData<SiteFooterSettings['footer_links']>(
    content,
    'voltolighttheme.footer',
    'footer_links',
  );

  const post_footer_logo = useLiveData<SiteFooterSettings['post_footer_logo']>(
    content,
    'kitconcept.footer',
    'post_footer_logo',
  );

  const footerLogoSrc = post_footer_logo?.data
    ? `data:${post_footer_logo['content-type']};base64,${post_footer_logo.data}`
    : flattenToAppURL(post_footer_logo?.download);

  return content ? (
    <Container
      className={cx('default follow-us-links-and-logo', {
        'no-logo': !post_footer_logo?.data && !post_footer_logo?.download,
      })}
    >
      <div className="followus-and-links">
        {social_links?.length > 0 && (
          <div className="follow-us">
            <span>
              <FormattedMessage id="Follow us:" defaultMessage="Follow us:" />
            </span>
            <SlotRenderer name="followUs" content={content} />
          </div>
        )}
        {footer_links?.length > 0 && (
          <div className="footer-links">
            <SlotRenderer name="footerLinks" content={content} />
            <LinkList links={footer_links} />
          </div>
        )}
      </div>
      {post_footer_logo?.data || post_footer_logo?.download ? (
        <div className="footer-logo">
          <span>
            <FormattedMessage
              id="Sponsored by:"
              defaultMessage="Sponsored by:"
            />
          </span>
          {/* @ts-ignore */}
          <ConditionalLink
            condition={content?.post_footer_logo_link}
            to={content?.post_footer_logo_link}
            openLinkInNewTab={true}
          >
            <img src={footerLogoSrc} alt="Sponsor Logo" />
          </ConditionalLink>
        </div>
      ) : null}
    </Container>
  ) : null;
};

export default FollowUsPostFooterLogoAndLinks;
