import { defineMessages, useIntl } from 'react-intl';
import BlocksObjectWidget from './BlocksObjectWidget';
import type { BlockEditProps } from '@plone/types';

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
  icon: {
    id: 'Icon',
    defaultMessage: 'Icon',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  logo: {
    id: 'Logo image',
    defaultMessage: 'Logo image',
  },
  item: {
    id: 'Item',
    defaultMessage: 'Item',
  },
  items: {
    id: 'Items',
    defaultMessage: 'Items',
  },
  addLogo: {
    id: 'Add logo',
    defaultMessage: 'Add logo',
  },
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
  itemsToShow: {
    id: 'Items to show',
    defaultMessage: 'Items to show',
  },
  hideDescription: {
    id: 'Hide description',
    defaultMessage: 'Hide description',
  },
  settings: {
    id: 'Settings',
    defaultMessage: 'Settings',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
});

const FooterLogosWidget = (props) => {
  const { value, onChange } = props;
  const intl = useIntl();

  function schema(props: BlockEditProps) {
    return {
      title: intl.formatMessage(messages.item),
      addMessage: intl.formatMessage(messages.addLogo),
      fieldsets: [
        {
          id: 'default',
          title: 'Default',
          fields: ['logo', 'alt', 'href', 'openLinkInNewTab'],
        },
      ],

      properties: {
        title: {
          title: intl.formatMessage(messages.title),
        },
        logo: {
          title: intl.formatMessage(messages.logo),
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

  return (
    <BlocksObjectWidget
      {...props}
      value={value}
      schema={schema}
      onChange={onChange}
    />
  );
};

export default FooterLogosWidget;
