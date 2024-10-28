import React from 'react';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { isEmpty, isEqual } from 'lodash';
import { defineMessages, useIntl } from 'react-intl';
import { Button } from '@plone/components';
import cx from 'classnames';

const messages = defineMessages({
  Color: {
    id: 'Color',
    defaultMessage: 'Color',
  },
});

type Color =
  | {
      name: string;
      label: string;
      style: Record<`--${string}`, string>;
    }
  | {
      name: string;
      label: string;
      style: undefined;
    };

export type ColorPickerWidgetProps = {
  id: string;
  title: string;
  value?: string;
  default?: string | object;
  required?: boolean;
  missing_value?: unknown;
  className?: string;
  onChange: (id: string, value: any) => void;
  colors: Color[];
  themes: Color[];
};

const ColorPickerWidget = (props: ColorPickerWidgetProps) => {
  const { id, value, onChange } = props;
  const colors = props.themes || props.colors || [];
  const intl = useIntl();

  return colors.length > 0 ? (
    <FormFieldWrapper {...props} className="theme-picker-widget">
      <div className="buttons">
        {colors.map((color) => {
          const colorName = color.name;
          return (
            <Button
              key={id + colorName}
              className={cx(colorName, { active: value === colorName })}
              onPress={(e) => {
                onChange(
                  id,
                  colorName === value ? props.missing_value : colorName,
                );
              }}
              value={value}
              style={color.style}
              aria-label={color.label}
            />
          );
        })}
      </div>
    </FormFieldWrapper>
  ) : null;
};

export default ColorPickerWidget;
