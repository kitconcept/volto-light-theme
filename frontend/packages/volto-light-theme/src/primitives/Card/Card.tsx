import * as React from 'react';
import { useSelector } from 'react-redux';
import type { GetSiteResponse } from '@plone/types';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import cx from 'classnames';
import type { ObjectBrowserItem } from '@plone/types';
import linkSVG from '@plone/volto/icons/link.svg';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { Button } from '@plone/components';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { useLocation, useHistory } from 'react-router-dom';

type BaseCardProps = {
  /** Optional additional CSS class names to apply to the card. */
  className?: string;
  openLinkInNewTab?: boolean;
  children?: React.ReactNode;
};
type FormState = {
  site: { data: GetSiteResponse };
};

type CardPropsWithItem = BaseCardProps & {
  /** List of items rendered within the card. Mutually exclusive with `href`. */
  href?: never;
  item: Partial<ObjectBrowserItem>;
  showLink?: boolean;
};

type CardPropsWithoutItem = BaseCardProps & {
  /** Optional URL to make the card clickable as a link. */
  href?: string | undefined | null;
  item?: never;
  showLink?: boolean;
};

type CardProps = CardPropsWithItem | CardPropsWithoutItem;

const DefaultImage = (props: any) => {
  const { src, item, imageField, alt, loading, responsive } = props;
  return (
    <img
      src={src || item?.image_scales?.[imageField]?.[0].download}
      alt={alt}
      loading={loading}
      className={responsive ? 'responsive' : ''}
    />
  );
};

const childrenWithProps = (children, extraProps) => {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, extraProps);
    }
    return child;
  });
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
  const hideProfileLinks = site?.['kitconcept.disable_profile_links'];
  const isPersonProfile = item?.['@type'] === 'Person' && hideProfileLinks;
  const handleLinkIconClick = useLinkIconNavigation(item);
  return (
    isPersonProfile && (
      <div className="card-link-icon">
        <Button aria-label="link" onClick={handleLinkIconClick}>
          <Icon name={linkSVG} size="33px" />
        </Button>
      </div>
    )
  );
};
const Card = (props: CardProps) => {
  const hasItem = !!props.item;
  const item = hasItem ? props.item : undefined;
  const href = !hasItem ? props.href : undefined;
  const { className, openLinkInNewTab, showLink } = props;

  const a11yLabelId = React.useId();

  const isInteractive = !!href || showLink;

  const LinkToItem = React.useCallback(
    ({ children }: { children: React.ReactNode }) => {
      return (
        <ConditionalLink
          className="card-primary-link"
          condition={isInteractive}
          href={href}
          item={item}
          openLinkInNewTab={openLinkInNewTab}
        >
          {children}
        </ConditionalLink>
      );
    },
    [href, item, isInteractive, openLinkInNewTab],
  );
  return (
    <div className={cx('card', className)}>
      <div className="card-inner">
        {childrenWithProps(props.children, { a11yLabelId, LinkToItem, item })}
      </div>
    </div>
  );
};

type CardImageProps = {
  /** The source URL of the image to display. */
  src?: string;
  /** An optional item object, used to provide image data from the current item. */
  item?: Partial<ObjectBrowserItem>;
  /** An optional image object, used as an alternative source of image data for the item. */
  image?: Partial<ObjectBrowserItem>;
  /** A custom React component to render the image. */
  imageComponent?: React.ComponentType<any>;
  children?: React.ReactNode;
  showPlaceholderImage?: boolean;
};

const CardImage = (props: CardImageProps) => {
  const { src, item, image, imageComponent, showPlaceholderImage } = props;

  const Image = imageComponent || DefaultImage;

  return (
    <div className="image-wrapper">
      <LinkIconButton item={item} />
      {src ? (
        <Image src={src} alt="" loading="lazy" responsive={true} />
      ) : item || image ? (
        (item?.hasPreviewImage ||
          item?.image_field ||
          image ||
          showPlaceholderImage) && (
          <Image
            item={image || item}
            imageField={image ? image.image_field : item?.image_field}
            alt=""
            loading="lazy"
            responsive={true}
          />
        )
      ) : (
        props.children
      )}
    </div>
  );
};

type CardSummaryProps = {
  /** The ID of the element that labels the card. */
  a11yLabelId?: string;
  item?: Partial<ObjectBrowserItem>;
  LinkToItem?: React.ElementType;
  children?: React.ReactNode;
};

const CardSummary = (props: CardSummaryProps) => {
  const { children, a11yLabelId, item, LinkToItem } = props;
  return (
    <div className="card-summary">
      <LinkIconButton item={item} />
      {childrenWithProps(children, {
        a11yLabelId: a11yLabelId,
        LinkToItem,
      })}
    </div>
  );
};

const CardActions = (props: any) => (
  <div className="actions-wrapper">{props.children}</div>
);

Card.Image = CardImage;
Card.Summary = CardSummary;
Card.Actions = CardActions;

export default Card;
