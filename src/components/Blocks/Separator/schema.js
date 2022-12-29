import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  noLine: {
    id: 'Hide Separator Line',
    defaultMessage: 'Hide Separator Line',
  },
  align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
});
export const separatorStyleEnhancer = ({ schema, intl }) => {
  addStyling({ schema, intl });

  schema.properties.styles.schema.fieldsets[0].fields = ['align', 'noLine'];
  schema.properties.styles.schema.properties.align = {
    widget: 'align',
    title: intl.formatMessage(messages.align),
    actions: ['full', 'center', 'left'],
    default: 'full',
  };

  schema.properties.styles.schema.properties.noLine = {
    title: intl.formatMessage(messages.noLine),
    type: 'boolean',
  };
  return schema;
};
