/**
 * OVERRIDE DragDropList.jsx
 * REASON: This version enables auto-grouping of blocks in the editor that share the same style property
 * in the StylingWrapper. In the future one could improve it by enabling a way to choose the
 * grouping property, eg. using a property other than `backgroundColor`.
 * FILE: https://github.com/plone/volto/blob/a9c4c089c42e5ceb981aaeb4e411096df206b3e2/src/components/manage/DragDropList/DragDropList.jsx#L123
 * FILE VERSION: Volto 17.0.0-alpha.8
 * DATE: 2023-05-29
 * DEVELOPER: @sneridagh
 */
import React, { useRef } from 'react';
import { isEmpty, map } from 'lodash';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { v4 as uuid } from 'uuid';
import cx from 'classnames';
import MaybeWrap from '@plone/volto/components/manage/MaybeWrap/MaybeWrap';
import config from '@plone/volto/registry';

export function groupByBGColor(childList) {
  const result = [];
  let currentArr = [];
  let currentBGColor;

  childList.forEach(([blockId, block]) => {
    if (block?.styles?.backgroundColor) {
      if (block.styles.backgroundColor !== currentBGColor) {
        currentBGColor = block.styles.backgroundColor;
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
    currentArr.push([blockId, block]);
  });
  result.push(currentArr);
  return result;
}

const getPlaceholder = (draggedDOM, sourceIndex, destinationIndex, uid) => {
  // Because of the margin rendering rules, there is no easy
  // way to calculate the offset of the placeholder.
  //
  // (Note that this is the reason we cannot use the solutions
  // published on the net, because they assume that we are in control
  // of the content and there are no additional margins involved.)
  //
  // To get a placeholder that looks good in all cases, we
  // fill up the space between the previous and the next element.
  const queryAttr = 'data-rbd-droppable-id';
  const domQuery = `[${queryAttr}='${uid}']`;
  const parentDOM = document.querySelector(domQuery);

  const childrenArray = [...parentDOM.children];
  // Remove the source element
  childrenArray.splice(sourceIndex, 1);
  // Also remove the placeholder that the library always inserts at the end
  childrenArray.splice(-1, 1);
  const parentRect = parentDOM.getBoundingClientRect();
  const prevNode = childrenArray[destinationIndex - 1];
  const nextNode = childrenArray[destinationIndex];
  let top, bottom;
  if (prevNode) {
    const prevRect = prevNode.getBoundingClientRect();
    top = prevRect.top + prevRect.height - parentRect.top;
  } else {
    top = 0;
  }
  if (nextNode) {
    const nextRect = nextNode.getBoundingClientRect();
    bottom = nextRect.top - parentRect.top;
  } else {
    bottom =
      parentRect.bottom +
      draggedDOM.getBoundingClientRect().height -
      parentRect.top;
  }
  return {
    clientY: top,
    clientHeight: bottom - top,
    clientX: parseFloat(window.getComputedStyle(parentDOM).paddingLeft),
    clientWidth: draggedDOM.clientWidth,
  };
};

const DragDropList = (props) => {
  const {
    childList,
    children,
    onMoveItem,
    as = 'div',
    style,
    forwardedAriaLabelledBy,
    reactBeautifulDnd,
  } = props; //renderChild
  const { DragDropContext, Draggable, Droppable } = reactBeautifulDnd;
  const [placeholderProps, setPlaceholderProps] = React.useState({});
  const [uid] = React.useState(uuid());
  // queueing timed action
  const timer = useRef(null);

  const onDragStart = React.useCallback(
    (event) => {
      clearTimeout(timer.current);
      const queryAttr = 'data-rbd-draggable-id';
      const domQuery = `[${queryAttr}='${event.draggableId}']`;
      const draggedDOM = document.querySelector(domQuery);
      if (!draggedDOM) {
        return;
      }
      const sourceIndex = event.source.index;
      setPlaceholderProps(
        getPlaceholder(draggedDOM, sourceIndex, sourceIndex, uid),
      );
    },
    [uid],
  );

  const onDragEnd = React.useCallback(
    (result) => {
      clearTimeout(timer.current);
      onMoveItem(result);
      setPlaceholderProps({});
    },
    [onMoveItem],
  );

  const onDragUpdate = React.useCallback(
    (update) => {
      clearTimeout(timer.current);
      setPlaceholderProps({});
      if (!update.destination) {
        return;
      }
      const draggableId = update.draggableId;
      const queryAttr = 'data-rbd-draggable-id';
      const domQuery = `[${queryAttr}='${draggableId}']`;
      const draggedDOM = document.querySelector(domQuery);
      if (!draggedDOM) {
        return;
      }
      const sourceIndex = update.source.index;
      const destinationIndex = update.destination.index;
      // Wait until the animations have finished, to make it look good.
      timer.current = setTimeout(
        () =>
          setPlaceholderProps(
            getPlaceholder(draggedDOM, sourceIndex, destinationIndex, uid),
          ),
        250,
      );
    },
    [uid],
  );

  const AsDomComponent = as;

  const grouped = groupByBGColor(childList);
  console.log(grouped);
  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable
        droppableId={uid}
        renderClone={(provided, snapshot, rubric) => {
          const index = rubric.source.index;
          return children({
            child: childList[index][1],
            childId: childList[index][0],
            index,
            draginfo: provided,
          });
        }}
      >
        {(provided, snapshot) => (
          <AsDomComponent
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ ...style, position: 'relative' }}
            aria-labelledby={forwardedAriaLabelledBy}
          >
            {map(grouped, (group, index) => (
              <MaybeWrap
                key={`block-group-${index}`}
                condition={
                  config.settings.enableAutoBlockGroupingByBackgroundColor
                }
                className={cx(
                  'blocks-group-wrapper',
                  group[0][1]?.styles?.backgroundColor,
                )}
              >
                {group
                  .filter(([id, child]) => id && child) // beware numbers!
                  .map(([childId, child], index) => (
                    <Draggable
                      draggableId={childId.toString()}
                      index={index}
                      key={childId}
                      style={{
                        userSelect: 'none',
                      }}
                    >
                      {(draginfo) =>
                        children({ child, childId, index, draginfo })
                      }
                    </Draggable>
                  ))}
                {provided.placeholder}
                {!isEmpty(placeholderProps) && snapshot.isDraggingOver && (
                  <div
                    style={{
                      position: 'absolute',
                      top: placeholderProps.clientY,
                      left: placeholderProps.clientX,
                      height: placeholderProps.clientHeight,
                      background: '#eee',
                      width: placeholderProps.clientWidth,
                      borderRadius: '3px',
                    }}
                  />
                )}
              </MaybeWrap>
            ))}
          </AsDomComponent>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default injectLazyLibs(['reactBeautifulDnd'])(DragDropList);
