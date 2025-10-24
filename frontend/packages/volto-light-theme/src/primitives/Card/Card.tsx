import * as React from 'react';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import cx from 'classnames';
import type { ObjectBrowserItem } from '@plone/types';

type BaseCardProps = {
  /** Optional additional CSS class names to apply to the card. */
  className?: string;
  openLinkInNewTab?: boolean;
  children?: React.ReactNode;
};

type CardPropsWithItem = BaseCardProps & {
  /** List of items rendered within the card. Mutually exclusive with `href`. */
  href?: never;
  item: Partial<ObjectBrowserItem>;
};

type CardPropsWithoutItem = BaseCardProps & {
  /** Optional URL to make the card clickable as a link. */
  href?: string | undefined | null;
  item?: never;
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

const Card = (props: CardProps) => {
  const hasItem = !!props.item;
  const item = hasItem ? props.item : undefined;
  const href = !hasItem ? props.href : undefined;
  const { className, openLinkInNewTab } = props;

  const linkRef = React.useRef<HTMLAnchorElement>(null);

  const triggerNavigation = () => {
    // Only navigate if there is *no* text selection
    const hasSelection = !!window.getSelection()?.toString();
    if (!hasSelection) {
      linkRef.current?.click();
    }
  };

  const isInteractive = !!props.href || !!props.item;

  const onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (isInteractive) triggerNavigation();
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!isInteractive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerNavigation();
    }
  };

  const LinkToItem = React.useCallback(
    ({ children }) => {
      return (
        <ConditionalLink
          className="card-link"
          condition={isInteractive}
          href={href}
          item={item}
          openLinkInNewTab={openLinkInNewTab}
          ref={linkRef}
        >
          {children}
        </ConditionalLink>
      );
    },
    [href, item, isInteractive, openLinkInNewTab],
  );

  return (
    <div
      className={cx('card', className)}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={isInteractive ? onKeyDown : undefined}
      role={isInteractive ? 'link' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      <div className="card-inner">
        {childrenWithProps(props.children, {
          LinkToItem,
        })}
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
  LinkToItem?: React.ElementType;
  children?: React.ReactNode;
};

const CardSummary = (props: CardSummaryProps) => {
  const { a11yLabelId, LinkToItem } = props;
  return (
    <div className="card-summary">
      {childrenWithProps(props.children, {
        a11yLabelId,
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
