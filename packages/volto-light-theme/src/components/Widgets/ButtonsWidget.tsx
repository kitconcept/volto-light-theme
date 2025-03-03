import React from 'react';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { Button } from '@plone/components';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';

// Move to an unified `StyleDefinition` type
type Actions =
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

export type ButtonsWidgetProps = {
  id: string;
  onChange: Function;
  actions: Actions[];
  actionsInfoMap: Record<string, string[]>;
  filterActions: string[];
  value: string;
  default: string;
  disabled: boolean;
  isDisabled: boolean;
};

const ButtonsWidget = (props: ButtonsWidgetProps) => {
  const { disabled, id, onChange, actions, actionsInfoMap, value, isDisabled } =
    props;

  React.useEffect(() => {
    if (!props.value && props.default) {
      props.onChange(
        props.id,
        find(actions, { name: props.default })?.style || props.default,
      );
    }
  });

  return (
    <FormFieldWrapper {...props} className="widget">
      <div className="buttons buttons-widget">
        {actions.map((action) => (
          <Button
            key={action.name}
            aria-label={actionsInfoMap[action.name][1]}
            onPress={() => onChange(id, action.style || action.name)}
            className={
              isEqual(value, action.style || action.name) ? 'active' : null
            }
            isDisabled={disabled || isDisabled}
          >
            {typeof actionsInfoMap[action.name][0] === 'string' ? (
              <div className="image-sizes-text">
                {actionsInfoMap[action.name][0]}
              </div>
            ) : (
              <Icon
                name={actionsInfoMap[action.name][0]}
                title={actionsInfoMap[action.name][1] || action.name}
                size="24px"
              />
            )}
          </Button>
        ))}
      </div>
    </FormFieldWrapper>
  );
};

export default ButtonsWidget;
