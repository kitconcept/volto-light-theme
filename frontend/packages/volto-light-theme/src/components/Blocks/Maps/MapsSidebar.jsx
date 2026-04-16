import React from 'react';
import { MapsSchema } from '@plone/volto/components/manage/Blocks/Maps/schema';
import { useIntl, defineMessages } from 'react-intl';
import globeSVG from '@plone/volto/icons/globe.svg';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import { Segment } from 'semantic-ui-react';

const messages = defineMessages({
  Maps: {
    id: 'Maps',
    defaultMessage: 'Maps',
  },
  NoMaps: {
    id: 'No map selected',
    defaultMessage: 'No map selected',
  },
});

const MapsSidebar = (props) => {
  const {
    data,
    block,
    blocksErrors,
    onChangeBlock,
    navRoot,
    contentType,
    blocksConfig,
  } = props;
  const intl = useIntl();
  const schema = MapsSchema({ ...props, intl });
  const dataAdapter = blocksConfig[data['@type']].dataAdapter;

  return (
    <>
      {!data.url ? (
        <Segment className="sidebar-metadata-container" secondary>
          {intl.formatMessage(messages.NoMaps)}
          <Icon name={globeSVG} size="100px" color="#b8c6c8" />
        </Segment>
      ) : (
        <BlockDataForm
          schema={schema}
          title={intl.formatMessage(messages.Maps)}
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

export default MapsSidebar;
