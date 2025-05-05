import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { Button, Dialog, DialogTrigger, Popover } from 'react-aria-components';
import { ColorSwatch, CloseIcon } from '@plone/components';
import ColorContrastChecker from './ColorContrastChecker';
import config from '@plone/volto/registry';

const ColorPicker = (props: {
  id: string;
  title: string;
  value: string;
  onChange: (id: string, value: any) => void;
}) => {
  const { id, onChange, value } = props;

  return (
    <>
      <FormFieldWrapper {...props} className="theme-color-picker">
        <DialogTrigger>
          <Button className="theme-color-picker-button">
            <ColorSwatch color={value || '#fff'} />
          </Button>

          <Popover placement="bottom start">
            <Dialog className="theme-color-picker-dialog">
              <HexColorPicker
                color={value || ''}
                onChange={(value) => {
                  // edge case for Batman value
                  if (value !== '#NaNNaNNaN') {
                    onChange(id, value);
                  }
                }}
              />
            </Dialog>
          </Popover>
        </DialogTrigger>
        <HexColorInput
          color={value || ''}
          onChange={(value) => onChange(id, value)}
          prefixed
        />
        <Button
          className="theme-color-picker-reset react-aria-Button"
          onPress={() => {
            onChange(id, '');
          }}
        >
          <CloseIcon size="S" />
        </Button>
      </FormFieldWrapper>
      {config.settings.colorMap[props.id] && (
        <ColorContrastChecker {...props} />
      )}
    </>
  );
};

export default ColorPicker;
