import * as React from 'react';
import { TextareaWidget } from '@plone/volto/components/manage/Widgets';

const AllowedBlocks = (props) => {
  const [textValue, setTextValue] = React.useState(
    JSON.stringify(props.value, null, 2),
  );

  return (
    <TextareaWidget
      {...props}
      value={textValue}
      onChange={(id, value) => {
        setTextValue(value);
        try {
          const validJSON = JSON.parse(value);
          props.onChange(id, validJSON);
        } catch (error) {
          // Handle invalid JSON input
        }
      }}
    />
  );
};

export default AllowedBlocks;
