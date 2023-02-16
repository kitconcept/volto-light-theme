// PoC for the grouping of blocks that have the same BG color
//
//
import React from 'react';
import { getBaseUrl, applyBlockDefaults } from '@plone/volto/helpers';
import { defineMessages, injectIntl } from 'react-intl';
import { map } from 'lodash';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers';
import StyleWrapper from '@plone/volto/components/manage/Blocks/Block/StyleWrapper';
import config from '@plone/volto/registry';
import { ViewDefaultBlock } from '@plone/volto/components';

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
  const { content, intl, location, metadata } = props;
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const blocksConfig = props.blocksConfig || config.blocks.blocksConfig;
  const CustomTag = props.as || React.Fragment;

  function groupByBGColor(blocks, blocks_layout) {
    const result = [];
    let currentArr = [];
    let currentBGColor;

    blocks_layout.forEach((blockId) => {
      if (blocks[blockId]?.styles?.backgroundColor) {
        if (blocks[blockId].styles.backgroundColor !== currentBGColor) {
          currentBGColor = blocks[blockId].styles.backgroundColor;
          if (currentArr.length > 0) {
            result.push(currentArr);
            currentArr = [];
          }
        }
      } else {
        if (currentBGColor) {
          currentBGColor = '';
          result.push(currentArr);
          currentArr = [];
        }
      }
      currentArr.push(blockId);
    });
    result.push(currentArr);
    return result;
  }
  const grouped = groupByBGColor(
    content[blocksFieldname],
    content[blocksLayoutFieldname].items,
  );
  console.log(grouped);

  return hasBlocksData(content) ? (
    <CustomTag>
      {map(grouped, (group) => (
        <div
          className={
            content[blocksFieldname][group[0]]?.styles?.backgroundColor
          }
        >
          {map(group, (block) => {
            const Block =
              blocksConfig[content[blocksFieldname]?.[block]?.['@type']]
                ?.view || ViewDefaultBlock;

            const blockData = applyBlockDefaults({
              data: content[blocksFieldname][block],
              intl,
              metadata,
              properties: content,
            });

            return Block ? (
              <StyleWrapper key={block} {...props} id={block} data={blockData}>
                <Block
                  id={block}
                  metadata={metadata}
                  properties={content}
                  data={blockData}
                  path={getBaseUrl(location?.pathname || '')}
                  blocksConfig={blocksConfig}
                />
              </StyleWrapper>
            ) : blockData ? (
              <div key={block}>
                {intl.formatMessage(messages.unknownBlock, {
                  block: content[blocksFieldname]?.[block]?.['@type'],
                })}
              </div>
            ) : (
              <div key={block}>{intl.formatMessage(messages.invalidBlock)}</div>
            );
          })}
        </div>
      ))}
    </CustomTag>
  ) : (
    ''
  );
};

export default injectIntl(RenderBlocks);
