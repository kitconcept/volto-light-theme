import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import { Container } from '@plone/components';
import { useLiveData } from '@kitconcept/volto-light-theme/helpers/useLiveData';
import LinkList from '../LinkList';
import type { SiteFooterSettings } from '../../../types';
import type { Content } from '@plone/types';
import SlotRenderer from '@plone/volto/components/theme/SlotRenderer/SlotRenderer';

const FollowUsPostFooterLogoAndLinks = ({ content }: { content: Content }) => {
  const footer_links = useLiveData<SiteFooterSettings['footer_links']>(
    content,
    'voltolighttheme.footer',
    'footer_links',
  );

  const footer_logo = useLiveData<SiteFooterSettings['footer_logo']>(
    content,
    'kitconcept.volto.footer',
    'footer_logo',
  );

  const footerLogoSrc = footer_logo?.data
    ? `data:${footer_logo['content-type']};base64,${footer_logo.data}`
    : flattenToAppURL(footer_logo?.download);

  return content ? (
    <Container
      className={cx('default follow-us-links-and-logo', {
        'no-logo': !footer_logo?.data && !footer_logo?.download,
      })}
    >
      <div className="followus-and-links">
        <div className="follow-us">
          <span>
            <FormattedMessage id="Follow us:" defaultMessage="Follow us:" />
          </span>
          <SlotRenderer name="followUs" content={content} />
        </div>
        <div className="footer-links">
          <SlotRenderer name="footerLinks" content={content} />
          <LinkList links={footer_links} />
        </div>
      </div>
      {footer_logo?.data || footer_logo?.download ? (
        <div className="footer-logo">
          <span>
            <FormattedMessage
              id="Sponsored by:"
              defaultMessage="Sponsored by:"
            />
          </span>
          {/* @ts-ignore */}
          <ConditionalLink
            condition={content?.footer_logo_link}
            to={content?.footer_logo_link}
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
