import React from 'react';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { Button } from '@plone/components';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';

export type Actions =
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

/**
 * A tuple that has an icon in the first element and a i18n string in the second.
 */
export type ActionInfo = [React.ReactElement<any>, string] | [string, string];

export type ButtonsWidgetProps = {
  /**
   * Unique identifier for the widget.
   */
  id: string;

  /**
   * Callback function to handle changes.
   */
  onChange: Function;

  /**
   * List of actions available for the widget.
   */
  actions: Actions[];

  /**
   * Map containing additional the information (icon and i18n string) for each action.
   */
  actionsInfoMap: Record<string, ActionInfo>;

  /**
   * List of actions to be filtered out. In case that we don't want the default ones
   * we can filter them out.
   */
  filterActions: string[];

  /**
   * Current value of the widget.
   */
  value: string;

  /**
   * Default value of the widget.
   */
  default: string;

  /**
   * Indicates if the widget is disabled.
   */
  disabled: boolean;

  /**
   * Indicates if the widget is disabled (alternative flag for compatibility reasons).
   */
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
