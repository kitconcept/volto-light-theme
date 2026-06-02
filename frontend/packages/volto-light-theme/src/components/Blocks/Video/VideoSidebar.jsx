import React from 'react';
import { VideoBlockSchema } from '@plone/volto/components/manage/Blocks/Video/schema';
import { Segment } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import videoSVG from '@plone/volto/icons/videocamera.svg';

const messages = defineMessages({
  Video: {
    id: 'Video',
    defaultMessage: 'Video',
  },
  NoVideo: {
    id: 'No Video selected',
    defaultMessage: 'No Video selected',
  },
});

const VideoSidebar = (props) => {
  const {
    blocksConfig,
    blocksErrors,
    data,
    block,
    onChangeBlock,
    navRoot,
    contentType,
  } = props;
  const intl = useIntl();
  const schema = VideoBlockSchema({ ...props, intl });
  const dataAdapter = blocksConfig[data['@type']].dataAdapter;

  return (
    <>
      {!data.url ? (
        <Segment className="sidebar-metadata-container" secondary>
          {intl.formatMessage(messages.NoVideo)}
          <Icon name={videoSVG} size="100px" color="#b8c6c8" />
        </Segment>
      ) : (
        <BlockDataForm
          schema={schema}
          title={intl.formatMessage(messages.Video)}
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
          navRoot={navRoot}
          contentType={contentType}
          errors={blocksErrors}
        />
      )}
    </>
  );
};

export default VideoSidebar;
