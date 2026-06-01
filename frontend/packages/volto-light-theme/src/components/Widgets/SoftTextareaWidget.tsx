import { useState } from 'react';
import PropTypes from 'prop-types';
import { Label, TextArea } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
/**
 * TextareaWidget, a widget for multiple lines text
 *
 * To use it, in schema properties, declare a field like:
 *
 * ```jsx
 * {
 *  title: "Text",
 *  widget: 'textarea',
 * }
 * ```
 */
const SoftTextareaWidget = (props) => {
  const {
    id,
    maxLength,
    value,
    onChange,
    placeholder,
    isDisabled,
    softMaxLength,
  } = props;
  const [lengthError, setlengthError] = useState('');
  const [softLengthWarning, setSoftLengthWarning] = useState('');
  const onhandleChange = (id, value) => {
    if (maxLength && value?.length) {
      let remlength = maxLength - value.length;
      if (remlength < 0) {
        setlengthError(
          `You have exceeded word limit by ${Math.abs(remlength)}`,
        );
      } else {
        setlengthError('');
      }
    }
    //START CUSTOMIZATION
    if (softMaxLength && value?.length) {
      let remaining = softMaxLength - value.length;
      if (remaining < 0) {
        setSoftLengthWarning(
          `You have exceeded the recommended limit by ${Math.abs(remaining)}`,
        );
      } else {
        setSoftLengthWarning('');
      }
    }
    //END CUSTOMIZATION
    onChange(id, value);
  };
  return (
    <FormFieldWrapper {...props} className="textarea">
      <TextArea
        id={`field-${id}`}
        name={id}
        value={value || ''}
        disabled={isDisabled}
        placeholder={placeholder}
        onChange={({ target }) =>
          onhandleChange(id, target.value === '' ? undefined : target.value)
        }
      />
      {/* START CUSTOMIZATION */}
      {softLengthWarning.length > 0 && (
        <Label key={softLengthWarning} basic color="yellow" pointing>
          {softLengthWarning}
        </Label>
      )}
      {/* END CUSTOMIZATION */}
      {lengthError.length > 0 && (
        <Label key={lengthError} basic color="red" pointing>
          {lengthError}
        </Label>
      )}
    </FormFieldWrapper>
  );
};
/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
SoftTextareaWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  maxLength: PropTypes.number,
  softMaxLength: PropTypes.number,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  wrapped: PropTypes.bool,
  placeholder: PropTypes.string,
};
/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
SoftTextareaWidget.defaultProps = {
  description: null,
  maxLength: null,
  softMaxLength: null,
  required: false,
  error: [],
  value: null,
  onChange: null,
  onEdit: null,
  onDelete: null,
};
export default injectIntl(SoftTextareaWidget);
