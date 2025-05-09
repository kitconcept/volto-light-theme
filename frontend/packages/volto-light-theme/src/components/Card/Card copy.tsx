import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import cx from 'classnames';
import config from '@plone/volto/registry';
import DefaultSummary from '@kitconcept/volto-light-theme/components/Summary/DefaultSummary';
import type { objectBrowserHref } from '@plone/types';

type CardProps = {
  className?: string;
  hrefObj?: objectBrowserHref;
  preview_image?: objectBrowserHref;
  openLinkInNewTab?: boolean;
};

const Card = (props: CardProps) => {
  const { className, hrefObj, preview_image, openLinkInNewTab, isEditMode } =
    props;
  const href = hrefObj?.[0];
  const image = preview_image?.[0];
  const url = preview_image?.[0]?.['@id'];

  const Image = config.getComponent('Image').component;
  const Summary =
    config.getComponent({
      name: 'Summary',
      dependencies: [href['@type']],
    }).component || DefaultSummary;
  const { openExternalLinkInNewTab } = config.settings;

  return (
    <>
      {href && (
        <ConditionalLink
          condition={!isEditMode}
          href={href['@id']}
          target={
            openLinkInNewTab ||
            (openExternalLinkInNewTab && !isInternalURL(href['@id']))
              ? '_blank'
              : null
          }
        >
          <div className={cx('card-wrapper', className)}>
            {url && !image?.image_field ? (
              <div className="image-wrapper">
                <Image src={url} alt="" loading="lazy" responsive={true} />
              </div>
            ) : (
              (href.hasPreviewImage || href.image_field || image) && (
                <div className="image-wrapper">
                  <Image
                    item={image || href}
                    imageField={image ? image.image_field : href.image_field}
                    alt=""
                    loading="lazy"
                    responsive={true}
                  />
                </div>
              )
            )}
            <div className="content">
              <Summary item={{ ...href }} HeadingTag="h2" />
            </div>
          </div>
        </ConditionalLink>
      )}
    </>
  );
};

export default Card;
