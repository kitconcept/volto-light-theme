/**
 * Edit block.
 * @module components/manage/Blocks/Block/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import { setSidebarTab } from '@plone/volto/actions/sidebar/sidebar';
import { setUIState } from '@plone/volto/actions/form/form';
import config from '@plone/volto/registry';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import ViewDefaultBlock from '@plone/volto/components/manage/Blocks/Block/DefaultView';
import EditDefaultBlock from '@plone/volto/components/manage/Blocks/Block/DefaultEdit';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import BlockSettingsSidebar from '@plone/volto/components/manage/Blocks/Block/Settings';
import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';
import BlockChooserButton from '@plone/volto/components/manage/BlockChooser/BlockChooserButton';
import isBoolean from 'lodash/isBoolean';
import includes from 'lodash/includes';
import downSVG from '@plone/volto/icons/down-key.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import { Button } from '@plone/components';
import trashSVG from '@plone/volto/icons/delete.svg';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { endsWith, find, keys } from 'lodash';
import move from 'lodash-move';
import {
  blockHasValue,
  buildStyleClassNamesFromData,
  buildStyleObjectFromData,
  buildStyleClassNamesExtenders,
} from '@plone/volto/helpers/Blocks/Blocks';
import MaybeWrap from '@plone/volto/components/manage/MaybeWrap/MaybeWrap';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
  delete: {
    id: 'delete',
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

/**
 * Edit block class.
 * @class Edit
 * @extends Component
 */
