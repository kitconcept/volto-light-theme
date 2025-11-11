import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { Radio, RadioGroup, Tooltip } from '@plone/components';
import cx from 'classnames';
import { Focusable, TooltipTrigger } from 'react-aria-components';
import type { StyleDefinition } from '@plone/types';

type BaseColorSwatchProps = {
  id: string;
  title: string;
  label: string;
  value?: string;
  default?: string;
  required?: boolean;
  className?: string;
  onChange: (id: string, value: any) => void;
  disabled?: boolean;
  isDisabled?: boolean;
};

type ColorsOnly = { colors: StyleDefinition[]; themes?: undefined };
type ThemesOnly = { themes: StyleDefinition[]; colors?: undefined };

export type ColorSwatchProps = BaseColorSwatchProps & (ColorsOnly | ThemesOnly);

const ColorSwatch = (props: ColorSwatchProps) => {
  const {
    id,
    label,
    title,
    value,
    onChange,
    disabled,
    isDisabled,
    default: defaultValue,
  } = props;
  const colors = props.themes || props.colors || [];

  const selectedColorName = colors.find(({ name }) => name === value)?.name;
  const defaultSelectedColorName =
    !selectedColorName && typeof defaultValue === 'string'
      ? colors.find(({ name }) => name === defaultValue)?.name
      : undefined;

  const fallbackColorName =
    !selectedColorName && !defaultSelectedColorName
      ? colors.find(({ name }) => name === 'default')?.name || colors[0]?.name
      : undefined;

  const radioGroupValueProps: {
    value?: string;
    defaultValue?: string;
  } = selectedColorName
    ? { value: selectedColorName }
    : defaultSelectedColorName
      ? { defaultValue: defaultSelectedColorName }
      : fallbackColorName
        ? { defaultValue: fallbackColorName }
        : {};

  const currentColorName =
    selectedColorName ?? defaultSelectedColorName ?? fallbackColorName;

  return colors.length > 0 ? (
    <FormFieldWrapper {...props} className="color-swatch-widget">
      <RadioGroup
        aria-label={title || label || id}
        orientation="horizontal"
        {...radioGroupValueProps}
        onChange={(value) => onChange(id, value)}
        isDisabled={disabled || isDisabled}
      >
        {colors.map((color) => (
          <Radio
            aria-label={color.label}
            value={color.name}
            className="color-swatch-option-wrapper"
            key={color.name}
          >
            <TooltipTrigger delay={120} closeDelay={80} trigger="hover">
              <Focusable>
                <div
                  role="img"
                  className={cx('color-swatch-option-handler', color.name, {
                    active: currentColorName === color.name,
                  })}
                  style={color.style}
                ></div>
              </Focusable>
              <Tooltip>{color.label}</Tooltip>
            </TooltipTrigger>
          </Radio>
        ))}
      </RadioGroup>
    </FormFieldWrapper>
  ) : null;
};

export default ColorSwatch;
