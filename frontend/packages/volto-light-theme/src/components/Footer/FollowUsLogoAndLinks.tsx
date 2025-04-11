import FooterLinks from './FooterLinks';
import type { SiteFooterSettings } from '../../types';
import type { Content } from '@plone/types';
import { useSelector } from 'react-redux';
import IconLinkList from './IconLinkList';

type FormState = {
  content: {
    data: Content;
  };
  form: {
    global: Content;
  };
};

const FollowUsPostFooterLogoAndLinks = ({ content }: { content: Content }) => {
  const currentFollowUsData =
    content?.['@components']?.inherit?.['voltolighttheme.footer']?.data
      ?.followus_links;

  const formDataFollowUsLinks = useSelector<
    FormState,
    SiteFooterSettings['followus_links']
  >((state) => state.form.global?.followus_links);

  const formDataFooterLinks = useSelector<
    FormState,
    SiteFooterSettings['footer_links']
  >((state) => state.form.global?.footer_links);

  const followUsData = formDataFollowUsLinks || currentFollowUsData;

  const currentFooterLinks =
    content?.['@components']?.inherit?.['voltolighttheme.footer']?.data
      ?.footer_links;

  const footerLinks = formDataFooterLinks || currentFooterLinks;

  return (
    <div className="follow-us-post-footer-logo-and-links">
      <div className="follow-us">
        <IconLinkList iconLinks={followUsData} />
      </div>
      <FooterLinks links={footerLinks} />
    </div>
  );
};

export default FollowUsPostFooterLogoAndLinks;
