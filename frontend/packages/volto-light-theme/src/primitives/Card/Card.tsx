import * as React from 'react';
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

  const a11yLabelId = React.useId();
  const linkRef = React.useRef<HTMLAnchorElement>(null);
  const downTimeRef = React.useRef<number>(0);

  const isInteractive = !!props.href || !!props.item;

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = () => {
    downTimeRef.current = Date.now();
  };

  const onMouseUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // Native links handle their own clicks
    if (e.target instanceof Element && e.target.closest('a')) return;
    // Only navigate on quick clicks without text selection
    const timeElapsed = Date.now() - downTimeRef.current;
    if (timeElapsed < 200) {
      const hasSelection = !!window.getSelection()?.toString();
      if (!hasSelection) {
        linkRef.current?.click();
      }
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cx('card', className)}
      onMouseDown={isInteractive ? onMouseDown : undefined}
      onMouseUp={isInteractive ? onMouseUp : undefined}
    >
      <div className="card-inner">
        {childrenWithProps(props.children, {
          a11yLabelId,
          cardHref: href,
          cardItem: item,
          cardOpenLinkInNewTab: openLinkInNewTab,
          cardIsInteractive: isInteractive,
          cardPrimaryLinkRef: linkRef,
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
  children?: React.ReactNode;
  cardHref?: string;
  cardItem?: Partial<ObjectBrowserItem>;
  cardOpenLinkInNewTab?: boolean;
  cardIsInteractive?: boolean;
  cardPrimaryLinkRef?: React.RefObject<HTMLAnchorElement | null>;
};

const CardSummary = (props: CardSummaryProps) => (
  <div className="card-summary">
    {childrenWithProps(props.children, {
      a11yLabelId: props.a11yLabelId,
      cardHref: props.cardHref,
      cardItem: props.cardItem,
      cardOpenLinkInNewTab: props.cardOpenLinkInNewTab,
      cardIsInteractive: props.cardIsInteractive,
      cardPrimaryLinkRef: props.cardPrimaryLinkRef,
    })}
  </div>
);

const CardActions = (props: any) => (
  <div className="actions-wrapper">{props.children}</div>
);

Card.Image = CardImage;
Card.Summary = CardSummary;
Card.Actions = CardActions;

export default Card;
