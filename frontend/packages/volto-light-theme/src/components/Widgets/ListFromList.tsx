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
import {
  normalizeList,
  denormalizeList,
} from '@kitconcept/volto-light-theme/helpers/listNormalizer';

type ListItem =
  | { title: string; token: string }
  | { label: string; value: string }
  | string;

type ListBoxItem = { label: string; id: string };

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
  list: ListData<ListBoxItem>;
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
          'text/plain': item.label,
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
      {(item) => <ListBoxItem>{item.label}</ListBoxItem>}
    </ListBox>
  );
}

type ListFromListProps = {
  id: string;
  title?: string;
  optionsTitle?: string;
  valuesTitle?: string;
  value?: ListItem[];
  options: ListItem[];
  required?: boolean;
  default?: ListItem[];
  'aria-label': string;
  onChange: (id: string, value: ListItem[]) => void;
};

// Returns items in `list` that do NOT exist in `sublist` (by name and type, ignoring id)
function differenceByNameAndType(
  list: ListBoxItem[],
  sublist: ListBoxItem[],
): ListBoxItem[] {
  return list.filter((item) => !sublist.some((sub) => sub.id === item.id));
}

function ListFromList(props: ListFromListProps) {
  const { options, value, onChange } = props;
  const intl = useIntl();

  let optionsForDisplay = useListData({
    initialItems: differenceByNameAndType(
      normalizeList(options),
      normalizeList(value),
    ),
  });

  let valueList = useListData({
    initialItems: normalizeList(value) || [],
  });

  useEffect(() => {
    onChange(props.id, denormalizeList(valueList.items));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueList.items]);

  useEffect(() => {
    // Two-way-binding, resets valueList with the contents of value when value changes
    // from the outside (eg. when an undo or redo operation is performed).
    const isSameByNameAndOrder =
      Array.isArray(value) &&
      value.length === valueList.items.length &&
      normalizeList(value).every((v, i) => v.id === valueList.items[i]?.id);

    if (!isSameByNameAndOrder) {
      valueList.setSelectedKeys(new Set()); // Clear selection if needed
      valueList.remove(...valueList.items.map((item) => item.id));
      if (value && value.length > 0) {
        valueList.append(...normalizeList(value));
      }
      optionsForDisplay.setSelectedKeys(new Set()); // Clear selection if needed
      optionsForDisplay.remove(
        ...optionsForDisplay.items.map((item) => item.id),
      );
      optionsForDisplay.append(
        ...differenceByNameAndType(
          normalizeList(options),
          normalizeList(value),
        ),
      );
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
