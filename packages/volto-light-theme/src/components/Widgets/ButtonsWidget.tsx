import React from 'react';
import { FormFieldWrapper } from '@plone/volto/components';
import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import { isEqual, find } from 'lodash';

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
    <FormFieldWrapper {...props} className="align-widget">
      <div className="align-buttons">
        {actions.map((action) => (
          <Button.Group key={action.name}>
            <Button
              icon
              basic
              aria-label={actionsInfoMap[action.name][1]}
              onClick={() => onChange(id, action.style || action.name)}
              active={isEqual(value, action.style)}
            >
              {/* @ts-ignore */}
              <Icon
                name={actionsInfoMap[action.name][0]}
                title={actionsInfoMap[action.name][1] || action.name}
                size="24px"
              />
            </Button>
          </Button.Group>
        ))}
      </div>
    </FormFieldWrapper>
  );
};

export default ButtonsWidget;
