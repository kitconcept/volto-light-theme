import * as React from 'react';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import cx from 'classnames';
import type { ObjectBrowserItem } from '@plone/types';

type CardProps = {
  className?: string;
  target?: string;
  image?: ObjectBrowserItem;
  imageSRC?: string;
  openLinkInNewTab?: boolean;
  item?: Partial<ObjectBrowserItem>;
  enableLink?: boolean;
  imageInset?: React.ReactNode;
  actionsInset?: React.ReactNode;
  imageComponent?: React.ComponentType<any>;
  summaryComponent?: React.ComponentType<any>;
  hide_description?: boolean;
};

type DefaultSummaryProps = {
  item: Partial<ObjectBrowserItem>;
  titleId?: string;
  HeadingTag?: React.ElementType;
  hide_description?: boolean;
};

const DefaultSummary = (props: DefaultSummaryProps) => {
  const { item, HeadingTag = 'h3', titleId, hide_description } = props;
  return (
    <>
      {item?.head_title && <div className="headline">{item.head_title}</div>}
      <HeadingTag className="title" id={titleId}>
        {item.title ? item.title : item.id}
      </HeadingTag>
      {!hide_description && <p className="description">{item.description}</p>}
    </>
  );
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
  const {
    className,
    target,
    item,
    image,
    imageSRC,
    openLinkInNewTab,
    enableLink,
    imageComponent,
    summaryComponent,
    hide_description,
    imageInset,
    actionsInset,
  } = props;

  const Image = imageComponent || DefaultImage;
  const Summary = summaryComponent || DefaultSummary;
  const titleId = React.useId();
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

  const hasImageInset =
    !!imageInset ||
    !!imageSRC ||
    !!image ||
    !!item.image_field ||
    item.hasPreviewImage;

  return (
    <div
      className={cx('card-wrapper', className)}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={enableLink ? 'link' : undefined}
      tabIndex={enableLink ? 0 : undefined}
      aria-labelledby={titleId}
    >
      {/* @ts-expect-error since this has no children, should fail */}
      <ConditionalLink
        aria-labelledby={titleId}
        condition={enableLink && !!target}
        href={target}
        openLinkInNewTab={openLinkInNewTab}
        ref={linkRef}
      />
      <div className="card">
        {hasImageInset && (
          <div className="image-wrapper">
            {imageInset ? (
              imageInset
            ) : (
              <>
                {/* It's an external image, providing a string (src) */}
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
          <div className="actions-wrapper">
            {actionsInset ? actionsInset : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
