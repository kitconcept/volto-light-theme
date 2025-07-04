import React from 'react';
import {
  RealStoreWrapper as Wrapper,
  FormUndoWrapper,
} from '@plone/volto/storybook';

export function withWidgetWrapper(Widget) {
  return function WidgetWrapper(props) {
    return (
      <Wrapper
        location={{ pathname: '/folder2/folder21/doc212' }}
        customStore={props.customStore}
      >
        <FormUndoWrapper
          initialState={{
            value: props.value || props.initialValue,
          }}
          showControls={props.showUndoControls ?? true}
        >
          {({ state, onChange }) => (
            <div className="ui segment form attached">
              <Widget
                id={props.id || 'widget'}
                title={props.title || 'Widget Title'}
                block="block"
                {...props}
                value={state.value}
                onChange={(block, value) => onChange({ value })}
              />
              <pre>Value: {JSON.stringify(state.value, null, 4)}</pre>
            </div>
          )}
        </FormUndoWrapper>
      </Wrapper>
    );
  };
}
