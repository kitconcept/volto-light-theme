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
  addLink: {
    id: 'Add link',
    defaultMessage: 'Add link',
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

const FooterLinksWidget = (props) => {
  const { value, onChange } = props;
  const intl = useIntl();

  function schema(props: BlockEditProps) {
    return {
      title: intl.formatMessage(messages.item),
      addMessage: intl.formatMessage(messages.addLink),
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

  return (
    <BlocksObjectWidget
      {...props}
      value={value}
      schema={schema}
      onChange={onChange}
    />
  );
};

export default FooterLinksWidget;
