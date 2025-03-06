import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = (props) => {
  const { uid, children, item, index } = props;
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
      {children({ uid, item, index, attributes, listeners })}
    </div>
  );
};

const DndSortableList = (props) => {
  const { items, sortedItems, setItems, children, handleDragEnd } = props;
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sortedItems}
        strategy={verticalListSortingStrategy}
      >
        {sortedItems.map((uid, index) => {
          const item = items[uid];
          return (
            <SortableItem key={uid} uid={uid} index={index} item={item}>
              {children}
            </SortableItem>
          );
        })}
      </SortableContext>
    </DndContext>
  );
};

export default DndSortableList;
