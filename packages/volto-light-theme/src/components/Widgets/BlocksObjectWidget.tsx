import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import omit from 'lodash/omit';
import { Accordion, Button, Segment } from 'semantic-ui-react';
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

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import { v4 as uuid } from 'uuid';
import type { BlocksData } from '@plone/types';

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

/**
 * This is a DataGridField-equivalent widget for schema-based values.
 * The shape of the items in the array is defined using a schema.
 *
 * ObjectListWidget can receive an optional `schemaExtender` prop which is
 * a function that can mutate the schema for each individual item in the array.
 * An example schema definition of the a field that renders with the
 * ObjectListWidget:
 *
 * ```jsx
 *  columns: {
 *    title: 'Columns',
 *    description: 'Leave empty to show all columns',
 *    schema: SomeItemSchema,
 *    widget: 'object_list',
 *    schemaExtender: (schema, data) => {
 *      const mutated = lodash.cloneDeep(schema);
 *      mutated.properties.extraField = {
 *        title: 'Extra field',
 *      }
 *      mutated.fieldsets[0].fields.push('extraField');
 *      return mutated;
 *    },
 *    activeObject: 0, // Current active object drilled down from the schema (if present)
 *    setActiveObject: () => {} // The current active object state updater function drilled down from the schema (if present)
 *  },
 * ```
 */
const ObjectListWidget = (props: BlocksObjectWidgetProps) => {
  const { block, fieldSet, id, schema, value, onChange, schemaExtender } =
    props;
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

  return (
    <div className="objectlist-widget">
      <FormFieldWrapper {...props} noForInFieldLabel className="objectlist">
        <div className="add-item-button-wrapper">
          <Button
            compact
            icon
            aria-label={
              objectSchema.addMessage ||
              `${intl.formatMessage(messages.add)} ${objectSchema.title}`
            }
            onClick={(e) => {
              e.preventDefault();
              const newId = uuid();
              const data = {};

              const objSchema = schemaExtender
                ? schemaExtender(schema, data, intl)
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
            &nbsp;
            {/* Custom addMessage in schema, else default to English */}
            {objectSchema.addMessage ||
              `${intl.formatMessage(messages.add)} ${objectSchema.title}`}
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
      {/* {value?.blocks_layout?.items.map((blockId, index) => {
        const blockData = value?.blocks[blockId];
        return (
          <ObjectWidget
            id={`${blockId}-${index}`}
            key={`ow-${blockId}-${index}`}
            block={block}
            schema={
              schemaExtender
                ? schemaExtender(schema, blockData, intl)
                : objectSchema
            }
            value={blockData}
            onChange={(fi, fv) => {
              const changedBlockId = fi.slice(0, -2);
              const newvalue = { ...value.blocks[changedBlockId], ...fv };
              onChange(id, {
                ...value,
                blocks: { ...value.blocks, [changedBlockId]: newvalue },
              });
            }}
          />
        );
      })} */}
      <DragDropList
        style={{
          boxShadow: `${topLayerShadow}${value?.blocks_layout?.items?.length > 1 ? secondLayer : ''}${
            value?.blocks_layout?.items?.length > 2 ? thirdLayer : ''
          }`,
        }}
        forwardedAriaLabelledBy={`fieldset-${
          fieldSet || 'default'
        }-field-label-${id}`}
        childList={
          value?.blocks_layout?.items?.map((blockId) => [
            blockId,
            value.blocks[blockId],
          ]) || []
        }
        onMoveItem={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }
          const newFormData = moveBlock(value, source.index, destination.index);
          onChange(id, newFormData);
          return true;
        }}
      >
        {({ child, childId, index, draginfo }) => {
          return (
            <div
              ref={draginfo.innerRef}
              {...draginfo.draggableProps}
              key={childId}
            >
              <Accordion key={index} fluid styled>
                <Accordion.Title
                  active={activeObject === index}
                  index={index}
                  onClick={handleChangeActiveObject}
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
                    {...draginfo.dragHandleProps}
                    className="drag handle"
                  >
                    <Icon name={dragSVG} size="18px" />
                  </button>

                  <div className="accordion-title-wrapper">
                    {`${objectSchema.title} #${index + 1}`}
                  </div>
                  <div className="accordion-tools">
                    <button
                      aria-label={`${intl.formatMessage(
                        messages.labelRemoveItem,
                      )} #${index + 1}`}
                      onClick={() => {
                        onChange(id, deleteBlock(value, childId));
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
                </Accordion.Title>
                <Accordion.Content active={activeObject === index}>
                  <Segment>
                    <ObjectWidget
                      id={`${childId}-${index}`}
                      key={`ow-${childId}-${index}`}
                      block={block}
                      schema={
                        schemaExtender
                          ? schemaExtender(schema, child, intl)
                          : objectSchema
                      }
                      value={child}
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
                  </Segment>
                </Accordion.Content>
              </Accordion>
            </div>
          );
        }}
      </DragDropList>
    </div>
  );
};
export default ObjectListWidget;
