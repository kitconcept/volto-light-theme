// Description: A color picker widget using react-aria-components
// color picker component. Put in the fridge for now because
// it had performance problems with Volto sidebar.
// For now, using `ColorPicker` widget instead.
import { ColorField, ColorPicker } from '@plone/components';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

import '@plone/components/src/styles/basic/ColorPicker.css';

const ColorPickerWidget = (props: {
  id: string;
  title: string;
  value: string;
  default: string;
  onChange: (id: string, value: any) => void;
}) => {
  return (
    <FormFieldWrapper {...props} className="color">
      <ColorPicker
        defaultValue="#ffffff"
        onChange={(value) =>
          props.onChange(props.id, value?.toString('hex') || null)
        }
        value={props.value || '#ffffff'}
      />
      <ColorField
        aria-label={`Pick a color for ${props.title}`}
        value={props.value}
        onChange={(value) =>
          props.onChange(props.id, value?.toString('hex') || null)
        }
      />
    </FormFieldWrapper>
  );
};

export default ColorPickerWidget;
