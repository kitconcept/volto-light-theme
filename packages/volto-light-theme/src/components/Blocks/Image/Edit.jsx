import React from 'react';
import cx from 'classnames';
import ImageSidebar from '@plone/volto/components/manage/Blocks/Image/ImageSidebar';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';

import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import config from '@plone/volto/registry';

import { ImageInput } from '@plone/volto/components/manage/Widgets/ImageWidget';
import Caption from '../../Caption/Caption';

function Edit(props) {
  const { data } = props;
  const Image = config.getComponent({ name: 'Image' }).component;
  const onSelectItem = React.useCallback(
    (url, item) => {
      const dataAdapter = props.blocksConfig[props.data['@type']].dataAdapter;
      dataAdapter({
        block: props.block,
        data: props.data,
        onChangeBlock: props.onChangeBlock,
        id: 'url',
        value: url,
        item,
      });
    },
    [props],
  );

  const handleChange = React.useCallback(
    async (id, image, { title, image_field, image_scales } = {}) => {
      const url = image ? image['@id'] || image : '';

      props.onChangeBlock(props.block, {
        ...props.data,
        url: flattenToAppURL(url),
        image_field,
        image_scales,
        alt: props.data.alt || title || '',
      });
    },
    [props],
  );

  return (
    <>
      <div
        className={cx(
          'block image align',
          {
            center: !Boolean(data.align),
          },
          data.align,
        )}
      >
        {data.url ? (
          <figure
            className={cx(
              'figure',
              {
                center: !Boolean(data.align),
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
              // START CUSTOMIZATION - Moved to the figure
              // className={cx({
              //   'full-width': data.align === 'full',
              //   large: data.size === 'l',
              //   medium: data.size === 'm',
              //   small: data.size === 's',
              // })}
              // END CUSTOMIZATION
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
                          return `${flattenToAppURL(data.url)}/@@images/image`;
                        if (data.size === 'm')
                          return `${flattenToAppURL(
                            data.url,
                          )}/@@images/image/preview`;
                        if (data.size === 's')
                          return `${flattenToAppURL(data.url)}/@@images/image/mini`;
                        return `${flattenToAppURL(data.url)}/@@images/image`;
                      })()
                    : data.url
              }
              sizes={config.blocks.blocksConfig.image.getSizes(data)}
              alt={data.alt || ''}
              loading="lazy"
              responsive={true}
            />
            <Caption
              title={data.title}
              description={data.description}
              credit={data?.copyright_and_sources ?? data.credit?.data}
            />
          </figure>
        ) : (
          <ImageInput
            onChange={handleChange}
            placeholderLinkInput={data.placeholder}
            block={props.block}
            id={props.block}
            objectBrowserPickerType={'image'}
            onSelectItem={onSelectItem}
          />
        )}
        <SidebarPortal selected={props.selected}>
          <ImageSidebar {...props} />
        </SidebarPortal>
      </div>
    </>
  );
}

export default withBlockExtensions(Edit);
