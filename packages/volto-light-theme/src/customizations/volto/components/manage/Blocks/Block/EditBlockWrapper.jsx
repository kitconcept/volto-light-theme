/**
 * OVERRIDE: EditBlockWrapper.jsx
 * REASON: Removing duplicated className in wrapper only in v3 blocks & add category className to block-editor-{type}
 * FILE: https://github.com/kitconcept/volto-slider-block/blob/master/src/components/DefaultBody.jsx
 * DATE: 2024-02-01
 * DEVELOPER: @sneridagh
 */
import React from 'react';
import { Icon } from '@plone/volto/components';
import {
  blockHasValue,
  buildStyleClassNamesFromData,
  buildStyleObjectFromData,
  buildStyleClassNamesExtenders,
} from '@plone/volto/helpers';
import dragSVG from '@plone/volto/icons/drag.svg';
import { Button } from 'semantic-ui-react';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import config from '@plone/volto/registry';
import {
  BlockToolbar,
  Menu,
  MenuItem,
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  MoreoptionsIcon,
  SettingsIcon,
  RowbeforeIcon,
  RowafterIcon,
  BinIcon,
} from '@plone/components';
import { Group, Separator, Text, ToggleButton } from 'react-aria-components';

const messages = defineMessages({
  delete: {
    id: 'delete',
    defaultMessage: 'delete',
  },
});

const EditBlockWrapper = (props) => {
  const hideHandler = (data) => {
    return (
      !!data.fixed ||
      (!config.experimental.addBlockButton.enabled &&
        !(blockHasValue(data) && props.blockProps.editable))
    );
  };

  const { intl, blockProps, draginfo, children } = props;
  const {
    allowedBlocks,
    block,
    blocksConfig,
    selected,
    type,
    onChangeBlock,
    onDeleteBlock,
    onInsertBlock,
    onSelectBlock,
    onMutateBlock,
    data,
    editable,
    properties,
    showBlockChooser,
    navRoot,
    contentType,
    index,
  } = blockProps;

  const visible = selected && !hideHandler(data);

  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  let classNames = buildStyleClassNamesFromData(data.styles);
  classNames = buildStyleClassNamesExtenders({
    block,
    content: properties,
    data,
    classNames,
  });
  const style = buildStyleObjectFromData(data.styles);
  // We need to merge the StyleWrapper styles with the draggable props from b-D&D
  const styleMergedWithDragProps = {
    ...draginfo.draggableProps,
    style: { ...style, ...draginfo.draggableProps.style },
  };

  // START CUSTOMIZATION
  const isBlockModelv3 = blocksConfig?.[type]?.blockModel === 3;
  const category = blocksConfig?.[type]?.category;
  // END CUSTOMIZATION

  return (
    <div
      ref={draginfo.innerRef}
      {...styleMergedWithDragProps}
      // Right now, we can have the alignment information in the styles property or in the
      // block data root, we inject the classname here for having control over the whole
      // Block Edit wrapper
      className={cx(
        `block ${data['@type']}`,
        //START CUSTOMIZATION
        { [`category-${category}`]: category, selected: selected },
        // END CUSTOMIZATION
        classNames,
        {
          [data.align]: data.align,
        },
      )}
    >
      <BlockToolbar
        aria-label="Text formatting"
        style={{
          visibility: visible ? 'visible' : 'hidden',
        }}
      >
        <div className="toolbar-container">
          <Group aria-label="Style">
            <div {...draginfo.dragHandleProps} className="drag-handle-wrapper">
              <Icon name={dragSVG} size="18px" />
            </div>
          </Group>

          <Group aria-label="Style">
            <ToggleButton aria-label="Bold">
              <BoldIcon />
            </ToggleButton>
            <ToggleButton aria-label="Italic">
              <ItalicIcon />
            </ToggleButton>
            <ToggleButton aria-label="Underline">
              <LinkIcon />
            </ToggleButton>
          </Group>
          <Separator orientation="vertical" />
          <Menu button={<MoreoptionsIcon />}>
            <MenuItem>
              <SettingsIcon />
              <Text slot="label">Settings</Text>
            </MenuItem>
            <MenuItem>
              <Button
                icon
                basic
                onClick={() =>
                  props.blockProps.onSelectBlock(
                    props.blockProps.onAddBlock(
                      config.settings.defaultBlockType,
                      index,
                    ),
                  )
                }
                className="add-block-button"
                aria-label={intl.formatMessage(messages.delete)}
                style={{ all: 'unset' }}
              >
                <RowbeforeIcon />
                <Text slot="label">Insert block before</Text>
              </Button>
            </MenuItem>
            <MenuItem>
              <Button
                icon
                basic
                onClick={() =>
                  props.blockProps.onSelectBlock(
                    props.blockProps.onAddBlock(
                      config.settings.defaultBlockType,
                      index + 1,
                    ),
                  )
                }
                className="add-block-button"
                aria-label={intl.formatMessage(messages.delete)}
                style={{ all: 'unset' }}
              >
                <RowafterIcon />
                <Text slot="label">Insert block after</Text>
              </Button>
            </MenuItem>

            {selected && !required && editable && (
              <>
                <Separator />
                <MenuItem>
                  <Button
                    icon
                    basic
                    onClick={() => onDeleteBlock(block, true)}
                    className="delete-block-button"
                    aria-label={intl.formatMessage(messages.delete)}
                    style={{ all: 'unset' }}
                  >
                    <BinIcon />
                    <Text slot="label">Remove block</Text>
                  </Button>
                </MenuItem>
              </>
            )}
          </Menu>
        </div>
      </BlockToolbar>
      <div style={{ position: 'relative' }}>
        {/* START CUSTOMIZATION */}
        <div className={cx('ui drag inner', { [type]: !isBlockModelv3 })}>
          {/* END CUSTOMIZATION */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(EditBlockWrapper);
