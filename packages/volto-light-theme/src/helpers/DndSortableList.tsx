import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = (props) => {
  const { uid, children, item, index, activeObject } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: uid,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ uid, item, index, activeObject, attributes, listeners })}
    </div>
  );
};

const DndSortableList = (props) => {
  const {
    items,
    sortedItems,
    children,
    handleDragEnd,
    activeObject,
    setActiveObject,
  } = props;
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event) {
    setActiveObject(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sortedItems}
        strategy={verticalListSortingStrategy}
      >
        {sortedItems.map((uid, index) => {
          const item = items[uid];
          return (
            <SortableItem
              key={uid}
              uid={uid}
              index={index}
              item={item}
              activeObject={activeObject}
            >
              {children}
            </SortableItem>
          );
        })}
      </SortableContext>
    </DndContext>
  );
};

export default DndSortableList;
