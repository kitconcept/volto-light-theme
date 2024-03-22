import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { FormFieldWrapper } from '@plone/volto/components';
import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import imageLeftSVG from '@plone/volto/icons/image-left.svg';
import imageRightSVG from '@plone/volto/icons/image-right.svg';
import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageWideSVG from '@plone/volto/icons/image-wide.svg';
import imageFullSVG from '@plone/volto/icons/image-full.svg';

const messages = defineMessages({
  left: {
    id: 'Left',
    defaultMessage: 'Left',
  },
  right: {
    id: 'Right',
    defaultMessage: 'Right',
  },
  center: {
    id: 'Center',
    defaultMessage: 'Center',
  },
  wide: {
    id: 'Wide',
    defaultMessage: 'Wide',
  },
  full: {
    id: 'Full',
    defaultMessage: 'Full',
  },
});

const AlignWidget = (props) => {
  const intl = useIntl();

  const {
    id,
    onChange,
    actions = ['left', 'right', 'center', 'full'],
    value,
  } = props;

  React.useEffect(() => {
    if (!props.value && props.default) {
      props.onChange(props.id, props.default);
    }
  });

  const ICON_MAP = {
    left: imageLeftSVG,
    right: imageRightSVG,
    center: imageFitSVG,
    wide: imageWideSVG,
    full: imageFullSVG,
  };

  return (
    <FormFieldWrapper {...props} className="align-widget">
      <div className="align-buttons">
        {actions.map((action) => (
          <Button.Group key={action}>
            <Button
              icon
              basic
              aria-label={intl.formatMessage(messages[action])}
              onClick={() => onChange(id, action)}
              active={(action === 'center' && !value) || value === action}
            >
              <Icon name={ICON_MAP[action]} size="24px" />
            </Button>
          </Button.Group>
        ))}
      </div>
    </FormFieldWrapper>
  );
};

export default AlignWidget;
