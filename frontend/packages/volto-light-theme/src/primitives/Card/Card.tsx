import * as React from 'react';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import cx from 'classnames';
import type { ObjectBrowserItem } from '@plone/types';

type CardProps = {
  /** Optional additional CSS class names to apply to the card. */
  className?: string;
  /** Optional URL to make the card clickable as a link. */
  href?: string;
  /** If true and `href` is provided, opens the link in a new browser tab. */
  openLinkInNewTab?: boolean;
  children?: React.ReactNode;
};

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
  const { className, href, openLinkInNewTab } = props;

  const a11yLabelId = React.useId();
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  const triggerNavigation = () => {
    // Only navigate if there is *no* text selection
    const hasSelection = !!window.getSelection()?.toString();
    if (!hasSelection) {
      linkRef.current?.click();
    }
  };

  const onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (href) triggerNavigation();
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!href) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerNavigation();
    }
  };

  return (
    <div
      className={cx('card', className)}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={href ? 'link' : undefined}
      tabIndex={href ? 0 : undefined}
    >
      {/* @ts-expect-error since this has no children, should fail */}
      <ConditionalLink
        aria-labelledby={a11yLabelId}
        condition={!!href}
        href={href}
        openLinkInNewTab={openLinkInNewTab}
        ref={linkRef}
      />
      <div className="card-inner">
        {childrenWithProps(props.children, { a11yLabelId })}
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
};

const CardSummary = (props: CardSummaryProps) => (
  <div className="card-summary">
    {childrenWithProps(props.children, { a11yLabelId: props.a11yLabelId })}
  </div>
);

const CardActions = (props: any) => (
  <div className="actions-wrapper">{props.children}</div>
);

Card.Image = CardImage;
Card.Summary = CardSummary;
Card.Actions = CardActions;

export default Card;
