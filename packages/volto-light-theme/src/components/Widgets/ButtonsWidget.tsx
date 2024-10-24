import React from 'react';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { Button } from '@plone/components';
import { isEqual, find } from 'lodash';

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
};

const ButtonsWidget = (props: ButtonsWidgetProps) => {
  const { id, onChange, actions, actionsInfoMap, value } = props;

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
      <div className="buttons">
        {actions.map((action) => (
          <Button
            key={action.name}
            aria-label={actionsInfoMap[action.name][1]}
            onPress={() => onChange(id, action.style || action.name)}
            className={isEqual(value, action.style) ? 'active' : ''}
          >
            {/* @ts-ignore */}
            <Icon
              name={actionsInfoMap[action.name][0]}
              title={actionsInfoMap[action.name][1] || action.name}
              size="24px"
            />
          </Button>
        ))}
      </div>
    </FormFieldWrapper>
  );
};

export default ButtonsWidget;
