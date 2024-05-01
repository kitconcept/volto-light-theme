/**
 * A Quanta toolbar entry button that can render itself either as
 * a Menu (containing a list of components MenuItem) or a ToggleButton.
 *
 */

import React from 'react';
import { Text, ToggleButton } from 'react-aria-components';
import { Menu, MenuItem, Button } from '@plone/components';

const BlockToolbarItem = (props) => {
  const { item } = props;
  const { isMenuShape, icon, label, onClick, name } = item;

  return isMenuShape ? (
    <Menu aria-label={name} orientation="vertical" button={icon}>
      {props.item?.options?.map((option) => {
        return (
          <MenuItem className={'button-wrapper'}>
            <Button aria-label={`${option.name}`}>
              {option.icon}
              <Text slot="label">{option.label}</Text>
            </Button>
          </MenuItem>
        );
      })}
    </Menu>
  ) : (
    <ToggleButton aria-label={`${name}`}>{icon}</ToggleButton>
  );
};

export default BlockToolbarItem;
