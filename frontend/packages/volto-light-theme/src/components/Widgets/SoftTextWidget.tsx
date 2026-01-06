/**
 * OVERRIDE TextWidget.jsx
 * REASON: Add softMaxLength warning for TextWidget.
 * FILE: https://github.com/plone/volto/blob/ede0335834445988dd0639ab2361180251c97e4e/packages/volto/src/components/manage/Widgets/TextWidget.jsx
 * FILE VERSION: Volto 19.0.0-alpha.20
 * DATE: 2025-12-16
 * DEVELOPER: @Tishasoumya-02
 */
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'semantic-ui-react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
const SoftTextWidget = (props) => {
  const {
    id,
    value,
    onChange,
    onBlur,
    onClick,
    icon,
    iconAction,
    minLength,
    maxLength,
    softMaxLength,
    placeholder,
    isDisabled,
    focus,
  } = props;
  const ref = useRef();
  const [softLengthWarning, setSoftLengthWarning] = useState('');
  useEffect(() => {
    if (focus) {
      ref.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // START CUSTOMIZATION
  const handleChange = (id, newValue) => {
    if (softMaxLength && newValue?.length) {
      const remaining = softMaxLength - newValue.length;
      if (remaining < 0) {
        setSoftLengthWarning(
          `You have exceeded the recommended limit by ${Math.abs(remaining)}`,
        );
      } else {
        setSoftLengthWarning('');
      }
    }
    onChange(id, newValue);
  };
  // END CUSTOMIZATION
  return (
    <FormFieldWrapper {...props} className="text">
      <Input
        id={`field-${id}`}
        name={id}
        value={value || ''}
        disabled={isDisabled}
        icon={icon || null}
        placeholder={placeholder}
        // START CUSTOMIZATION
        onChange={({ target }) =>
          handleChange(id, target.value === '' ? undefined : target.value)
        }
        // END CUSTOMIZATION
        ref={ref}
        onBlur={({ target }) =>
          onBlur(id, target.value === '' ? undefined : target.value)
        }
        onClick={() => onClick()}
        minLength={minLength || null}
        maxLength={maxLength || null}
      />
      {/* START CUSTOMIZATION */}
      {softLengthWarning.length > 0 && (
        <Label key={softLengthWarning} basic color="yellow" pointing>
          {softLengthWarning}
        </Label>
      )}
      {/* END CUSTOMIZATION */}
      {icon && iconAction && (
        <button className={`field-${id}-action-button`} onClick={iconAction}>
          <Icon name={icon} size="18px" />
        </button>
      )}
    </FormFieldWrapper>
  );
};
export default SoftTextWidget;
SoftTextWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  focus: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  icon: PropTypes.shape({
    xmlns: PropTypes.string,
    viewBox: PropTypes.string,
    content: PropTypes.string,
  }),
  iconAction: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  // START CUSTOMIZATION
  softMaxLength: PropTypes.number,
  // END CUSTOMIZATION
  wrapped: PropTypes.bool,
  placeholder: PropTypes.string,
};
SoftTextWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
  onChange: () => {},
  onBlur: () => {},
  onClick: () => {},
  onEdit: null,
  onDelete: null,
  focus: false,
  icon: null,
  iconAction: null,
  minLength: null,
  maxLength: null,
  // START CUSTOMIZATION
  softMaxLength: null,
  // END CUSTOMIZATION
};
