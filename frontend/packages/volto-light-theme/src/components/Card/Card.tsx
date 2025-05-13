import * as React from 'react';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import cx from 'classnames';
import type { ObjectBrowserItem } from '@plone/types';

type CardProps = {
  className?: string;
  href?: string;
  a11yLinkId?: string;
  openLinkInNewTab?: boolean;
  enableLink?: boolean;
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

const Card = (props: CardProps) => {
  const { className, href, openLinkInNewTab, enableLink, a11yLinkId } = props;

  const linkRef = React.useRef<HTMLAnchorElement>(null);

  const triggerNavigation = () => {
    // Only navigate if there is *no* text selection
    const hasSelection = !!window.getSelection()?.toString();
    if (!hasSelection) {
      linkRef.current?.click();
    }
  };

  const onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (enableLink) triggerNavigation();
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!enableLink) return;
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
      role={enableLink ? 'link' : undefined}
      tabIndex={enableLink ? 0 : undefined}
    >
      {/* @ts-expect-error since this has no children, should fail */}
      <ConditionalLink
        aria-labelledby={a11yLinkId}
        condition={enableLink && !!href}
        href={href}
        openLinkInNewTab={openLinkInNewTab}
        ref={linkRef}
      />
      <div className="content-wrapper">
        {props.children}
        {/*
        {hasImageInset && (
          <div className="image-wrapper">
            {imageInset ? (
              imageInset
            ) : (
              <>

                {imageSRC ? (
                  <Image
                    src={imageSRC}
                    alt=""
                    loading="lazy"
                    responsive={true}
                  />
                ) : (
                  (item.hasPreviewImage || item.image_field || image) && (
                    <Image
                      item={image || item}
                      imageField={image ? image.image_field : item.image_field}
                      alt=""
                      loading="lazy"
                      responsive={true}
                    />
                  )
                )}
              </>
            )}
          </div>
        )}
        <div className="content">
          <Summary
            item={item}
            titleId={titleId}
            HeadingTag="h2"
            hide_description={hide_description}
          />
          {actionsInset ? (
            <div className="actions-wrapper">{actionsInset}</div>
          ) : null}
        </div>*/}
      </div>
    </div>
  );
};

type CardImageProps = {
  src?: string;
  item?: Partial<ObjectBrowserItem>;
  image?: ObjectBrowserItem;
  imageComponent?: React.ComponentType<any>;
  children?: React.ReactNode;
};

const CardImage = (props: CardImageProps) => {
  const { src, item, image, imageComponent } = props;
  const Image = imageComponent || DefaultImage;

  return (
    <div className="image-wrapper">
      {src ? (
        <Image src={src} alt="" loading="lazy" responsive={true} />
      ) : item || image ? (
        (item.hasPreviewImage || item.image_field || image) && (
          <Image
            item={image || item}
            imageField={image ? image.image_field : item.image_field}
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

const CardSummary = (props: any) => (
  <div className="content">{props.children}</div>
);
const CardActions = (props: any) => (
  <div className="actions-wrapper">{props.children}</div>
);

Card.Image = CardImage;
Card.Summary = CardSummary;
Card.Actions = CardActions;

export default Card;
