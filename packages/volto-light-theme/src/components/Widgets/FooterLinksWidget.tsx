import { defineMessages, useIntl } from 'react-intl';
import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';
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
  const { value } = props;
  const intl = useIntl();

  function onChange(id, value) {
    props.onChange(id, { items: value });
  }

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
    <ObjectListWidget
      {...props}
      value={value?.items}
      schema={schema}
      onChange={onChange}
    />
  );
};

export default FooterLinksWidget;
