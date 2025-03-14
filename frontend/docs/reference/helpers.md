---
myst:
  html_meta:
    "description": "Helper utilities in Volto Light Theme"
    "property=og:description": "Helper utilities in Volto Light Theme"
    "property=og:title": "Helper utilities in Volto Light Theme"
    "keywords": "Plone, Volto Light Theme, helper, utilities"
---

# Helpers

This chapter lists the helper utilities in Volto Light Theme.

## `DndSortableList`

`DndSortableList is the successor of Volto's `DragDropList`, using the `dnd-kit` library.

Given an array of objects as `items`, and a `children` render prop function, you can drag and drop the items to reorder them.

It has the following props.

```ts
interface DndSortableListProps {
  /**
   * An object containing all items, ideally with a `@id` key with the item's
   * unique identifier (UID).
   *
   * If none provided, the item index in the array is used.
   *
   */
  items: Array<Record<string, any>>;

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
```
