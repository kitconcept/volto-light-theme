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
} from '@plone/volto/helpers';
import { injectIntl } from 'react-intl';
import cx from 'classnames';
import config from '@plone/volto/registry';
import ExperimentalToolbar from '../../../../../../components/BlockToolbar/ExperimentalBlockToolBar';

const EditBlockWrapper = (props) => {
  const hideHandler = (data) => {
    return (
      !!data.fixed ||
      (!config.experimental.addBlockButton.enabled &&
        !(blockHasValue(data) && props.blockProps.editable))
    );
  };

  const { blockProps, draginfo, children } = props;
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

  const visible = selected && !hideHandler(blockProps.data);

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
      onClick={() => {
        onSelectBlock(block);
      }}
      aria-hidden="true"
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
      <ExperimentalToolbar aria-label="Toolbar" {...props} visible={visible} />

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
