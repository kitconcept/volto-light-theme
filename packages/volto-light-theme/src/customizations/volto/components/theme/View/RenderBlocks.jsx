/**
 * OVERRIDE RenderBlocks.jsx
 * REASON: This version enables auto-grouping of blocks that share the same style property
 * in the StylingWrapper. In the future one could improve it by enabling a way to choose the
 * grouping property, eg. using a property other than `backgroundColor`.
 * FILE: https://github.com/plone/volto/blob/9882c66da42e5440ca1c949d829b78f2b1328683/src/components/theme/View/RenderBlocks.jsx#L25
 * FILE VERSION: Volto 17.0.0-alpha.16
 * DATE: 2023-06-28
 * DEVELOPER: @sneridagh
 */

import React from 'react';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import {
  applyBlockDefaults,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers/Blocks/Blocks';
import { defineMessages, useIntl } from 'react-intl';
import { map } from 'lodash';

import StyleWrapper from '@plone/volto/components/manage/Blocks/Block/StyleWrapper';
import config from '@plone/volto/registry';
import ViewDefaultBlock from '@plone/volto/components/manage/Blocks/Block/DefaultView';
import cx from 'classnames';
import MaybeWrap from '@plone/volto/components/manage/MaybeWrap/MaybeWrap';
import RenderEmptyBlock from '@plone/volto/components/theme/View/RenderEmptyBlock';

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
    let currentBlockColor =
      blocks[blockId]?.styles?.backgroundColor ?? 'transparent';

    if (currentBlockColor !== currentBGColor) {
      currentBGColor = currentBlockColor;
      // write it only if the array has some block inside
      if (currentArr.length > 0) {
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
  const { blockWrapperTag, content, isContainer, location, metadata } = props;
  const intl = useIntl();
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
          key={`block-group-${group[0]}`}
          condition={
            config.settings.enableAutoBlockGroupingByBackgroundColor &&
            !isContainer
          }
          className={cx(
            'blocks-group-wrapper',
            content[blocksFieldname][group[0]]?.styles?.backgroundColor ??
              'transparent',
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
        </MaybeWrap>
      ))}
    </CustomTag>
  ) : (
    ''
  );
};

export default RenderBlocks;
