/**
 * A Quanta toolbar entry button that can render itself either as
 * a Menu (containing a list of components MenuItem) or a ToggleButton.
 *
 */

import React from 'react';
import { Text, ToggleButton } from 'react-aria-components';
import { Menu, MenuItem, Button } from '@plone/components';
import { isEqual } from 'lodash';
import cx from 'classnames';

const ColorPickerToolbarWidget = (props) => {
  const { id, className, blockProps, options, widgetName } = props;
  const { block, onChangeBlock, data } = blockProps;

  return (
    options.length > 0 &&
    data?.styles && (
      <div className={`${widgetName}-toolbar-widget`}>
        <div className={cx('buttons', className)}>
          {options.map((option) => {
            let optionValue = option['style'] ?? '';
            const optionName = option.name;
            if (option.style !== undefined) {
              optionValue = option.style;
            } else {
              optionValue = option.name;
            }

            return (
              <Button
                key={optionName}
                onPress={(e) => {
                  onChangeBlock(block, {
                    ...data,
                    styles: {
                      ...data?.styles,
                      [id]: optionValue,
                    },
                  });
                }}
                style={option.style}
                active={isEqual(data.styles[id], optionValue)}
                circular
                aria-label={option.label}
                title={option.label}
              />
            );
          })}
        </div>
      </div>
    )
  );
};

const BlockWidthToolbarWidget = (props) => {
  const { id, className, blockProps, options, widgetName } = props;
  const { block, onChangeBlock, data } = blockProps;

  return (
    options.length > 0 &&
    data?.styles && (
      <div className={`${widgetName}-toolbar-widget`}>
        <div className={cx('buttons', className)}>
          {options.map((option) => {
            let optionValue = option['style'] ?? '';
            const optionName = option.name;
            if (option.style !== undefined) {
              optionValue = option.style;
            } else {
              optionValue = option.name;
            }

            return (
              <Button
                key={optionName}
                onPress={(e) => {
                  onChangeBlock(block, {
                    ...data,
                    styles: {
                      ...data?.styles,
                      [id]: optionValue,
                    },
                  });
                }}
                active={isEqual(data.styles[id], optionValue)}
                circular
                aria-label={option.label}
                title={option.label}
              >
                {option.icon && option.icon}
                {option.label && <Text slot="label">{option.label}</Text>}
              </Button>
            );
          })}
        </div>
      </div>
    )
  );
};

const BlockAlignmentToolbarWidget = (props) => {
  const { id, className, blockProps, options, widgetName } = props;
  const { block, onChangeBlock, data } = blockProps;

  return (
    options.length > 0 && (
      <div className={`${widgetName}-toolbar-widget`}>
        <div className={cx('buttons', className)}>
          {options.map((option) => {
            let optionValue = option['style'] ?? '';
            const optionName = option.name;
            if (option.name !== undefined) {
              optionValue = option.name;
            } else {
              optionValue = option.name;
            }

            return (
              <Button
                key={optionName}
                onPress={(e) => {
                  onChangeBlock(block, {
                    ...data,
                    [id]: optionValue,
                  });
                }}
                active={isEqual(data[id], optionValue)}
                circular
                aria-label={option.label}
                title={option.label}
              >
                {option.icon && option.icon}
                {option.label && <Text slot="label">{option.label}</Text>}
              </Button>
            );
          })}
        </div>
      </div>
    )
  );
};

const BlockToolbarItem = (props) => {
  const { item } = props;
  const { isMenuShape, icon, label, onClick, name, options } = item;

  return (
    <>
      {isMenuShape ? (
        <Menu
          aria-label={name}
          orientation="vertical"
          button={icon}
          label={label}
        >
          {name === 'backgroundColor' ? (
            <MenuItem className={'button-wrapper'}>
              <ColorPickerToolbarWidget
                {...props}
                id={'backgroundColor:noprefix'}
                widgetName={name}
                options={options}
              />
            </MenuItem>
          ) : name === 'block-width' ? (
            <MenuItem className={'button-wrapper'}>
              <BlockWidthToolbarWidget
                {...props}
                id={'blockWidth:noprefix'}
                widgetName={name}
                options={options}
              />
            </MenuItem>
          ) : name === 'alignment' ? (
            <MenuItem className={'button-wrapper'}>
              <BlockAlignmentToolbarWidget
                {...props}
                id={'inneralign'}
                widgetName={name}
                options={options}
              />
            </MenuItem>
          ) : (
            <>
              {props.item?.options?.map((option) => {
                return (
                  <MenuItem className={'button-wrapper'}>
                    <Button
                      aria-label={`${option.name}`}
                      onPress={() => option.onClick}
                    >
                      {option.icon && option.icon}
                      {option.label && <Text slot="label">{option.label}</Text>}
                    </Button>
                  </MenuItem>
                );
              })}
            </>
          )}
        </Menu>
      ) : (
        <ToggleButton aria-label={`${name}`} onPress={onClick} label={label}>
          {icon}
        </ToggleButton>
      )}
    </>
  );
};

export default BlockToolbarItem;
