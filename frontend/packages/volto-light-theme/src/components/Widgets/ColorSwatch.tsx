import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { Button } from '@plone/components';
import cx from 'classnames';

export type Color =
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

export type ColorSwatchProps = {
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

const ColorSwatch = (props: ColorSwatchProps) => {
  const { id, value, onChange } = props;
  const colors = props.themes || props.colors || [];

  return colors.length > 0 ? (
    <FormFieldWrapper {...props} className="color-swatch-widget">
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

export default ColorSwatch;
