/**
 * OVERRIDE RenderBlocks.jsx
 * REASON: This customization supports Block Model v3, along with the previous implementation.
 * FILE: https://github.com/plone/volto/blob/main/packages/volto/src/components/theme/View/RenderBlocks.jsx
 * FILE VERSION: Volto 17.12.0
 * DATE: 2024-02-08
 * DEVELOPER: @sneridagh
 */
import React from 'react';
import { getBaseUrl, applyBlockDefaults } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';
import { map } from 'lodash';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers';
import StyleWrapper from '@plone/volto/components/manage/Blocks/Block/StyleWrapper';
import config from '@plone/volto/registry';
import { ViewDefaultBlock } from '@plone/volto/components';
import MaybeWrap from '@plone/volto/components/manage/MaybeWrap/MaybeWrap';
import RenderEmptyBlock from '@plone/volto/components/theme/View/RenderEmptyBlock';

import StyleWrapperV3 from './StyleWrapperV3';

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
  const { content, location, metadata, blockWrapperTag } = props;
  const intl = useIntl();
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const blocksConfig = props.blocksConfig || config.blocks.blocksConfig;
  const CustomTag = props.as || React.Fragment;

  return hasBlocksData(content) ? (
    <CustomTag>
      {map(content[blocksLayoutFieldname].items, (block) => {
        const isBlockModelv3 =
          blocksConfig[content[blocksFieldname]?.[block]?.['@type']]?.v3;
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
              {isBlockModelv3 ? (
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
