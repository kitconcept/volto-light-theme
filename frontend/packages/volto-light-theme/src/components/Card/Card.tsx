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

  return (
    <div
      className={cx('card', className)}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={enableLink ? 'link' : undefined}
      tabIndex={enableLink ? 0 : undefined}
      aria-labelledby={titleId}
    >
      {/* @ts-expect-error since this has no children, should fail */}
      <ConditionalLink
        condition={enableLink && !!target}
        href={target}
        openLinkInNewTab={openLinkInNewTab}
        aria-labelledby={titleId}
        ref={linkRef}
      />
      <div className="card-wrapper">
        {/* It's an external image, providing a string (src) */}
        {imageSRC ? (
          <div className="image-wrapper">
            <Image src={imageSRC} alt="" loading="lazy" responsive={true} />
          </div>
        ) : (
          (item.hasPreviewImage || item.image_field || image) && (
            <div className="image-wrapper">
              <Image
                item={image || item}
                imageField={image ? image.image_field : item.image_field}
                alt=""
                loading="lazy"
                responsive={true}
              />
            </div>
          )
        )}
        <div className="content">
          <Summary
            item={item}
            titleId={titleId}
            HeadingTag="h2"
            hide_description={hide_description}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
