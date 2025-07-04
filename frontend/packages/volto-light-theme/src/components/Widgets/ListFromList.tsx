import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { defineMessages, useIntl } from 'react-intl';

import { useListData, type ListData } from 'react-stately';
import {
  isTextDropItem,
  useDragAndDrop,
  ListBox,
  ListBoxItem,
} from 'react-aria-components';
import { useEffect } from 'react';
// import { isEqual } from 'lodash';
// import { v4 as uuidv4 } from 'uuid';

interface FileItem {
  id: string;
  name: string;
}

const messages = defineMessages({
  optionsLabel: {
    id: 'Available options for field ',
    defaultMessage: 'Available options for field ',
  },
  valueLabel: {
    id: 'Values for field ',
    defaultMessage: 'Values for field ',
  },
});

interface DndListBoxProps {
  title: string;
  'aria-label': string;
  list: ListData<FileItem>;
}

function DndListBox(props: DndListBoxProps) {
  const { list } = props;

  let { dragAndDropHooks } = useDragAndDrop({
    // Provide drag data in a custom format as well as plain text.
    getItems(keys) {
      return [...keys].map((key) => {
        let item = list.getItem(key);
        return {
          'custom-app-type': JSON.stringify(item),
          'text/plain': item.name,
        };
      });
    },

    // Accept drops with the custom format.
    acceptedDragTypes: ['custom-app-type'],

    // Ensure items are always moved rather than copied.
    getDropOperation: () => 'move',

    // Handle drops between items from other lists.
    async onInsert(e) {
      let processedItems = await Promise.all(
        e.items
          .filter(isTextDropItem)
          .map(async (item) =>
            JSON.parse(await item.getText('custom-app-type')),
          ),
      );
      if (e.target.dropPosition === 'before') {
        list.insertBefore(e.target.key, ...processedItems);
      } else if (e.target.dropPosition === 'after') {
        list.insertAfter(e.target.key, ...processedItems);
      }
    },

    // Handle drops on the collection when empty.
    async onRootDrop(e) {
      let processedItems = await Promise.all(
        e.items
          .filter(isTextDropItem)
          .map(async (item) =>
            JSON.parse(await item.getText('custom-app-type')),
          ),
      );
      list.append(...processedItems);
    },

    // Handle reordering items within the same list.
    onReorder(e) {
      if (e.target.dropPosition === 'before') {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === 'after') {
        list.moveAfter(e.target.key, e.keys);
      }
    },

    // Remove the items from the source list on drop
    // if they were moved to a different list.
    onDragEnd(e) {
      if (e.dropOperation === 'move' && !e.isInternal) {
        list.remove(...e.keys);
      }
    },
  });

  return (
    <ListBox
      aria-label={props['aria-label'] || props.title}
      selectionMode="multiple"
      selectedKeys={list.selectedKeys}
      onSelectionChange={list.setSelectedKeys}
      items={list.items}
      dragAndDropHooks={dragAndDropHooks}
      renderEmptyState={() => 'Drop items here'}
    >
      {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
    </ListBox>
  );
}

type ListFromListProps = {
  id: string;
  title?: string;
  optionsTitle?: string;
  valuesTitle?: string;
  value?: FileItem[];
  options: FileItem[];
  required?: boolean;
  default?: FileItem[];
  'aria-label': string;
  onChange: (id: string, value: FileItem[]) => void;
};

// Returns items in `list` that do NOT exist in `sublist` (by name and type, ignoring id)
function differenceByNameAndType(
  list: FileItem[],
  sublist: FileItem[],
): FileItem[] {
  return list.filter((item) => !sublist.some((sub) => sub.name === item.name));
}

// // Adds a unique "id" to each item if it doesn't have one, returns a new array (immutable)
// function addIds<T extends { id?: string }>(
//   list: T[],
// ): (Omit<T, 'id'> & { id: string })[] {
//   return list.map((item) =>
//     item.id
//       ? { ...(item as Omit<T, 'id'>), id: item.id }
//       : { ...(item as Omit<T, 'id'>), id: uuidv4() },
//   );
// }

// // Removes the "id" property from each item, returns a new array (immutable)
// function removeIds<T extends { id?: string }>(list: T[]): Omit<T, 'id'>[] {
//   return list.map(({ id, ...rest }) => ({ ...rest }));
// }

function ListFromList(props: ListFromListProps) {
  const { options, value, onChange } = props;
  const intl = useIntl();

  let optionsForDisplay = useListData({
    initialItems: differenceByNameAndType(options, value),
  });

  let valueList = useListData({
    initialItems: value || [],
  });

  useEffect(() => {
    onChange(props.id, valueList.items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueList.items]);

  useEffect(() => {
    // Two-way-binding, resets valueList with the contents of value when value changes
    // from the outside (eg. when an undo or redo operation is performed).
    const isSameByNameAndOrder =
      Array.isArray(value) &&
      value.length === valueList.items.length &&
      value.every((v, i) => v.name === valueList.items[i]?.name);

    if (!isSameByNameAndOrder) {
      valueList.setSelectedKeys(new Set()); // Clear selection if needed
      valueList.remove(...valueList.items.map((item) => item.id));
      if (value && value.length > 0) {
        valueList.append(...value);
      }
      optionsForDisplay.setSelectedKeys(new Set()); // Clear selection if needed
      optionsForDisplay.remove(
        ...optionsForDisplay.items.map((item) => item.id),
      );
      optionsForDisplay.append(...differenceByNameAndType(options, value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <FormFieldWrapper {...props} noForInFieldLabel className="listfromlist" />
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <DndListBox
          title={props.optionsTitle}
          list={optionsForDisplay}
          aria-label={
            intl.formatMessage(messages.optionsLabel) ||
            props['aria-label'] ||
            props.optionsTitle
          }
        />
        <DndListBox
          title={props.valuesTitle}
          list={valueList}
          aria-label={
            intl.formatMessage(messages.valueLabel) ||
            props['aria-label'] ||
            props.valuesTitle
          }
        />
      </div>
    </>
  );
}

export default ListFromList;
