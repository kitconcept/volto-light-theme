import type { BlockEditProps } from '@plone/types';
import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';

const messages = defineMessages({
  Target: {
    id: 'Target',
    defaultMessage: 'Target',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  AltText: {
    id: 'Alt text',
    defaultMessage: 'Alt text',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  icon: {
    id: 'Icon',
    defaultMessage: 'Icon',
  },
  item: {
    id: 'Item',
    defaultMessage: 'Item',
  },
  addItem: {
    id: 'Add item',
    defaultMessage: 'Add item',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
});

export function iconLinkListSchema({
  props,
  intl,
}: {
  props: BlockEditProps;
  intl: IntlShape;
}) {
  return {
    title: intl.formatMessage(messages.item),
    addMessage: intl.formatMessage(messages.addItem),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'icon', 'alt', 'href', 'openLinkInNewTab'],
      },
    ],

    properties: {
      title: {
        title: intl.formatMessage(messages.title),
      },
      icon: {
        title: intl.formatMessage(messages.icon),
        widget: 'object_browser',
        selectedItemAttrs: ['Title', 'Description', 'image_field', '@type'],
        mode: 'image',
        allowExternals: true,
      },
      alt: {
        title: intl.formatMessage(messages.AltText),
      },
      href: {
        title: intl.formatMessage(messages.Target),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description'],
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
