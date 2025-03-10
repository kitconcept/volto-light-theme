import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
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

interface DndSortableListProps {
  /**
   * An object containing all items, where the key is the item's unique identifier (UID).
   */
  items: { [uid: string]: any };

  /**
   * An array of UIDs representing the sorted order of the items.
   */
  sortedItems: string[];

  /**
   * A function to handle the end of a drag operation.
   * @param {DragEndEvent} event - The drag end event.
   */
  handleDragEnd: (event: DragEndEvent) => void;

  /**
   * The currently active object being dragged.
   */
  activeObject: any;

  /**
   * A function to set the active object.
   * @param {any} object - The object to set as active.
   */
  setActiveObject: (object: any) => void;

  /**
   * A render prop function to render each sortable item.
   * @param {object} params - The parameters for rendering the item.
   * @param {string} params.uid - The unique identifier of the item.
   * @param {any} params.item - The item data.
   * @param {number} params.index - The index of the item in the sorted list.
   * @param {any} params.activeObject - The currently active object being dragged.
   * @param {object} params.attributes - The attributes for the sortable item.
   * @param {object} params.listeners - The listeners for the sortable item.
   * @returns {React.ReactNode} - The rendered sortable item.
   */
  children: (params: {
    uid: string;
    item: any;
    index: number;
    activeObject: any;
    attributes: any;
    listeners: any;
  }) => React.ReactNode;
}

const DndSortableList = (props: DndSortableListProps) => {
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

  function handleDragStart(event: DragStartEvent) {
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