export class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    // properties is mapped to formData, so it's not connected to changes of the object
    properties: PropTypes.objectOf(PropTypes.any).isRequired,
    selected: PropTypes.bool.isRequired,
    multiSelected: PropTypes.bool,
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    manage: PropTypes.bool,
    onMoveBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    editable: PropTypes.bool,
    pathname: PropTypes.string.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    manage: false,
    editable: true,
  };

  componentDidMount() {
    const { type } = this.props;
    const { blocksConfig = config.blocks.blocksConfig } = this.props;

    const blockHasOwnFocusManagement =
      blocksConfig?.[type]?.['blockHasOwnFocusManagement'] || null;
    if (
      !blockHasOwnFocusManagement &&
      this.props.selected &&
      this.blockNode.current
    ) {
      this.blockNode.current.focus();
    }
    const tab = this.props.manage ? 1 : blocksConfig?.[type]?.sidebarTab || 0;
    if (
      this.props.selected &&
      this.props.editable &&
      this.props.sidebarTab !== 2
    ) {
      this.props.setSidebarTab(tab);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { blocksConfig = config.blocks.blocksConfig } = this.props;
    const { selected, type } = this.props;
    const blockHasOwnFocusManagement =
      blocksConfig?.[type]?.['blockHasOwnFocusManagement'] || null;
    if (
      !blockHasOwnFocusManagement &&
      nextProps.selected &&
      selected !== nextProps.selected &&
      this.blockNode.current
    ) {
      this.blockNode.current.focus();
    }
    if (
      ((!this.props.selected && nextProps.selected) ||
        type !== nextProps.type) &&
      this.props.editable
    ) {
      const tab = this.props.manage
        ? 1
        : blocksConfig?.[nextProps.type]?.sidebarTab || 0;
      if (this.props.sidebarTab !== 2) {
        this.props.setSidebarTab(tab);
      }
    }
  }

  blockNode = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { blocksConfig = config.blocks.blocksConfig } = this.props;
    const { editable, type } = this.props;
    const required = isBoolean(this.props.data.required)
      ? this.props.data.required
      : includes(config.blocks.requiredBlocks, type);

    const disableNewBlocks = this.props.data?.disableNewBlocks;

    let Block = blocksConfig?.[type]?.['edit'] || EditDefaultBlock;
    if (
      this.props.data?.readOnly ||
      (!editable && !config.blocks.showEditBlocksInBabelView)
    ) {
      Block = blocksConfig?.[type]?.['view'] || ViewDefaultBlock;
    }
    const schema = blocksConfig?.[type]?.['schema'] || BlockSettingsSchema;
    const blockHasOwnFocusManagement =
      blocksConfig?.[type]?.['blockHasOwnFocusManagement'] || null;
    const getBlocksLayoutFieldname = (props) => {
      return (
        find(
          keys(props),
          (key) => key !== 'volto.blocks' && endsWith(key, 'blocks_layout'),
        ) || null
      );
    };
    const blocksLayoutFieldname = getBlocksLayoutFieldname(
      this.props.properties,
    );

    const blocks_layout = this.props.properties[blocksLayoutFieldname];

    const moveBlock = (formData, source, destination) => {
      const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
      return {
        ...formData,
        [blocksLayoutFieldname]: {
          items: move(
            formData[blocksLayoutFieldname].items,
            source,
            destination,
          ),
        },
      };
    };

    let classNames = buildStyleClassNamesFromData(this.props.data.styles);

    classNames =
      blocksConfig?.[type]?.blockModel === 3
        ? buildStyleClassNamesExtenders({
            block: this.props.block,
            content: this.props.content,
            data: this.props.data,
            classNames,
          })
        : '';

    const styles =
      blocksConfig?.[type]?.blockModel === 3
        ? {
            style: { ...buildStyleObjectFromData(this.props.data) },
          }
        : { style: { outline: 'none' } };

    const category = blocksConfig?.[type]?.category;

    return (
      <>
        {Block !== null ? (
          <div
            {...styles}
            role="presentation"
            onMouseEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (this.props.hovered !== this.props.id) {
                this.props.setUIState({ hovered: this.props.id });
              }
            }}
            onFocus={(e) => {
              // TODO: This `onFocus` steals somehow the focus from the slate block
              // we have to investigate why this is happening
              // Apparently, I can't see any difference in the behavior
              // If any, we can fix it in successive iterations
              // if (this.props.hovered !== this.props.id) {
              //   this.props.setUIState({ hovered: this.props.id });
              // }
            }}
            onMouseLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.props.setUIState({ hovered: null });
            }}
            onClick={(e) => {
              const isMultipleSelection = e.shiftKey || e.ctrlKey || e.metaKey;
              !this.props.selected &&
                this.props.onSelectBlock(
                  this.props.id,
                  this.props.selected ? false : isMultipleSelection,
                  e,
                );
            }}
            onKeyDown={
              !(blockHasOwnFocusManagement || disableNewBlocks)
                ? (e) =>
                    this.props.handleKeyDown(
                      e,
                      this.props.index,
                      this.props.id,
                      this.blockNode.current,
                    )
                : null
            }
            // START CUSTOMIZATION
            className={cx(
              this.props.data.variation,
              classNames,
              `block ${type}`,
              {
                [`category-${category}`]:
                  blocksConfig?.[type]?.blockModel === 3,
                selected: this.props.selected || this.props.multiSelected,
                multiSelected: this.props.multiSelected,
                hovered: this.props.hovered === this.props.id,
              },
            )}
            ref={this.blockNode}
            // The tabIndex is required for the keyboard navigation
            /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
            tabIndex={!blockHasOwnFocusManagement ? -1 : null}
          >
            <MaybeWrap
              condition={blocksConfig?.[type]?.blockModel === 3}
              as={'div'}
              className="block-inner-container"
            >
              <Block
                {...this.props}
                blockNode={this.blockNode}
                data={this.props.data}
              />
            </MaybeWrap>

            {blocksConfig?.[type]?.blockModel === 3 && (
              <div className="block-edit-helpers">
                <div className="block-controls">
                  {this.props.selected && !required && editable && (
                    <Button
                      icon
                      basic
                      onClick={() =>
                        this.props.onDeleteBlock(this.props.block, true)
                      }
                      className="delete-button"
                      aria-label={this.props.intl.formatMessage(
                        messages.delete,
                      )}
                    >
                      <Icon name={trashSVG} size="18px" />
                    </Button>
                  )}
                  {this.props.index > 0 && this.props.selected && (
                    <Button
                      icon
                      basic
                      onClick={() =>
                        this.props.onChangeFormData(
                          moveBlock(
                            this.props.properties,
                            this.props.index,
                            this.props.index - 1,
                          ),
                        )
                      }
                      className="move-up-button"
                      aria-label={this.props.intl.formatMessage(
                        messages.moveUp,
                      )}
                    >
                      <Icon name={upSVG} size="18px" />
                    </Button>
                  )}
                  {this.props.index < blocks_layout.items.length - 1 &&
                    this.props.selected && (
                      <Button
                        icon
                        basic
                        onClick={() =>
                          this.props.onChangeFormData(
                            moveBlock(
                              this.props.properties,
                              this.props.index,
                              this.props.index + 1,
                            ),
                          )
                        }
                        className="move-down-button"
                        aria-label={this.props.intl.formatMessage(
                          messages.moveDown,
                        )}
                      >
                        <Icon name={downSVG} size="18px" />
                      </Button>
                    )}
                </div>
                <div className="border-top border-line"></div>
                <div className="border-bottom border-line"></div>
                <div className="border-left border-line"></div>
                <div className="border-right border-line"></div>

                {config.experimental.addBlockButton.enabled &&
                  this.props.showBlockChooser && (
                    <BlockChooserButton
                      data={this.props.data}
                      block={this.props.block}
                      onInsertBlock={(id, value) => {
                        if (blockHasValue(this.props.data)) {
                          this.props.onSelectBlock(
                            this.props.onInsertBlock(id, value),
                          );
                        } else {
                          this.props.onChangeBlock(id, value);
                        }
                      }}
                      onMutateBlock={this.props.onMutateBlock}
                      allowedBlocks={this.props.allowedBlocks}
                      blocksConfig={blocksConfig}
                      size="24px"
                      properties={this.props.properties}
                      navRoot={this.props.navRoot}
                      contentType={this.props.contentType}
                    />
                  )}
              </div>
            )}
            {/* END CUSTOMIZATION */}
            {this.props.manage && (
              <SidebarPortal
                selected={this.props.selected}
                tab="sidebar-settings"
              >
                <BlockSettingsSidebar {...this.props} schema={schema} />
              </SidebarPortal>
            )}
          </div>
        ) : (
          <div
            role="presentation"
            onMouseEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.props.setUIState({ hovered: this.props.id });
            }}
            onFocus={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.props.setUIState({ hovered: this.props.id });
            }}
            onMouseLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.props.setUIState({ hovered: null });
            }}
            onClick={() =>
              !this.props.selected && this.props.onSelectBlock(this.props.id)
            }
            onKeyDown={
              !(blockHasOwnFocusManagement || disableNewBlocks)
                ? (e) =>
                    this.props.handleKeyDown(
                      e,
                      this.props.index,
                      this.props.id,
                      this.blockNode.current,
                    )
                : null
            }
            // START CUSTOMIZATION
            className={cx(type, 'block', {
              selected: this.props.selected || this.props.multiSelected,
              multiSelected: this.props.multiSelected,
              hovered: this.props.hovered === this.props.id,
            })}
            // END CUSTOMIZATION
            style={{ outline: 'none' }}
            ref={this.blockNode}
            // The tabIndex is required for the keyboard navigation
            tabIndex={-1}
          >
            {this.props.intl.formatMessage(messages.unknownBlock, {
              block: type,
            })}
          </div>
        )}
      </>
    );
  }
}

export default compose(
  injectIntl,
  withObjectBrowser,
  connect(
    (state, props) => ({
      hovered: state.form?.ui.hovered || null,
      sidebarTab: state.sidebar?.tab,
    }),
    { setSidebarTab, setUIState },
  ),
)(Edit);
