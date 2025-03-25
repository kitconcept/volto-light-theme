/**
 * OVERRIDE: EditBlockWrapper.jsx
 * REASON: Removing duplicated className in wrapper only in v3 blocks & add category className to block-editor-{type}
 * FILE: https://github.com/kitconcept/volto-slider-block/blob/master/src/components/DefaultBody.jsx
 * DATE: 2024-02-01
 * DEVELOPER: @sneridagh
 */
import React from 'react';
import {
  blockHasValue,
  buildStyleClassNamesFromData,
  buildStyleObjectFromData,
  buildStyleClassNamesExtenders,
} from '@plone/volto/helpers/Blocks/Blocks';
import { injectIntl, defineMessages } from 'react-intl';
import cx from 'classnames';
import config from '@plone/volto/registry';
import { default as BlockChooserButton } from '@plone/volto/components/manage/BlockChooser/BlockChooserButton';
import { Button } from 'semantic-ui-react';

import trashSVG from '@plone/volto/icons/delete.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import { endsWith, find, keys } from 'lodash';
import move from 'lodash-move';
import { useRef } from 'react';

const EditBlockWrapper = (props) => {
  const messages = defineMessages({
    delete: {
      id: 'Delete',
      defaultMessage: 'Delete',
    },
    moveUp: {
      id: 'Move up',
      defaultMessage: 'Move up',
    },
    moveDown: {
      id: 'Move down',
      defaultMessage: 'Move down',
    },
  });

  const { blockProps, draginfo, children, intl } = props;
  const {
    allowedBlocks,
    block,
    blocksConfig,
    selected,
    multiSelected,
    type,
    onChangeBlock,
    onDeleteBlock,
    onInsertBlock,
    onSelectBlock,
    onMutateBlock,
    handleKeyDown,
    data,
    editable,
    properties,
    showBlockChooser,
    navRoot,
    contentType,
    index,
    onChangeFormData,
    id,
    content,
    isContainer,
  } = blockProps;

  let blockNode = useRef({});

  const blockHasOwnFocusManagement =
    blocksConfig?.[type]?.['blockHasOwnFocusManagement'] || null;
  if (!blockHasOwnFocusManagement && selected && blockNode.current) {
  }

  let classNames,
    style = [];

  // We need to merge the StyleWrapper styles with the draggable props from b-D&D
  const styleMergedWithDragProps = {
    ...draginfo.draggableProps,
    style: { ...style, ...draginfo.draggableProps.style },
  };

  // START CUSTOMIZATION
  const category = blocksConfig?.[type]?.category;
  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  const getBlocksLayoutFieldname = (props) => {
    return (
      find(
        keys(props),
        (key) => key !== 'volto.blocks' && endsWith(key, 'blocks_layout'),
      ) || null
    );
  };

  const moveBlock = (formData, source, destination) => {
    const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
    return {
      ...formData,
      [blocksLayoutFieldname]: {
        items: move(formData[blocksLayoutFieldname].items, source, destination),
      },
    };
  };
  const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);

  const blocks_layout = properties[blocksLayoutFieldname];

  classNames = buildStyleClassNamesFromData(data.styles);

  classNames = buildStyleClassNamesExtenders({
    block,
    content,
    data,
    classNames,
  });

  style = buildStyleObjectFromData(
    data,
    '',
    // If we are rendering blocks inside a container, then pass also the data from the container
    // This is needed in order to calculate properly the styles for the blocks inside the container
    isContainer && content.blocks ? content : {},
  );

  // END CUSTOMIZATION

  return (
    <div
      onClick={(e) => {
        const isMultipleSelection = e.shiftKey || e.ctrlKey || e.metaKey;
        !selected &&
          onSelectBlock(id, selected ? false : isMultipleSelection, e);
      }}
      onKeyDown={
        !blockHasOwnFocusManagement
          ? (e) => handleKeyDown(e, index, id, blockNode.current)
          : null
      }
      aria-hidden="true"
      ref={draginfo.innerRef}
      {...styleMergedWithDragProps}
      // Right now, we can have the alignment information in the styles property or in the
      // block data root, we inject the classname here for having control over the whole
      // Block Edit wrapper
      className={cx(
        `block ${data['@type']}`,
        {
          [`category-${category}`]: category,
          selected: selected,
          multiSelected: multiSelected,
        },
        classNames,
      )}
      style={style}
    >
      <div className="block-edit-helpers">
        <div className="block-controls">
          {selected && !required && editable && (
            <Button
              icon
              basic
              onClick={() => onDeleteBlock(block, true)}
              className="delete-button"
              aria-label={intl.formatMessage(messages.delete)}
            >
              <Icon name={trashSVG} size="18px" />
            </Button>
          )}
          {index > 0 && selected && (
            <Button
              icon
              basic
              onClick={() =>
                onChangeFormData(moveBlock(properties, index, index - 1))
              }
              className="move-up-button"
              aria-label={intl.formatMessage(messages.moveUp)}
            >
              <Icon name={upSVG} size="18px" />
            </Button>
          )}
          {index < blocks_layout.items.length - 1 && selected && (
            <Button
              icon
              basic
              onClick={() =>
                onChangeFormData(moveBlock(properties, index, index + 1))
              }
              className="move-down-button"
              aria-label={intl.formatMessage(messages.moveDown)}
            >
              <Icon name={downSVG} size="18px" />
            </Button>
          )}
        </div>
        <div className="border-top border-line"></div>
        <div className="border-bottom border-line"></div>
        <div className="border-left border-line"></div>
        <div className="border-right border-line"></div>

        {config.experimental.addBlockButton.enabled && showBlockChooser && (
          <BlockChooserButton
            data={data}
            block={block}
            onInsertBlock={(id, value) => {
              if (blockHasValue(data)) {
                onSelectBlock(onInsertBlock(id, value));
              } else {
                onChangeBlock(id, value);
              }
            }}
            onMutateBlock={onMutateBlock}
            allowedBlocks={allowedBlocks}
            blocksConfig={blocksConfig}
            size="24px"
            properties={properties}
            navRoot={navRoot}
            contentType={contentType}
          />
        )}
      </div>
      {children}
    </div>
  );
};

export default injectIntl(EditBlockWrapper);
