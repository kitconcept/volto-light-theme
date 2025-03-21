import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import type { IntlShape } from 'react-intl';
import ButtonsWidget, {
  type ActionInfo,
  type ButtonsWidgetProps,
} from './Buttons';
import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageNarrowSVG from '@plone/volto/icons/image-narrow.svg';
import imageWideSVG from '@plone/volto/icons/image-wide.svg';
import imageFullSVG from '@plone/volto/icons/image-full.svg';

const messages = defineMessages({
  narrow: {
    id: 'Narrow',
    defaultMessage: 'Narrow',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  layout: {
    id: 'Layout',
    defaultMessage: 'Layout',
  },
  full: {
    id: 'Full',
    defaultMessage: 'Full',
  },
});

export const defaultActionsInfo = ({
  intl,
}: {
  intl: IntlShape;
}): Record<string, ActionInfo> => ({
  narrow: [imageNarrowSVG, intl.formatMessage(messages.narrow)],
  default: [imageFitSVG, intl.formatMessage(messages.default)],
  layout: [imageWideSVG, intl.formatMessage(messages.layout)],
  full: [imageFullSVG, intl.formatMessage(messages.full)],
});

const DEFAULT_ACTIONS = [
  {
    style: {
      '--block-width': 'var(--narrow-container-width)',
    },
    name: 'narrow',
    label: 'Narrow',
  },
  {
    style: {
      '--block-width': 'var(--default-container-width)',
    },
    name: 'default',
    label: 'Default',
  },
  {
    style: {
      '--block-width': 'var(--layout-container-width)',
    },
    name: 'layout',
    label: 'Layout',
  },
  {
    style: {
      '--block-width': 'unset',
    },
    name: 'full',
    label: 'Full',
  },
];

const BlockWidthWidget = (props: ButtonsWidgetProps) => {
  const intl = useIntl();

  const { actions = DEFAULT_ACTIONS, actionsInfoMap, filterActions } = props;
  let filteredActions;
  if (filterActions) {
    filteredActions = actions.filter((action) =>
      filterActions.includes(action.name),
    );
  } else {
    filteredActions = actions;
  }

  const actionsInfo = {
    ...defaultActionsInfo({ intl }),
    ...actionsInfoMap,
  };

  return (
    <ButtonsWidget
      {...props}
      actions={filteredActions}
      actionsInfoMap={actionsInfo}
    />
  );
};

export default BlockWidthWidget;
