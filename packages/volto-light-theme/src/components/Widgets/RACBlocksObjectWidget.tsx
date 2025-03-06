import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import omit from 'lodash/omit';
// TODO: Replace with a proper accordion component from @plone/components
import { Button } from '@plone/components';
import { Text } from 'react-aria-components';
import DragDropList from '@plone/volto/components/manage/DragDropList/DragDropList';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { applySchemaDefaults } from '@plone/volto/helpers/Blocks/Blocks';
import ObjectWidget from '@plone/volto/components/manage/Widgets/ObjectWidget';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  moveBlock,
} from '@plone/volto/helpers/Blocks/Blocks';
import DndSortableList from './DndSortableList';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import { v4 as uuid } from 'uuid';
import type {
  BlockConfigBase,
  BlocksData,
  Content,
  JSONSchema,
} from '@plone/types';
import type { IntlShape } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  labelRemoveItem: {
    id: 'Remove item',
    defaultMessage: 'Remove item',
  },
  labelCollapseItem: {
    id: 'Collapse item',
    defaultMessage: 'Collapse item',
  },
  labelShowItem: {
    id: 'Show item',
    defaultMessage: 'Show item',
  },
  emptyObjectList: {
    id: 'Empty object list',
    defaultMessage: 'Empty object list',
  },
  add: {
    id: 'Add (object list)',
    defaultMessage: 'Add',
  },
});

export type BlocksObjectWidgetSchema =
  | (JSONSchema & { addMessage: string })
  | ((props: BlocksObjectWidgetProps) => JSONSchema & { addMessage: string });

export type BlocksObjectWidgetProps = {
  id: string;
  block: string;
  fieldSet: string;
  title: string;
  value?: BlocksData;
  default?: string | object;
  required?: boolean;
  missing_value?: unknown;
  className?: string;
  onChange: (id: string, value: any) => void;
  activeObject: number;
  setActiveObject: (index: number) => void;
  schema: BlocksObjectWidgetSchema;
  schemaName: string;
  schemaEnhancer?: (args: {
    schema: JSONSchema & { addMessage: string };
    formData: BlockConfigBase;
    intl: IntlShape;
    navRoot: Content;
    contentType: string;
  }) => JSONSchema;
};

function deleteBlock(formData, blockId: string) {
  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

  let newFormData = {
    ...formData,
    [blocksLayoutFieldname]: {
      items: formData[blocksLayoutFieldname].items.filter(
        (value) => value !== blockId,
      ),
    },
    [blocksFieldname]: omit(formData[blocksFieldname], [blockId]),
  };

  return newFormData;
}

const BlockObjectItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}></div>
  );
};

