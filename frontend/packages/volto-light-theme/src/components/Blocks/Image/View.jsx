/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import cx from 'classnames';
import Caption from '../../Caption/Caption';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import config from '@plone/volto/registry';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
export const ImageView = ({ className, data, detached, properties, style }) => {
  let href;
  if (data.href?.length > 0) {
    if (typeof data.href === 'object') {
      href = data.href[0]['@id'];
    } else if (typeof data.href === 'string') {
      // just to catch cases where a string might be supplied
      href = data.href;
    }
  }

  const Image = config.getComponent({ name: 'Image' }).component;
  const shouldRenderCaption =
    data.title ||
    data.description ||
    (data?.copyright_and_sources ?? data.credit?.data);

  return (
    <div
      className={cx(
        'block image align',
        {
          center: !Boolean(data.align),
          detached,
        },
        data.align,
        className,
      )}
      style={style}
    >
      {data.url && (
        <>
          {(() => {
            const image = (
              <figure
                className={cx(
                  'figure',
                  {
                    center: !Boolean(data.align),
                    detached,
                  },
                  data.align,
                  {
                    // START CUSTOMIZATION
                    // 'full-width': data.align === 'full',
                    // END CUSTOMIZATION
                    large: data.size === 'l',
                    medium: data.size === 'm' || !data.size,
                    small: data.size === 's',
                  },
                )}
              >
                <Image
                  // Removed for now
                  // className={cx({
                  //   'full-width': data.align === 'full',
                  //   large: data.size === 'l',
                  //   medium: data.size === 'm',
                  //   small: data.size === 's',
                  // })}
                  item={
                    data.image_scales
                      ? {
                          '@id': data.url,
                          image_field: data.image_field,
                          image_scales: data.image_scales,
                        }
                      : undefined
                  }
                  src={
                    data.image_scales
                      ? undefined
                      : isInternalURL(data.url)
                        ? // Backwards compat in the case that the block is storing the full server URL
                          (() => {
                            if (data.size === 'l')
                              return `${flattenToAppURL(
                                data.url,
                              )}/@@images/image`;
                            if (data.size === 'm')
                              return `${flattenToAppURL(
                                data.url,
                              )}/@@images/image/preview`;
                            if (data.size === 's')
                              return `${flattenToAppURL(
                                data.url,
                              )}/@@images/image/mini`;
                            return `${flattenToAppURL(data.url)}/@@images/image`;
                          })()
                        : data.url
                  }
                  sizes={config.blocks.blocksConfig.image.getSizes(data)}
                  alt={data.alt || ''}
                  loading="lazy"
                  responsive={true}
                />
                {shouldRenderCaption && (
                  <Caption
                    title={data.title}
                    description={data.description}
                    credit={data?.copyright_and_sources ?? data.credit?.data}
                  />
                )}
              </figure>
            );
            if (href) {
              return (
                <UniversalLink
                  href={href}
                  openLinkInNewTab={data.openLinkInNewTab}
                >
                  {image}
                </UniversalLink>
              );
            } else {
              return image;
            }
          })()}
        </>
      )}
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ImageView.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withBlockExtensions(ImageView);
