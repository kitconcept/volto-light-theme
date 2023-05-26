/**
 * OVERRIDE RenderBlocks.jsx
 * REASON: This version enables auto-grouping of blocks that share the same style property
 * in the StylingWrapper. In the future one could improve it by enabling a way to choose the
 * grouping property, eg. using a property other than `backgroundColor`.
 * FILE: https://github.com/plone/volto/blob/9882c66da42e5440ca1c949d829b78f2b1328683/src/components/theme/View/RenderBlocks.jsx#L25
 * FILE VERSION: Volto 17.0.0-alpha.8
 * DATE: 2023-05-25
 * DEVELOPER: @sneridagh
 */

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
import cx from 'classnames';
import MaybeWrap from '@plone/volto/components/manage/MaybeWrap/MaybeWrap';

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

export function groupByBGColor(blocks, blocks_layout) {
  const result = [];
  let currentArr = [];
  let currentBGColor;

  blocks_layout.items.forEach((blockId) => {
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

const RenderBlocks = (props) => {
  const { content, intl, location, metadata } = props;
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const blocksConfig = props.blocksConfig || config.blocks.blocksConfig;
  const CustomTag = props.as || React.Fragment;

  const grouped = groupByBGColor(
    content[blocksFieldname],
    content[blocksLayoutFieldname],
  );

  return hasBlocksData(content) ? (
    <CustomTag>
      {map(grouped, (group) => (
        <MaybeWrap
          condition={config.settings.enableAutoBlockGroupingByBackgroundColor}
          className={cx(
            'blocks-group-wrapper',
            content[blocksFieldname][group[0]]?.styles?.backgroundColor,
          )}
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
        </MaybeWrap>
      ))}
    </CustomTag>
  ) : (
    ''
  );
};

export default injectIntl(RenderBlocks);
