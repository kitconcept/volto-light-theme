import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import {
  applyBlockDefaults,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers/Blocks/Blocks';
import StyleWrapper from '@plone/volto/components/manage/Blocks/Block/StyleWrapper';
import config from '@plone/volto/registry';
import ViewDefaultBlock from '@plone/volto/components/manage/Blocks/Block/DefaultView';
import MaybeWrap from '@plone/volto/components/manage/MaybeWrap/MaybeWrap';
import RenderEmptyBlock from '@plone/volto/components/theme/View/RenderEmptyBlock';

import StyleWrapperV3 from './StyleWrapperV3';
import RenderBlocksV2 from './RenderBlocksV2';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
  invalidBlock: {
    id: 'Invalid Block',
    defaultMessage: 'Invalid block - Will be removed on saving',
  },
});

const RenderBlocks = (props) => {
  const { blockWrapperTag, content, location, isContainer, metadata } = props;
  const intl = useIntl();
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const blocksConfig = props.blocksConfig || config.blocks.blocksConfig;
  const CustomTag = props.as || React.Fragment;

  // If the global block model is set to 3, we use the old RenderBlocks component
  if (config.settings.blockModel !== 3) return <RenderBlocksV2 {...props} />;

  return hasBlocksData(content) ? (
    <CustomTag>
      {content[blocksLayoutFieldname].items.map((block) => {
        const currentBlockModel =
          blocksConfig[content[blocksFieldname]?.[block]?.['@type']]
            ?.blockModel;
        const Block =
          blocksConfig[content[blocksFieldname]?.[block]?.['@type']]?.view ||
          ViewDefaultBlock;

        const blockData = applyBlockDefaults({
          data: content[blocksFieldname][block],
          intl,
          metadata,
          properties: content,
        });

        if (content[blocksFieldname]?.[block]?.['@type'] === 'empty') {
          return (
            <MaybeWrap
              key={block}
              condition={blockWrapperTag}
              as={blockWrapperTag}
            >
              <RenderEmptyBlock />
            </MaybeWrap>
          );
        }

        if (Block) {
          return (
            <MaybeWrap
              key={block}
              condition={blockWrapperTag}
              as={blockWrapperTag}
            >
              {currentBlockModel === 3 ? (
                <StyleWrapperV3
                  block={block}
                  content={content}
                  data={blockData}
                  blocksConfig={blocksConfig}
                >
                  <Block
                    id={block}
                    metadata={metadata}
                    properties={content}
                    data={blockData}
                    path={getBaseUrl(location?.pathname || '')}
                    blocksConfig={blocksConfig}
                  />
                </StyleWrapperV3>
              ) : (
                <StyleWrapper
                  key={block}
                  {...props}
                  id={block}
                  block={block}
                  data={blockData}
                  isContainer={isContainer}
                >
                  <Block
                    id={block}
                    metadata={metadata}
                    properties={content}
                    data={blockData}
                    path={getBaseUrl(location?.pathname || '')}
                    blocksConfig={blocksConfig}
                  />
                </StyleWrapper>
              )}
            </MaybeWrap>
          );
        }

        if (blockData) {
          return (
            <div key={block}>
              {intl.formatMessage(messages.unknownBlock, {
                block: content[blocksFieldname]?.[block]?.['@type'],
              })}
            </div>
          );
        }

        return (
          <div key={block}>{intl.formatMessage(messages.invalidBlock)}</div>
        );
      })}
    </CustomTag>
  ) : (
    ''
  );
};

export default RenderBlocks;
