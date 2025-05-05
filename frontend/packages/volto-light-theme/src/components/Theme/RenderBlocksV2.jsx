import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import {
  applyBlockDefaults,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  findStyleByName,
} from '@plone/volto/helpers/Blocks/Blocks';
import StyleWrapper from '@plone/volto/components/manage/Blocks/Block/StyleWrapper';
import config from '@plone/volto/registry';
import ViewDefaultBlock from '@plone/volto/components/manage/Blocks/Block/DefaultView';
import MaybeWrap from '@plone/volto/components/manage/MaybeWrap/MaybeWrap';
import RenderEmptyBlock from '@plone/volto/components/theme/View/RenderEmptyBlock';
import cx from 'classnames';
import { groupByBGColor } from '../../helpers/grouping';

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
      {grouped.map((group) => {
        const themes =
          config.blocks.blocksConfig[
            content[blocksFieldname][group[0]]['@type']
          ]?.themes ?? config.blocks.themes;

        return (
          <MaybeWrap
            key={`block-group-${group[0]}`}
            condition={
              config.settings.enableAutoBlockGroupingByBackgroundColor &&
              !isContainer
            }
            className={cx(
              'blocks-group-wrapper',
              content[blocksFieldname][group[0]]?.theme || 'default',
            )}
            style={
              findStyleByName(
                themes,
                content[blocksFieldname][group[0]]?.theme,
              ) || findStyleByName(themes, config.blocks.themes[0].name)
            }
          >
            {group.map((block) => {
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
                <div key={block}>
                  {intl.formatMessage(messages.invalidBlock)}
                </div>
              );
            })}
          </MaybeWrap>
        );
      })}
    </CustomTag>
  ) : (
    ''
  );
};

export default RenderBlocks;
