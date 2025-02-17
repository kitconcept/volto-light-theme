import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button } from 'semantic-ui-react';
import { useIntl, FormattedMessage, defineMessages } from 'react-intl';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import Image from '@plone/volto/components/theme/Image/Image';
import { ImageSchema } from '@plone/volto/components/manage/Blocks/Image/schema';
import imageSVG from '@plone/volto/icons/image.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

const ImageSidebar = (props) => {
  const { blocksConfig, data, block, onChangeBlock } = props;
  const intl = useIntl();
  const schema = ImageSchema({ formData: data, intl });
  // START CUSTOMIZATION
  const dataAdapter = blocksConfig[data['@type']].dataAdapter;
  // END CUSTOMIZATION

  return (
    <>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Image" defaultMessage="Image" />
        </h2>
        <Button.Group>
          <Button
            title={intl.formatMessage(messages.clear)}
            basic
            disabled={!data.url}
            onClick={() => {
              // START CUSTOMIZATION
              dataAdapter({
                block,
                data,
                id: 'url',
                onChangeBlock,
                value: null,
              });
              // END CUSTOMIZATION
            }}
          >
            <Icon name={trashSVG} size="24px" color="red" />
          </Button>
        </Button.Group>
      </header>

      <Segment
        className="sidebar-metadata-container image-sidebar"
        secondary
        attached
      >
        {data.url ? (
          <>
            <div>{(data.url?.['@id'] ?? data.url).split('/').slice(-1)[0]}</div>
            <Image
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
                      `${flattenToAppURL(data.url)}/@@images/image/preview`
                    : data.url
              }
              sizes="188px"
              alt={intl.formatMessage(messages.preview)}
              loading="lazy"
              responsive={true}
              style={{ width: '50%' }}
            />
          </>
        ) : (
          <>
            <FormattedMessage
              id="No image selected"
              defaultMessage="No image selected"
            />
            <Icon name={imageSVG} size="100px" color="#b8c6c8" />
          </>
        )}
      </Segment>
      <BlockDataForm
        schema={schema}
        title={schema.title}
        // START CUSTOMIZATION
        onChangeField={(id, value) => {
          dataAdapter({
            block,
            data,
            id,
            onChangeBlock,
            value,
          });
        }}
        // END CUSTOMIZATION
        onChangeBlock={onChangeBlock}
        formData={data}
        block={block}
        blocksConfig={blocksConfig}
      />
    </>
  );
};

ImageSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default ImageSidebar;

const messages = defineMessages({
  preview: {
    id: 'image_block_preview',
    defaultMessage: 'Image preview',
  },
  clear: {
    id: 'image_block_clear',
    defaultMessage: 'Clear image',
  },
});
