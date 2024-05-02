import { Group, Separator, Text } from 'react-aria-components';
import dragSVG from '@plone/volto/icons/drag.svg';
import { Icon } from '@plone/volto/components';
import config from '@plone/volto/registry';
import React, { useState, useCallback } from 'react';
import { getCookieOptions, blockHasValue } from '@plone/volto/helpers';
import { useCookies } from 'react-cookie';
import { defineMessages } from 'react-intl';
import isBoolean from 'lodash/isBoolean';
import {
  BlockToolbar,
  Menu,
  MenuItem,
  BackgroundIcon,
  MoreoptionsIcon,
  SettingsIcon,
  RowbeforeIcon,
  RowafterIcon,
  BinIcon,
  Button,
} from '@plone/components';
import includes from 'lodash/includes';
import BlockToolbarItem from './BlockToolbarItem';

const ExperimentalToolbar = (props) => {
  const { blockProps, draginfo, intl } = props;
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
    onAddBlock,
    data,
    editable,
    properties,
    showBlockChooser,
    navRoot,
    contentType,
    index,
  } = blockProps;

  const defaultToolbar = {
    buttons: {
      drag: [{ name: 'drag', icon: dragSVG, label: 'Drag', isMenuShape: true }],
      styling: [
        {
          name: 'backgroundColor',
          icon: BackgroundIcon,
          label: 'Background Color',
          isMenuShape: true,
          options: config.settings.backgroundColors,
        },
      ],
    },
  };

  const composeToolbar = (...toolbars) => {
    const result = {};

    const merge = (obj, key, value) => {
      if (value !== undefined) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          obj[key] = obj[key] || {};
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            merge(obj[key], nestedKey, nestedValue);
          });
        } else if (Array.isArray(value)) {
          if (obj[key] !== undefined) {
            obj[key] = [...obj[key], ...value];
          } else {
            obj[key] = value;
          }
        }
      }
    };

    toolbars.forEach((setting) => {
      if (setting !== undefined) {
        Object.entries(setting).forEach(([key, value]) => {
          merge(result, key, value);
        });
      }
    });
    return result;
  };

  const toolbar = composeToolbar(defaultToolbar, blocksConfig?.[type]?.toolbar);

  const [cookies, setCookie] = useCookies();

  const [expanded, setExpanded] = useState(cookies.sidebar_expanded);

  const messages = defineMessages({
    delete: {
      id: 'delete',
      defaultMessage: 'delete',
    },
    settings: {
      id: 'settings',
      defaultMessage: 'settings',
    },
  });

  const hideHandler = (data) => {
    return (
      !!data.fixed ||
      (!config.experimental.addBlockButton.enabled &&
        !(blockHasValue(data) && editable))
    );
  };
  const visible = selected && !hideHandler(data);
  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  const resetFullSizeSidebar = useCallback(() => {
    if (!expanded) {
      const currentResizer = document.querySelector('#sidebar');
      const sidebarContainer =
        currentResizer.getElementsByClassName('sidebar-container')[0];
      sidebarContainer.classList.remove('full-size');
      sidebarContainer.classList.remove('no-toolbar');
    }
  }, [expanded]);

  const sidebar = document.querySelector('#sidebar');
  const sidebarContainer =
    sidebar.getElementsByClassName('sidebar-container')[0];

  const body = document.body;

  const onToggleExpanded = () => {
    if (!expanded) {
      sidebarContainer.classList.remove('collapsed');
      body.classList.remove('has-sidebar-collapsed');
      body.classList.add('has-sidebar');
    } else {
      sidebarContainer.classList.add('collapsed');
      body.classList.add('has-sidebar-collapsed');
      body.classList.remove('has-sidebar');
    }
    setCookie('sidebar_expanded', !expanded, getCookieOptions());
    setExpanded(!expanded);
    resetFullSizeSidebar();
  };

  return (
    <BlockToolbar
      aria-label="Text formatting"
      style={{
        visibility: visible ? 'visible' : 'hidden',
      }}
    >
      <div className="toolbar-container">
        {toolbar?.buttons?.drag && (
          <Group aria-label="Drag">
            <div {...draginfo?.dragHandleProps} className="drag-handle-wrapper">
              <Icon name={dragSVG} size="18px" />
            </div>
          </Group>
        )}

        {toolbar?.buttons?.textFormatting && (
          <>
            <Separator orientation="vertical" />
            <Group aria-label="Text Formatting">
              {toolbar?.buttons?.textFormatting.map((button) => {
                return <BlockToolbarItem item={button} />;
              })}
            </Group>
          </>
        )}

        {toolbar?.buttons?.styling && (
          <>
            <Separator orientation="vertical" />
            <Group aria-label="Style">
              {toolbar?.buttons?.styling.map((item) => {
                return <BlockToolbarItem item={item} />;
              })}
            </Group>
          </>
        )}
        {/* TODO: change More Options Group to use BlockToolbarItem component  */}
        <Separator orientation="vertical" />
        <Group aria-label="More Options">
          <Menu button={<MoreoptionsIcon />}>
            <MenuItem className={'button-wrapper'}>
              <Button
                icon
                basic
                onClick={() => onToggleExpanded()}
                className="block-settings-button"
                aria-label={intl.formatMessage(messages.settings)}
              >
                <SettingsIcon />
                <Text slot="label">Settings</Text>
              </Button>
            </MenuItem>
            <MenuItem className={'button-wrapper'}>
              <Button
                icon
                basic
                onClick={() =>
                  onSelectBlock(
                    onAddBlock(config.settings.defaultBlockType, index),
                  )
                }
                className="add-block-button"
                aria-label={intl.formatMessage(messages.delete)}
              >
                <RowbeforeIcon />
                <Text slot="label">Insert block before</Text>
              </Button>
            </MenuItem>
            <MenuItem className={'button-wrapper'}>
              <Button
                icon
                basic
                onClick={() =>
                  onSelectBlock(
                    onAddBlock(config.settings.defaultBlockType, index + 1),
                  )
                }
                className="add-block-button"
                aria-label={intl.formatMessage(messages.delete)}
              >
                <RowafterIcon />
                <Text slot="label">Insert block after</Text>
              </Button>
            </MenuItem>

            {selected && !required && editable && (
              <>
                <Separator />
                <MenuItem className={'button-wrapper'}>
                  <Button
                    icon
                    basic
                    onClick={() => onDeleteBlock(block, true)}
                    className="delete-block-button"
                    aria-label={intl.formatMessage(messages.delete)}
                  >
                    <BinIcon />
                    <Text slot="label">Remove block</Text>
                  </Button>
                </MenuItem>
              </>
            )}
          </Menu>
        </Group>
      </div>
    </BlockToolbar>
  );
};

export default ExperimentalToolbar;
