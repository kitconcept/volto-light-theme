import type { BlockEditProps } from '@plone/types';
import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  item: {
    id: 'Action',
    defaultMessage: 'Action',
  },
  addAction: {
    id: 'Add action',
    defaultMessage: 'Add action',
  },
  Target: {
    id: 'Target',
    defaultMessage: 'Target',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
});

export function headerActionsSchema({
  props,
  intl,
}: {
  props: BlockEditProps;
  intl: IntlShape;
}) {
  return {
    title: intl.formatMessage(messages.item),
    addMessage: intl.formatMessage(messages.addAction),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'href', 'openLinkInNewTab'],
      },
    ],

    properties: {
      title: {
        title: intl.formatMessage(messages.title),
      },
      href: {
        title: intl.formatMessage(messages.Target),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description', '@type'],
        allowExternals: true,
      },
      openLinkInNewTab: {
        title: intl.formatMessage(messages.openLinkInNewTab),
        type: 'boolean',
      },
    },
    required: [],
  };
}