const BlocksObjectWidget = (props: BlocksObjectWidgetProps) => {
  const { block, fieldSet, id, value, onChange, schemaEnhancer, schemaName } =
    props;

  const schema = config.getUtility({
    type: 'schema',
    name: schemaName,
  }).method;

  const [localActiveObject, setLocalActiveObject] = useState(
    props.activeObject ?? value?.blocks_layout?.items?.length - 1,
  );

  let activeObject: number, setActiveObject: (index: number) => void;
  if (
    (props.activeObject || props.activeObject === 0) &&
    props.setActiveObject
  ) {
    activeObject = props.activeObject;
    setActiveObject = props.setActiveObject;
  } else {
    activeObject = localActiveObject;
    setActiveObject = setLocalActiveObject;
  }

  const intl = useIntl();

  function handleChangeActiveObject(e, blockProps) {
    const { index } = blockProps;
    const newIndex = activeObject === index ? -1 : index;

    setActiveObject(newIndex);
  }
  const objectSchema = typeof schema === 'function' ? schema(props) : schema;

  const topLayerShadow = '0 1px 1px rgba(0,0,0,0.15)';
  const secondLayer = ', 0 10px 0 -5px #eee, 0 10px 1px -4px rgba(0,0,0,0.15)';
  const thirdLayer = ', 0 20px 0 -10px #eee, 0 20px 1px -9px rgba(0,0,0,0.15)';

  function handleDragEnd(event) {
    const { active, over } = event;

    const source = value.blocks_layout.items.indexOf(active.id);
    const destination = value.blocks_layout.items.indexOf(over.id);

    if (active.id !== over.id) {
      const newFormData = moveBlock(value, source, destination);
      onChange(id, newFormData);
    }
  }

  return (
    <div className="blocks-object-widget">
      <FormFieldWrapper {...props} noForInFieldLabel className="objectlist">
        <div className="add-item-button-wrapper">
          <Button
            aria-label={
              objectSchema.addMessage ||
              `${intl.formatMessage(messages.add)} ${objectSchema.title}`
            }
            onPress={(e) => {
              const newId = uuid();
              const data = {};

              const objSchema = schemaEnhancer
                ? // @ts-ignore - TODO Make sure this continues to have sense
                  schemaEnhancer({ schema: objectSchema, formData: data, intl })
                : objectSchema;
              const dataWithDefaults = applySchemaDefaults({
                data,
                schema: objSchema,
                intl,
              });

              onChange(id, {
                ...(value || {}),
                blocks: {
                  ...value?.blocks,
                  [newId]: dataWithDefaults,
                },
                blocks_layout: {
                  ...value?.blocks_layout,
                  items: [...(value?.blocks_layout?.items || []), newId],
                },
              });

              setActiveObject(value?.blocks_layout?.items?.length || 0);
            }}
          >
            <Icon name={addSVG} size="18px" />
            {/* Custom addMessage in schema, else default to English */}
            <Text>
              {objectSchema.addMessage ||
                `${intl.formatMessage(messages.add)} ${objectSchema.title}`}
            </Text>
          </Button>
        </div>
        {value?.blocks_layout?.items?.length === 0 && (
          <input
            aria-labelledby={`fieldset-${
              fieldSet || 'default'
            }-field-label-${id}`}
            type="hidden"
            value={intl.formatMessage(messages.emptyObjectList)}
          />
        )}
      </FormFieldWrapper>
      <DndSortableList
        sortedItems={value?.blocks_layout?.items || []}
        items={value?.blocks}
        handleDragEnd={handleDragEnd}
      >
        {({ item, uid, index, attributes, listeners }) => {
          return (
            <div key={uid}>
              <div className="bow-items-wrapper" key={index}>
                <div
                  className="bow-item-title"
                  active={activeObject === index}
                  index={index}
                  // onClick={handleChangeActiveObject}
                  aria-label={`${
                    activeObject === index
                      ? intl.formatMessage(messages.labelCollapseItem)
                      : intl.formatMessage(messages.labelShowItem)
                  } #${index + 1}`}
                >
                  <button
                    style={{
                      visibility: 'visible',
                      display: 'inline-block',
                    }}
                    className="drag handle"
                    {...listeners}
                    {...attributes}
                  >
                    <Icon name={dragSVG} size="18px" />
                  </button>

                  <div className="accordion-title-wrapper">
                    {item.title || `${objectSchema.title} #${index + 1}`}
                  </div>
                  <div className="accordion-tools">
                    <button
                      aria-label={`${intl.formatMessage(
                        messages.labelRemoveItem,
                      )} #${index + 1}`}
                      onClick={() => {
                        onChange(id, deleteBlock(value, uid));
                      }}
                    >
                      <Icon name={deleteSVG} size="20px" color="#e40166" />
                    </button>
                    {activeObject === index ? (
                      <Icon name={upSVG} size="20px" />
                    ) : (
                      <Icon name={downSVG} size="20px" />
                    )}
                  </div>
                </div>{' '}
                {/* End of MainWrapper__Title */}
                <div
                  className="MainWrapper__Content"
                  active={activeObject === index}
                >
                  <ObjectWidget
                    id={`${uid}-${index}`}
                    key={`ow-${uid}-${index}`}
                    block={block}
                    schema={
                      schemaEnhancer
                        ? // @ts-ignore - TODO Make sure this continues to have sense
                          schemaEnhancer({
                            schema: objectSchema,
                            formData: item,
                            intl,
                          })
                        : objectSchema
                    }
                    value={item}
                    onChange={(fi, fv) => {
                      const changedBlockId = fi.slice(0, -2);
                      const newvalue = {
                        ...value.blocks[changedBlockId],
                        ...fv,
                      };
                      onChange(id, {
                        ...value,
                        blocks: {
                          ...value.blocks,
                          [changedBlockId]: newvalue,
                        },
                      });
                    }}
                  />
                </div>{' '}
                {/* End of MainWrapper__Content */}
              </div>{' '}
              {/* End of MainWrapper */}
            </div>
          );
        }}
      </DndSortableList>
    </div>
  );
};
export default BlocksObjectWidget;
