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
  item?: ObjectBrowserItem;
  enableLink?: boolean;
  imageComponent?: React.ComponentType<any>;
  summaryComponent?: React.ComponentType<any>;
};

type DefaultSummaryProps = {
  item: ObjectBrowserItem;
  HeadingTag?: React.ElementType;
};

const DefaultSummary = (props: DefaultSummaryProps) => {
  const { item, HeadingTag = 'h3' } = props;
  return (
    <>
      {item?.head_title && <div className="headline">{item.head_title}</div>}
      <HeadingTag className="title">
        {item.title ? item.title : item.id}
      </HeadingTag>
      {!item.hide_description && (
        <p className="description">{item.description}</p>
      )}
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
  } = props;

  const Image = imageComponent || DefaultImage;
  const Summary = summaryComponent || DefaultSummary;
  const titleId = React.useId();

  return (
    <div className="card">
      {target && (
        <>
          <ConditionalLink
            condition={enableLink}
            href={target}
            target={openLinkInNewTab}
            aria-labelledby={titleId}
          />
          <div className={cx('card-wrapper', className)}>
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
              <Summary item={item} titleId={titleId} HeadingTag="h2" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
