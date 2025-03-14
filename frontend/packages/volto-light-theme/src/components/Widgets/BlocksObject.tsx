import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import omit from 'lodash/omit';
import { Button } from '@plone/components';
import { Text } from 'react-aria-components';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { applySchemaDefaults } from '@plone/volto/helpers/Blocks/Blocks';
import AnimateHeight from 'react-animate-height';
import ObjectWidget from '@plone/volto/components/manage/Widgets/ObjectWidget';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  moveBlock,
} from '@plone/volto/helpers/Blocks/Blocks';
import DndSortableList from '../../helpers/DndSortableList';
import cx from 'classnames';
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
  /**
   * The ID of the widget.
   */
  id: string;
  /**
   * The ID of the block this widget belongs to.
   */
  block: string;
  /**
   * The fieldset this widget belongs to.
   */
  fieldSet: string;
  /**
   * The title of the widget.
   */
  title: string;
  /**
   * The current value of the widget, which is BlocksData.
   */
  value?: BlocksData;
  /**
   * The default value for the widget. Can be a string or an object.
   */
  default?: string | object;
  /**
   * Whether the widget is required.
   */
  required?: boolean;
  /**
   * The value to use when the widget is missing a value.
   */
  missing_value?: unknown;
  /**
   * The CSS class name for the widget.
   */
  className?: string;
  /**
   * A callback function that is called when the value of the widget changes.
   * @param id The ID of the widget.
   * @param value The new value of the widget.
   */
  onChange: (id: string, value: any) => void;
  /**
   * The index of the currently active object.
   */
  activeObject: number;
  /**
   * A callback function that is called to set the active object.
   * @param index The index of the object to set as active.
   */
  setActiveObject: (index: number) => void;
  /**
   * The schema for the BlocksObjectWidget.
   */
  schema: BlocksObjectWidgetSchema;
  /**
   * The name of the schema.
   */
  schemaName: string;
  /**
   * An optional function to enhance the schema.
   * @param args An object containing the schema, form data, intl, navRoot, and contentType.
   */
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

  function handleChangeActiveObject(index) {
    const newIndex = activeObject === index ? -1 : index;

    setActiveObject(newIndex);
  }

  const objectSchema = typeof schema === 'function' ? schema(props) : schema;

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const source = value.blocks_layout.items.indexOf(active.id);
      const destination = value.blocks_layout.items.indexOf(over.id);

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
        // TODO: adapt it to the new DndSortableList shape
        sortedItems={value?.blocks_layout?.items || []}
        items={value?.blocks}
        handleDragEnd={handleDragEnd}
        activeObject={activeObject}
        setActiveObject={setActiveObject}
      >
        {({ item, uid, index, attributes, listeners }) => {
          return (
            <div
              className={cx('bow-item-wrapper', {
                active: activeObject === index,
              })}
              key={uid}
            >
              <div
                className="bow-item-title-bar"
                onClick={() => handleChangeActiveObject(index)}
                role="presentation"
                aria-label={`${
                  activeObject === index
                    ? intl.formatMessage(messages.labelCollapseItem)
                    : intl.formatMessage(messages.labelShowItem)
                } #${index ? index + 1 : ''}`}
              >
                <div className="drag handle" {...listeners} {...attributes}>
                  <Icon name={dragSVG} size="18px" />
                </div>

                <div className="bow-item-title">
                  {item.title ||
                    `${objectSchema.title} #${index !== undefined ? index + 1 : ''}`}
                </div>
                <div className="bow-tools">
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
              </div>
              <AnimateHeight
                animateOpacity
                duration={300}
                height={activeObject === index ? 'auto' : 0}
              >
                <div
                  className={cx('bow-item-content', {
                    active: activeObject === index,
                  })}
                >
                  <ObjectWidget
                    id={`${uid}`}
                    key={`bow-${uid}`}
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
                    onChange={(fieldId: string, fieldValue: any) => {
                      const newvalue = {
                        ...value.blocks[fieldId],
                        ...fieldValue,
                      };
                      onChange(id, {
                        ...value,
                        blocks: {
                          ...value.blocks,
                          [fieldId]: newvalue,
                        },
                      });
                    }}
                  />
                </div>
              </AnimateHeight>
            </div>
          );
        }}
      </DndSortableList>
    </div>
  );
};
export default BlocksObjectWidget;
