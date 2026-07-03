import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import type { ObjectBrowserItem, GetSiteResponse } from '@plone/types';
import linkSVG from '@plone/volto/icons/link.svg';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { Button } from '@plone/components';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

type FormState = {
  site: { data: GetSiteResponse };
};

const useLinkIconNavigation = (item?: Partial<ObjectBrowserItem>) => {
  const location = useLocation();
  const history = useHistory();

  const handleLinkIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const targetUrl = item?.['@id'];
    if (targetUrl) {
      const flattenedTargetUrl = flattenToAppURL(targetUrl);
      const searchParams = new URLSearchParams();
      searchParams.set('return_to', location.pathname);

      history.push({
        pathname: flattenedTargetUrl,
        search: searchParams.toString(),
      });
    }
  };
  return handleLinkIconClick;
};
const LinkIconButton = ({ item }: { item?: Partial<ObjectBrowserItem> }) => {
  const site = useSelector<FormState, GetSiteResponse>(
    (state) => state.site?.data,
  );
  const showProfileLinks = site?.['kitconcept.clickable_profile_links'];
  const handleLinkIconClick = useLinkIconNavigation(item);
  return (
    !showProfileLinks && (
      <div className="card-link-icon">
        <Button aria-label="link" onClick={handleLinkIconClick}>
          <Icon name={linkSVG} size="33px" />
        </Button>
      </div>
    )
  );
};

export default LinkIconButton;
